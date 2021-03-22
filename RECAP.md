# Recap

## State

Le state ou état de l'application ou source de vérité (single source of truth en anglais). Il va nous permettre de stocker des données internes à l'application **qui vont varier dans le temps**.

### Mise en place

Pour mettre en place le `state`, il faut convertir la fonction en classe et étendre de `React.Component`

```js
class Converter extends React.Component {...
```

#### Version legacy

Le state est instancié dans le `constructor` avec l'ancienne méthode. C'est un objet qui est une propriété de la classe.

```js
constructor(props) {
  super(props);
  
  this.state = {
    open: false
  }
}
```

#### Version moderne

Grâce au plugin `@babel/plugin-proposal-class-properties` on peut déclarer les propriétés de classe directement à la racine de celles-ci, sans passer par le `constructor`.

```js
// à la racine de la classe
state = {
  open: false,
}
```

#### Phase de rendu : render

En passant par une classe il faut changer la façon de rendre le JSX. La méthode `render` est là pour ça. Il faut donc penser à placer le JSX retourné dans la méthode `render` de la classe.

```js
class Converter extends React.Component {
  ...
  render() {
    return (
      <div>JSX à retourner</div>
    );
  }
}
```
### Utilisation du state

Le state est un objet, on peut récupérer ses données via l'écriture pointée comme n'importe quel objet JS. Il faut juste penser à rajouter `this` devant car c'est une propriété de la classe.

```js
this.state.open
```

### Changement de state : setState

Pour modifier le state, on passe par la fonction `setState`. Cela permet à React de savoir qu'un changement de donnée a eu lieu et une fois que le state est à jour, **React procède à un nouveau rendu** : il réexécute la fonction `render`

Pour utiliser `setState` on passe en argument un objet avec la ou les propriétés qu'on souhaite changer.

```js
this.setState({
  open: !open,
});
```

> **Attention** : il ne faut jamais modifier le state directement `this.state.open = false` React ne fait pas de rendu dans ce cas de figure

## Composant contrôlé

Un composant contrôlé est un élément de formulaire (input) qui ne sera pas gérer par la navigateur. Il affichera une valeur du state (lecture du state) et on lui passera le moyen de changer cette valeur (écriture du state)
[Lien de la doc officielle](https://fr.reactjs.org/docs/forms.html#controlled-components)

### Branchement en lecture

Le composant contrôlé va lire une valeur du state. Il s'agira en premier lieu de créer cette propriété dans le state si elle n'existe pas.

```js
state = {
  newValue: 'value'
}
```

Il faudra ensuite passer cette valeur au composant, par exemple ici `Header`.

```js
// dans le composant qui a le state
const { newValue } = this.state;
...

<Header inputValue={newValue} />

// dans Header.js
function Header({ inputValue }) {
  ...

  <input
    value={newValue}
    ...
  />
}
```

> Ne pas oublier de valider les props


### Branchement en écriture

Etape qui va donner au composant contrôler les moyens de venir changer la valeur du state qu'il lit.

> Si on ne fait pas cette étape, on aura une erreur en console nous avertissant qu'on a un composant en `read-only`

#### Préparation du handler

Il faudra préparer un handler pour venir réagir aux événements `change` sur l'input.

```js
// dans Header.js
const handleOnChange = () => {
  // ici on vérifie qu'on passe bien dans le handler avec un console.log
  console.log('je tape au clavier');
};

// on place le handler dans le gestionnaire d'événement onChange
<input
  value={newValue}
  onChange={handleOnChange}
  ...
/>
```

#### Préparer la fonction qui modifie le state

```js
// dans le composant qui a le state
setNewValue = () => {
  // ici on vérifie qu'on passe bien dans la fonction avec un console.log
  console.log('je veux modifier newValue');
};
```

#### Passer la fonction en props

Il faudra passer la fonction précédente en props du composant qui en aura besoin.

```js
// dans le composant qui a le state
<Header
  inputValue={newValue}
  onChangeInputValue={this.setNewValue}
/>

// dans Header.js
function Header({ inputValue, onChangeInputValue }) {
  ...
}
```

> Ne pas oublier de valider les props

#### Brancher le handler et la props

On place la props onChangeInputValue dans le handler et on l'exécute. A chaque lettre tapée au clavier on doit voir apparaitre en console les logs qu'on aura placé dans chacune des fonctions

```js
// dans Header.js
const handleOnChange = () => {
  console.log('je tape au clavier');
  onChangeInputValue();
};
```

#### Récupérer la valeur de l'input

Cette valeur sera disponible via `event.target.value`

```js
// dans Header.js
const handleOnChange = (event) => {
  // on vérifie qu'on a bien la valeur dans le handler
  console.log('je tape au clavier', event.target.value);
  onChangeInputValue();
};
```

#### Passer la valeur de l'input

Mettre en argument de `onChangeInputValue` la valeur de `event.target.value`

```js
// dans Header.js
const handleOnChange = (event) => {
  // on vérifie qu'on a bien la valeur dans le handler
  console.log('je tape au clavier', event.target.value);
  onChangeInputValue(event.target.value);
};


// dans le composant qui a le state
// on place un paramètre qui va venir prendre ce qu'on passe en argument
setNewValue = (value) => {
  // ici on vérifie qu'on a bien la value de l'input avec un console.log
  console.log('je veux modifier newValue', value);
};
```

#### On modifie le state

Dernière étape, on modifie le state maintenant que tout est bien raccordé

```js
// dans le composant qui a le state
setNewValue = (value) => {
  this.setState({
    newValue: value,
  });
};
```

## Méthodes de Lifecycle

Un composant a un cycle de vie.

Montage => Mise à jour => Démontage

Pour chacune de ces phases, on passe par différentes méthodes. On les appelles [les méthodes de cycle de vie](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).

`constructor` et `render` sont les 2 premières méthodes à être exécutée dans ce cycle. Elle interviennent avant que le composant ne soit injecté dans le DOM réel.

React nous donne la possibilité d'intéragir avec les composants une fois qu'ils seront injectés dans le DOM du navigateur. c'est ici qu'on gérera les effets de bord :

- Requêtes aux API
- Timers (setTimeout, setInterval)
- Listeners
- Manipulation du DOM réel

### componentDidMount

Exécutée une seule fois au montage du composant, au 1e rendu. Ici, on gérera le chargement des données, la mise en place des listeners ou des timers.

### componentDidUpdate

Exécutée à chaque mise à jour du state. Elle reçoit en paramètre `prevProps` et `prevState` qui sont, comme leur nom l'indique, l'objet de props précédent et le state précédent. Cela va nous permettre de comparer les nouvelles props avec les anciennes et le nouveau state avec l'ancien. On pourra lancer nos effets de bord en fonction des changements.

### componentWillUnmount

Exécutée juste avant que le composant ne soit retiré du DOM. Ici on retirera les listeners, timers qu'on aurait placé dans `componentDidMount`
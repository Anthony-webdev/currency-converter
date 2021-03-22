import React from 'react';
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import Toggler from 'src/components/Toggler';

import currenciesData from 'src/data/currencies';
import './style.scss';

// plan d'action
// Faire en sorte de pouvoir entrer un baseAmount
// 1. Design
//    - Faire un input de type number à la place du p
//    - gérer le style
// 2. Branchement en lecture
//    - donner à l'input la valeur du state dans la prop value
//    - vérifier depuis React DevTools qu'on est bien relier
// 3. Branchement en écriture
//    - préparer la fonction qui va changer la valeur du state (baseAmount)
//    - passer cette fonction dans les props de Header
//    - valider la props
//    - vérifier que la fonction passée en props fonctionne
//    - mettre en place le handler pour l'input number (onChange)
//    - vérifier qu'on passe bien dans le handler
//    - brancher la fonction dans la props avec le handler
//    - passer la nouvelle valeur en argument
//    - changer le state

class Converter extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // le state va nous permettre de stocker des données interne au composant
  //   // à chaque fois qu'on modifie une de ses valeurs
  //   // React va refaire un rendu : réexécution de la fonction render
  //   // this.state = {
  //   //   open: true,
  //   // };

  //   // pour chaque méthode de la classe on va devoir les lier au contexte de la class
  //   // ainsi elle prendront le this de l'instance de class
  //   this.setOpen = this.setOpen.bind(this);
  // }

  // setOpen() {
  //   // chaque fonction crée son propre contexte d'exécution
  //   // elle redéfinisse un nouveau this
  //   console.log('je veux faire varier la valeur de open');
  //   const { open } = this.state;
  //   // Pour faire varier les valeurs du state, il faut utiliser setState
  //   // React est notifié qu'il y a un changement dans le state
  //   // il exécutera de nouveau la méthode render()
  //   this.setState({
  //     open: !open,
  //   });

  //   // INTERDIT
  //   // ne pas modifier directement le state
  //   // this.state.open = false;
  // }

  // grâce au plugin de babel @babel/plugin-proposal-class-properties
  // on ne sera plus obligé de créer le constructor pour initialiser le state
  // il nous permet de créer des propriétés de classe
  state = {
    open: true,
    baseAmount: 1,
    currency: 'United States Dollar',
    search: '',
    currencies: currenciesData,
  }

  // Les méthodes de Lifecycle nous permettent d'intéragir avec le DOM
  // ou l'extérieur de l'application. On gère les effets de bord ici :
  // - appels au API
  // - Timers (setTimeout, setInterval)
  // - Listeners
  // - Manipulation du DOM réel

  // au 1e rendu
  // appelée une seule fois au montage du composant
  componentDidMount() {
    console.log('componentDidMount');
    this.pageTitleEffect();

    document.addEventListener('keyup', this.handleEscKeyup);
  }

  // phase de mise à jour
  // appelée à chaque render (après le 1e rendu)
  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.state;

    if (prevState.currency !== currency) {
      this.pageTitleEffect();
    }
  }

  // démontage du composant
  // appelée juste avant que le composant ne soit détruit
  componentWillUnmount() {
    // le converter n'est jamais démonté
    document.removeEventListener('keyup', this.handleEscKeyup);
  }

  handleEscKeyup = (event) => {
    if (event.code === 'Escape') {
      // si on veut uniquement fermer la liste
      this.setState({
        open: false,
      });

      // toggle de la liste
      // this.setOpen();
    }
  }

  pageTitleEffect = () => {
    const { currency } = this.state;
    document.title = `Euro to ${currency}`;
  }

  // ici setOpen est en charge de modifier le state
  setOpen = () => {
    // les fonctions flêchées ne redéfinissent pas de contexte d'exécution
    // elle prennent le contexte parent
    // ici on a le this de la class
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  }

  makeConversion = () => {
    // récupérer le montant de base et le multiplier par le taux de la devise choisie
    const { baseAmount, currency } = this.state;

    // on cherche dans nos data l'objet qui aura la même propriété name 
    // que la valeur stockée dans le state
    const foundCurrency = currenciesData.find((item) => item.name === currency);

    // plusieurs solutions pour arrondir le calcul
    // const result = Math.round(baseAmount * foundCurrency.rate * 100) / 100;
    // return result;

    const result = baseAmount * foundCurrency.rate;
    return Number(result.toFixed(2));
    // return parseFloat(result.toFixed(2));
  };

  // fonction qui va être en charge de modifier la valeur de currency
  setCurrency = (currency) => {
    // en paramètre, on récupère la valeur du nom de la devise
    this.setState({
      // currency: currency,
      currency,
    });
  };

  // fonction qui va être en charge de modifier la valeur de search
  setSearch = (value) => {
    // on vient changer le state avec la fonction setState pour avertir React
    this.setState({
      search: value,
    });
  }

  setBaseAmount = (value) => {
    this.setState({
      baseAmount: value,
    });
  }

  getCurrencies = () => {
    const { currencies, search } = this.state;
    // par défaut on retourne la liste complète
    let filteredCurrenciesList = currencies;

    // si search est différent d'une chaine de caractère vide
    if (search) {
      // ici je veux filtrer la liste des devises en fonction de search
      filteredCurrenciesList = filteredCurrenciesList.filter((currency) => {
        // on passe tout en minuscule pour comparer ce qui est comparable
        // et ne pas avoir de problème de casse
        const loweredCurrency = currency.name.toLowerCase();
        const loweredSearch = search.toLowerCase();

        // est-ce que ce que j'ai dans search est inclus dans la propriété name
        return loweredCurrency.includes(loweredSearch);
      });
    }

    return filteredCurrenciesList;
  }

  // render: la méthode qui renverra le JSX
  render() {
    // on destructure le state pour récupérer les valeurs qui nous intéresse
    const {
      open,
      baseAmount,
      currency,
      search,
    } = this.state;

    const value = this.makeConversion();

    // à chaque rendu du JSX je récupère la liste de mes devises
    // filtrée en fonction de la valeur de search
    const currenciesList = this.getCurrencies();

    // mauvaise pratique que d'intéragir avec le DOM réel depuis la fonction render
    // React nous propose des méthodes pour ça
    // les méthodes de cycle de vie, LifeCycles
    // document.title = currency;
    // const test = document.getElementById('root');

    return (
      <div className="converter">
        <Header
          baseAmount={baseAmount}
          onChangeBaseAmount={this.setBaseAmount}
        />
        {/* React.createElement(Toggler, {onClickButton: this.setOpen}) */}
        <Toggler
          onClickButton={this.setOpen}
          isOpen={open}
        />
        {/* avec le ET logique si la valeur à gauche est vraie on traite ce qui est à droite
          sinon on ne le traite pas
        */}
        {open && (
          <Currencies
            currencies={currenciesList}
            onClickCurrency={this.setCurrency}
            inputValue={search}
            onChangeInputValue={this.setSearch}
          />
        )}
        <Amount
          value={value}
          currency={currency}
        />
      </div>
    );
  }
}

export default Converter;

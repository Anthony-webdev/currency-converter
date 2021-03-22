import React from 'react';
import PropTypes from 'prop-types';
import Currency from './Currency';

import './style.scss';

function Currencies({
  currencies,
  onClickCurrency,
  inputValue,
  onChangeInputValue,
}) {
  // on va faire un tableau d'élément JSX pour les devises
  // const currenciesList = currencies.map(({ name }) => (
  //   <Currency key={name} name={name} />
  // ));
  const currenciesList = currencies.map((currency) => (
    // React.createElement(Currency, {...currency})
    <Currency
      key={currency.name}
      {...currency}
      // ici je passe directement la fonction qui va changer la valeur
      // currency du state
      onClickCurrency={onClickCurrency}
    />
  ));

  // ici on prépare un handler qui sera exécuté à chaque événement "change" de l'input
  const handleOnChange = (event) => {
    // on exécute la fonction stockée dans la props,
    // c'est celle qui sera en charge de modifier le state
    onChangeInputValue(event.target.value);
  };

  return (
    <div className="currencies">
      <input
        type="text"
        className="currencies__input"
        placeholder="Rechercher une devise"
        value={inputValue}
        onChange={handleOnChange}
      />
      <ul className="currencies__list">
        {currenciesList}
      </ul>
    </div>
  );
}

Currencies.propTypes = {
  // strict minimum de la validation de tableau
  // currencies: PropTypes.array.isRequired,
  // un peu mieux
  // currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  // le top
  currencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    rate: PropTypes.number,
  })).isRequired,
  onClickCurrency: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
};

export default Currencies;

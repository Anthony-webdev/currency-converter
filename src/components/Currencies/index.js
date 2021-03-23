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
  const currenciesList = currencies.map((currency) => (

    <Currency
      key={currency.name}
      {...currency}
      onClickCurrency={onClickCurrency}
    />
  ));

  const handleOnChange = (event) => {
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
  currencies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    rate: PropTypes.number,
  })).isRequired,
  onClickCurrency: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
};

export default Currencies;

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Header({ baseAmount, onChangeBaseAmount }) {
  const handleOnChange = (event) => {
    const value = Number(event.target.value);
    onChangeBaseAmount(value);
  };

  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <p className="header__base-amount">
        <input
          className="header__input"
          type="number"
          placeholder="Somme à convertir"
          value={baseAmount}
          onChange={handleOnChange}
        />
        <span>Euro</span>
      </p>
    </header>
  );
}

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  onChangeBaseAmount: PropTypes.func.isRequired,
};

export default Header;

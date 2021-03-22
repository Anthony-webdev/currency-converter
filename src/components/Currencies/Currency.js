import React from 'react';
import PropTypes from 'prop-types';

function Currency({ name, onClickCurrency }) {
  const handleOnClick = () => {
    // ici on passe en argument la valeur de name
    onClickCurrency(name);
  };

  return (
    <li className="currency" onClick={handleOnClick}>{name}</li>
  );
}

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  onClickCurrency: PropTypes.func.isRequired,
};

export default Currency;

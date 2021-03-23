import React from 'react';
import PropTypes from 'prop-types';

function Currency({ name, onClickCurrency }) {
  const handleOnClick = () => {
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

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Amount({ value, currency }) {
  return (
    <footer className="amount">
      <p className="amount__value">{value}</p>
      <p className="amount__currency">{currency}</p>
    </footer>
  );
}

Amount.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Amount;

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Toggler({ onClickButton, isOpen }) {
  const handleClick = () => {
    onClickButton();
  };

  const classnames = isOpen ? 'toggler toggler--open' : 'toggler';

  return (
    <button
      className={classnames}
      type="button"
      onClick={handleClick}
    >
      +
    </button>

  );
}

Toggler.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Toggler;

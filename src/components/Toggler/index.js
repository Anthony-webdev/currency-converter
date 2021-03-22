import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function Toggler({ onClickButton, isOpen }) {
  // je prépare un handler pour gérer les clics sur le button
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
      {/* © Antoine */}
      +
    </button>

  );
}

Toggler.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Toggler;

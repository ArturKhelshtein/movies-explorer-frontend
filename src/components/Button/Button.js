import React from 'react';

import './Button.css';

function Button({ type, buttonName, onClick, isDisabled = false, icon = '' }) {
  return (
    <button
      className={`button button_type_${type}`}
      onClick={onClick}
      aria-label={buttonName}
      disabled={isDisabled}
    >
      {icon}
      {buttonName}
    </button>
  );
}

export default Button;

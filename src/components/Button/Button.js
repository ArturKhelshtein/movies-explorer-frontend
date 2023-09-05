import React from 'react';

import './Button.css';

function Button({ type, buttonName, onClick, icon='' }) {
  return (
    <button className={`button button_type_${type}`} onClick={onClick} aria-label={buttonName}>
      {icon}{buttonName}
    </button>
  );
}

export default Button;

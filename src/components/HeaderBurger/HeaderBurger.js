import React from 'react';

import './HeaderBurger.css';

function HeaderBurger({ handleToggleWrappedBurger }) {
  return (
    <label className="header-burger" htmlFor="burger">
      <input
        type="checkbox"
        id="burger"
        className="header-burger__checkbox-invisible"
        onChange={handleToggleWrappedBurger}
      />
      <span className="header-burger__icon" />
    </label>
  );
}

export default HeaderBurger;

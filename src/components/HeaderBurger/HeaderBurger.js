import React from 'react';

import './HeaderBurger.css';

function HeaderBurger({ handleToggleWrappedBurger, isWrapped }) {
  return (
    <label className="header-burger" htmlFor="burger">
      <input
        type="checkbox"
        id="burger"
        className="header-burger__checkbox-invisible"
        onChange={handleToggleWrappedBurger}
        cheked={isWrapped}
      />
      <span className="header-burger__icon" />
    </label>
  );
}

export default HeaderBurger;

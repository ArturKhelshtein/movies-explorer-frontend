import React from 'react';

import './HeaderBurger.css';

function HeaderBurger({ handleToggleWrappedBurger, isWrapped }) {
  return (
    <label className="header__burger_container" htmlFor="burger">
      <input
        type="checkbox"
        id="burger"
        className="header__burger_invisible"
        onChange={handleToggleWrappedBurger}
        cheked={isWrapped}
      />
      <div className="header__burger" />
    </label>
  );
}

export default HeaderBurger;

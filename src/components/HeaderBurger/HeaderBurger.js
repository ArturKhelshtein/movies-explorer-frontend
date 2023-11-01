import React from 'react';

import './HeaderBurger.css';

function HeaderBurger({ isWrapped, setIsWrapped }) {
  function handleToggleWrappedBurger() {
    return isWrapped === false ? setIsWrapped(true) : setIsWrapped(false);
  }
  React.useEffect(() => {
  }, [isWrapped]);

  return (
    <label className="header-burger" htmlFor="burger">
      <input
        type="checkbox"
        id="burger"
        className="header-burger__checkbox-invisible"
        checked={!isWrapped}
        onChange={handleToggleWrappedBurger}
      />
      <span className="header-burger__icon" />
    </label>
  );
}

export default HeaderBurger;

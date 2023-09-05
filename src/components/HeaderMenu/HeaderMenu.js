import React from 'react';
import { useNavigate } from 'react-router-dom';

import './HeaderMenu.css';

import IconAccount from '../IconAccount/IconAccount';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import Button from '../Button/Button';
import HeaderBurger from '../HeaderBurger/HeaderBurger';

function HeaderMenu() {
  const [isWrapped, setIsWrapped] = React.useState(true); //свернуто

  const navigate = useNavigate();

  function goToAccount() {
    navigate('/profile');
    setIsWrapped(true);
  }
  function handleToggleWrappedBurger() {
    return isWrapped === false ? setIsWrapped(true) : setIsWrapped(false);
  }

  return (
    <>
      <div
        className={`header__menu-container ${
          !isWrapped ? 'header__menu-container_unwrapped' : ''
        }`}
      >
        <HeaderNavigation />
        <Button
          type="account"
          buttonName="Аккаунт"
          onClick={goToAccount}
          icon={<IconAccount />}
        />
      </div>
      <HeaderBurger
        handleToggleWrappedBurger={handleToggleWrappedBurger}
        isWrapped={isWrapped}
      />
    </>
  );
}

export default HeaderMenu;

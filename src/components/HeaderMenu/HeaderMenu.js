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

  return (
    <>
      <div className={`header__overlay ${isWrapped ? '': 'header__overlay_visible'}`}></div>
      <div
        className={`header__menu-container ${
          isWrapped ? '' : 'header__menu-container_unwrapped'
        }`}
      >
        <HeaderNavigation setIsWrapped={setIsWrapped}/>
        <Button
          type="account"
          buttonName="Аккаунт"
          onClick={goToAccount}
          icon={<IconAccount />}
        />
      </div>
      <HeaderBurger
        isWrapped={isWrapped}
        setIsWrapped={setIsWrapped}
      />
    </>
  );
}

export default HeaderMenu;

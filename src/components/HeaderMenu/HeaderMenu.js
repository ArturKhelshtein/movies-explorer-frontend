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

  React.useEffect(() => {
    if (isWrapped) return;

    function handleOverlay(event) {
      if (
        event.target.classList.contains('header__overlay_visible')
      ) {
        setIsWrapped(true);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsWrapped(true);
      }
    }
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOverlay);
    };
  }, [isWrapped, setIsWrapped]);

  function goToAccount() {
    navigate('/profile');
    setIsWrapped(true);
  }

  return (
    <>
      <div
        className={`header__overlay ${
          isWrapped ? '' : 'header__overlay_visible'
        }`}
      ></div>
      <div
        className={`header__menu-container ${
          isWrapped ? '' : 'header__menu-container_unwrapped'
        }`}
      >
        <HeaderNavigation setIsWrapped={setIsWrapped} />
        <Button
          type="account"
          buttonName="Аккаунт"
          onClick={goToAccount}
          icon={<IconAccount />}
        />
      </div>
      <HeaderBurger isWrapped={isWrapped} setIsWrapped={setIsWrapped} />
    </>
  );
}

export default HeaderMenu;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './HeaderSingBar.css';

import Button from '../Button/Button';

function HeaderSingBar() {
  const navigate = useNavigate();

  function goToSignUp() {
    navigate('/signup');
  }

  function goToSignIn() {
    navigate('/signin');
  }
  return (
    <div className="header__sign-bar-container">
      <Button type="sign-up" buttonName="Регистрация" onClick={goToSignUp} />
      <Button type="sign-in" buttonName="Войти" onClick={goToSignIn} />
    </div>
  );
}

export default HeaderSingBar;

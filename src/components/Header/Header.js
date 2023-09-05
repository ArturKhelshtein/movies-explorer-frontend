import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Header.css';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import HeaderSingBar from '../HeaderSingBar/HeaderSingBar';
import LogoLink from '../LogoLink/LogoLink';

function Header({ isLogged }) {
  return (
    <Routes>
      <Route
        exact
        path="/*"
        element={
          <header className="header">
            <div className="header__container">
              <LogoLink />
              {!isLogged && <HeaderSingBar />}
              {isLogged && <HeaderMenu />}
            </div>
          </header>
        }
      />
      <Route path="/signup" />
      <Route path="/signin" />
    </Routes>
  );
}

export default Header;

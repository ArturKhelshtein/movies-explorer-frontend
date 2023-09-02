import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Header.css';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import HeaderSingBar from '../HeaderSingBar/HeaderSingBar';
import LogoLink from '../LogoLink/LogoLink';

function Header({ isLogged }) {
  return (
    <header className="header">
      <Routes>
        <Route
          exact
          path="/*"
          element={
            <>
              <LogoLink />
              {!isLogged && <HeaderSingBar />}
              {isLogged && <HeaderMenu />}
            </>
          }
        />
        <Route path="/signup" />
        <Route path="/signin" />
      </Routes>
    </header>
  );
}

export default Header;

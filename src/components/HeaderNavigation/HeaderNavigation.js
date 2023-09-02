import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderNavigation.css';

function HeaderNavigation() {
  const setActive = ({ isActive }) =>
    isActive ? 'header__navigation-link_active' : '';

  return (
    <nav className="header__navigation-container">
      <NavLink
        to="/"
        className="header__navigation-link header__navigation-link_mobile"
      >
        {({ isActive }) => (
          <span className={setActive({ isActive })}>Главная</span>
        )}
      </NavLink>
      <NavLink to="/movies" className="header__navigation-link">
        {({ isActive }) => (
          <span className={setActive({ isActive })}>Фильмы</span>
        )}
      </NavLink>
      <NavLink to="/saved-movies" className="header__navigation-link">
        {({ isActive }) => (
          <span className={setActive({ isActive })}>Сохранённые фильмы</span>
        )}
      </NavLink>
    </nav>
  );
}

export default HeaderNavigation;

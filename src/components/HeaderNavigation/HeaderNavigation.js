import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderNavigation.css';

function HeaderNavigation() {
  const setActive = ({ isActive }) =>
    isActive
      ? 'header-navigation__link header-navigation__link_active'
      : 'header-navigation__link';

  return (
    <nav className="header-navigation">
      <NavLink
        to="/"
        className="header-navigation__link-container header-navigation__link-container_type_mobile"
      >
        {({ isActive }) => (
          <span className={setActive({ isActive })}>Главная</span>
        )}
      </NavLink>
      <NavLink to="/movies" className="header-navigation__link-container">
        {({ isActive }) => (
          <span className={setActive({ isActive })}>Фильмы</span>
        )}
      </NavLink>
      <NavLink to="/saved-movies" className="header-navigation__link-container">
        {({ isActive }) => (
          <span className={setActive({ isActive })}>Сохранённые фильмы</span>
        )}
      </NavLink>
    </nav>
  );
}

export default HeaderNavigation;

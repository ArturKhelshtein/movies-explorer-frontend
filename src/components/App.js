import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Movies from './Movies/Movies.js';
import SavedMovies from './SavedMovies/SavedMovies.js';
import Profile from './Profile/Profile.js';
import Footer from './Footer/Footer.js';
import Register from './Register/Register.js';
import Login from './Login/Login.js';
import NoFound from './NoFound/NoFound.js';
import testData from '../utils/testData.js';

function App() {
  const [isLogged, setLogged] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({
    dataUser: {
      _id: '64e60efa68ed58d7c156da14',
      email: 'test@test.ru',
      name: 'test',
    },
  });

  const [moviesCards, setMoviesCards] = React.useState(testData);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLogged={isLogged} />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                onSubmit={() => console.log('onSubmit')}
                title="Добро пожаловать!"
                buttonName="Зарегестрироваться"
                linkDescription="Уже зарегистрированы?"
                linkText="Войти"
                linkTo="/signin"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onSubmit={() => console.log('onSubmit')}
                title="Рады видеть!"
                buttonName="Войти"
                linkDescription="Ещё не&nbsp;зарегистрированы?"
                linkText="Регистрация"
                linkTo="/signup"
              />
            }
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={<Movies moviesCards={moviesCards} />}
          />
          <Route
            path="/saved-movies"
            element={<SavedMovies moviesCards={moviesCards} />}
          />
          <Route path="/profile" element={<Profile setLogged={setLogged}/>} />
          <Route path="/*" element={<NoFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

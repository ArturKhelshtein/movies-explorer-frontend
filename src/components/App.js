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
import mainApi from '../utils/MainApi';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  // состояния приложения
  const [isSendRequest, setSendRequest] = React.useState(false);
  const [isLogged, setLogged] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);

  console.log(savedMoviesList);

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (isLogged) {
      mainApi
        .getAppInfo()
        .then((result) => {
          const [dataUser, dataMovies] = result;
          setCurrentUser(dataUser.dataUser);
          setSavedMoviesList(dataMovies.dataMovies);
        })
        .catch((error) => console.error(
          `Ошибка при получении данных пользователя/списка сохраненных фильмов: ${error}`
        ));
    }
  }, [isLogged]);

  function checkToken() {
    mainApi
      .getAppInfo()
      .then((data) => {
        if (!data) {
          return;
        }
        setLogged(true);
      })
      .catch((error) => {
        setLogged(false);
        setCurrentUser({});
        setSavedMoviesList({});
        console.error(`Ошибка при проверке токена пользователя: ${error}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLogged={isLogged} />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                isSendRequest={isSendRequest}
                setSendRequest={setSendRequest}
                title="Добро пожаловать!"
                linkDescription="Уже зарегистрированы?"
                linkText="Войти"
                linkTo="/signin"
                setLogged={setLogged}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                isSendRequest={isSendRequest}
                setSendRequest={setSendRequest}
                title="Рады видеть!"
                linkDescription="Ещё не&nbsp;зарегистрированы?"
                linkText="Регистрация"
                linkTo="/signup"
                setLogged={setLogged}
              />
            }
          />
          <Route path="/" element={<Main />} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLogged={isLogged}
                element={Movies}
                savedMoviesList={savedMoviesList}
                setSavedMoviesList={setSavedMoviesList}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLogged={isLogged}
                element={SavedMovies}
                savedMoviesList={savedMoviesList}
                setSavedMoviesList={setSavedMoviesList}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLogged={isLogged}
                element={Profile}
                isSendRequest={isSendRequest}
                setSendRequest={setSendRequest}
                setLogged={setLogged}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/*" element={<NoFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

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
  const [isTokenChecked, setTokenChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);

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
        .catch((error) =>
          console.error(
            `Ошибка при получении данных пользователя/списка сохраненных фильмов: ${error}`
          )
        );
    }
  }, [isLogged]);

  async function checkToken() {
    try {
      const data = await mainApi
        .getContent()
        .catch((error) => console.log(error));
      if (data) {
        setCurrentUser(data);
        setLogged(true);
      }
    } catch (error) {
      setLogged(false);
      setCurrentUser({});
      setSavedMoviesList([]);
      localStorage.clear();
      console.error(`Ошибка при проверке токена пользователя: ${error}`);
    } finally {
      setTokenChecked(true);
    }
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLogged={isLogged} />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                isLogged={isLogged}
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
                isLogged={isLogged}
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
                isTokenChecked={isTokenChecked}
                checkToken={checkToken}
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
                isTokenChecked={isTokenChecked}
                checkToken={checkToken}
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
                isTokenChecked={isTokenChecked}
                checkToken={checkToken}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

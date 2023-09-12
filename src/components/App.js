import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
  const [isLogged, setLogged] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesList, setSavedMoviesList] = React.useState({});
  const navigate = useNavigate();

  function checkToken() {
    mainApi
      .getUserMe()
      .then((data) => {
        if (!data) {
          return;
        }
        setCurrentUser(data.dataUser);
        setLogged(true);
        navigate('/');
      })
      .catch((error) => {
        setLogged(false);
        setCurrentUser({});
        console.error(`Ошибка при проверке токена пользователя: ${error}`);
      });
  }

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
            `Ошибка при получении данных пользователя/начального списка карточек: ${error}`
          )
        );
    }
  }, [isLogged]);

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
                setLogged={setLogged}
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

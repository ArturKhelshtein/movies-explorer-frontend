import React from 'react';
import { useLocation } from 'react-router-dom';

import './CardList.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Card from '../Card/Card.js';
import mainApi from '../../utils/MainApi';
import { ERRORTEXT_SERVERERROR } from '../../utils/errorText';

function CardList({ showMovieList, savedMoviesList, setSavedMoviesList }) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();

  React.useEffect(() => {console.log('рендеринг CardList')}, [savedMoviesList]);

  function isSaveMovie(movie) {
    for (let i = 0; i < savedMoviesList.length; i++) {
      if (
        savedMoviesList[i].movieId === movie.id &&
        savedMoviesList[i].owner === currentUser._id
      ) {
        return true;
      }
    }
    return false;
  }

  function handlerSaveMovie(movie) {
    mainApi
      .postMovies({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then((data) => {
        setSavedMoviesList([...savedMoviesList, data.dataMovies])
      })
      .catch((error) => console.error(`${ERRORTEXT_SERVERERROR} ${error}`));
  }

  function handlerDeleteMovie(movie) {
    const deleteMovie = savedMoviesList?.find((i) => {
      if (i.owner === currentUser._id) {
        return i.movieId === (movie.id || movie.movieId);
      }
      // eslint-disable-next-line array-callback-return
      return;
    });

    mainApi
      .deleteMovies(deleteMovie._id)
      .then(() =>
        setSavedMoviesList((s) =>
          s.filter((n) => n.movieId !== deleteMovie.movieId)
        )
      )
      .catch((error) => console.error(`${ERRORTEXT_SERVERERROR} ${error}`));
  }

  return (
    <div className="movies-card-list">
      {showMovieList?.map((movie) => (
        <Card
          key={
            (location.pathname === '/movies' && movie.id) ||
            (location.pathname === '/saved-movies' && movie.movieId)
          }
          movie={movie}
          saveMovie={handlerSaveMovie}
          isSaveMovie={isSaveMovie}
          deleteMovie={handlerDeleteMovie}
        />
      ))}
    </div>
  );
}

export default CardList;

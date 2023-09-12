import React from 'react';

import './CardList.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Card from '../Card/Card.js';
import mainApi from '../../utils/MainApi';
import { ERRORTEXT_SERVERERROR } from '../../utils/errorText';

function CardList({ showMovies, savedMoviesList, setSavedMoviesList }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [moviesCardsOwner, setCardsOwner] = React.useState();

  function isSaveMovie(movie) {
    for (let i = 0; i < savedMoviesList.length; i++) {
      if (
        savedMoviesList[i].movieId === movie.id &&
        savedMoviesList[i].owner._id === currentUser._id
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
      .then((savedMovie) => {
        setSavedMoviesList((s) => [...s, savedMovie]);
      })
      .then(() => mainApi.getMovies())
      .then((dataMovies) => {
        setSavedMoviesList(dataMovies.dataMovies);
      })
      .catch((error) => console.error(`${ERRORTEXT_SERVERERROR} ${error}`));
  }

  function handlerDeleteMovie(movie) {
    const deleteMovie = savedMoviesList.find((i) => {
      if (i.owner._id === currentUser._id) {
        return i.movieId === movie.id;
      }
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

  React.useEffect(() => {
    console.log(savedMoviesList);
  }, [savedMoviesList]);

  return (
    <div className="movies-card-list">
      {showMovies.map((movie) => (
        <Card
          key={movie.id}
          card={movie}
          saveMovie={handlerSaveMovie}
          isSaveMovie={isSaveMovie}
          deleteMovie={handlerDeleteMovie}
        />
      ))}
    </div>
  );
}

export default CardList;

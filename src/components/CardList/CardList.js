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

  function handlerSaveMovie(card) {
    mainApi
      .postMovies({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      })
      .then((savedMovie) =>
        setSavedMoviesList((state) => ({ ...state, savedMovie }))
      )
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
        setSavedMoviesList((s) => s.filter((n) => n.movieId !== deleteMovie.movieId ))
      )
      .catch((error) => console.error(`${ERRORTEXT_SERVERERROR} ${error}`));
  }

  React.useEffect(() => {
  }, [savedMoviesList])



  return (
    <div className="movies-card-list">
      {showMovies.map((card) => (
        <Card
          key={card.id}
          card={card}
          saveMovie={handlerSaveMovie}
          isSaveMovie={isSaveMovie}
          deleteMovie={handlerDeleteMovie}
        />
      ))}
    </div>
  );
}

export default CardList;

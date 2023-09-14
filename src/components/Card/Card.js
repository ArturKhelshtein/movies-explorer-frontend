import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Card.css';

function Card({ movie, saveMovie, isSaveMovie, deleteMovie }) {
  const location = useLocation();
  const isSave = isSaveMovie(movie);

  function handleClickSave() {
    saveMovie(movie);
  }

  function handleClickDelete() {
    deleteMovie(movie);
  }

  function convertMinuteToTime(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч' + minutes + 'м';
  }

  return (
    <article className="movies-card">
      <Link to={movie.trailerLink} className="movies-card__img-link-container">
        <img
          className="movies-card__img"
          src={
            (location.pathname === '/movies' &&
              `https://api.nomoreparties.co${movie.image.url}`) ||
            (location.pathname === '/saved-movies' && movie.image)
          }
          alt={movie.description}
        ></img>
      </Link>
      <div className="movies-card__about-container">
        <h4 className="movies-card__name">{movie.nameRU}</h4>
        <div className="movies-card__duration">
          {convertMinuteToTime(movie.duration)}
        </div>

        <>
          {location.pathname === '/movies' && (
            <button
              className={`movies-card__icon-button-save ${
                isSave ? 'movies-card__icon-button-save_active' : ''
              }`}
              onClick={isSave ? handleClickDelete : handleClickSave}
              type="button"
              aria-label="Сохранить в избранное"
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className="movies-card__icon-button-delete"
              onClick={handleClickDelete}
              type="button"
              aria-label="Сохранить в избранное"
            ></button>
          )}
        </>
      </div>
    </article>
  );
}

export default Card;

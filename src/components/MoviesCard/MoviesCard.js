import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard({ card, saveMovie, isSaveMovie }) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  // const isOwner = card.owner._id === currentUser.dataUser._id;
  const isSave = isSaveMovie(card);

  function handleClickSave() {
    saveMovie(card);
  }

  function handleClickDelete() {
    saveMovie(card);
  }

  function convertMinuteToTime(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч' + minutes + 'м';
  }

  return (
    <article className="movies-card">
      <img
        className="movies-card__img"
        src={card.image.formats.thumbnail.url}
        alt={card.description}
        onClick={handleClickSave}
      ></img>
      <div className="movies-card__about-container">
        <h4 className="movies-card__name">{card.nameRU}</h4>
        <div className="movies-card__duration">
          {convertMinuteToTime(card.duration)}
        </div>

        <>
          {location.pathname === '/movies' && (
            <button
              className={`movies-card__icon-button-save ${
                isSave ? 'movies-card__icon-button-save_active' : ''
              }`}
              onClick={handleClickSave}
              type="button"
              aria-label="Сохранить в избранное"
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className="movies-card__icon-button-delete"
              onClick={handleClickSave}
              type="button"
              aria-label="Сохранить в избранное"
            ></button>
          )}
        </>
      </div>
    </article>
  );
}

export default MoviesCard;

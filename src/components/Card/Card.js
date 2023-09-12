import React from 'react';
import { useLocation } from 'react-router-dom';

import './Card.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Card({ card, saveMovie, isSaveMovie, deleteMovie }) {
  const location = useLocation();
  const isSave = isSaveMovie(card);

  function handleClickSave() {
    console.log(isSave)
    saveMovie(card);
  }

  function handleClickDelete() {
    deleteMovie(card);
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
        src={`https://api.nomoreparties.co${card.image.url}`}
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

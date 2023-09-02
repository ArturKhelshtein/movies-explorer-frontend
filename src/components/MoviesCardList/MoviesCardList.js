import React from 'react';

import './MoviesCardList.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({ moviesCards }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [moviesCardsOwner, setMoviesCardsOwner] = React.useState();

  function isSaveMovie(card) {
    console.log('тоггл для состояние true/false. заглушка');
    // return card.owner.some((owner) => owner._id === currentUser.dataUser._id);
  }

  function handlerToSaveMovie(card) {
    console.log(
      'обращение к api для добавления в owner _id текущего пользователя. затем на переобращение к массиву карточек для получения новых данных. заглушка'
    );
  }

  return (
    <section className="movies-card-list">
      {moviesCards.map((card) => (
        <MoviesCard
          key={card._id}
          card={card}
          saveMovie={handlerToSaveMovie}
          isSaveMovie={isSaveMovie}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;

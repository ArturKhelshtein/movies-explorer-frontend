import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies() {
  const [savedMoviesCards, setSavedMoviesCards] = React.useState([]);

  return (
    <main className="saved-movies">
      <section className="saved-movies__container" aria-label="saved-movies">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList moviesCards={savedMoviesCards} />
      </section>
    </main>
  );
}

export default SavedMovies;

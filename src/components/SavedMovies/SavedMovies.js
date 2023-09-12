import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import CardList from '../CardList/CardList.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies() {
  const [savedCards, setSavedCards] = React.useState([]);

  return (
    <main className="saved-movies">
      <section className="saved-movies__container" aria-label="saved-movies">
        <SearchForm />
        {/* <Preloader /> */}
        <CardList moviesCards={savedCards} />
      </section>
    </main>
  );
}

export default SavedMovies;

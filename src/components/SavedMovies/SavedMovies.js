import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies({ moviesCards }) {
  return (
    <main className="saved-movies">
      <section className="saved-movies__container" aria-label="saved-movies">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList moviesCards={moviesCards} />
      </section>
    </main>
  );
}

export default SavedMovies;

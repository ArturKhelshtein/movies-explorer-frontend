import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies({ moviesCards }) {
  return (
    <main className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList moviesCards={moviesCards} />
    </main>
  );
}

export default SavedMovies;

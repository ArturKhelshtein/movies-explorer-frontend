import './Movies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';

function Movies({ moviesCards }) {
  return (
    <main className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList moviesCards={moviesCards} />
      <DownloadMore />
    </main>
  );
}

export default Movies;

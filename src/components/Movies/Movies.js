import './Movies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';

function Movies({ moviesCards }) {
  return (
    <main className="movies">
      <section className="movies__container">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList moviesCards={moviesCards} />
        <DownloadMore />
      </section>
    </main>
  );
}

export default Movies;

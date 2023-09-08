import './Movies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';

function Movies({ moviesCards, setMoviesCards, isLoading, setLoading }) {
  console.log(isLoading);
  return (
    <main className="movies">
      <section className="movies__container" aria-label="movies">
        <SearchForm setMoviesCards={setMoviesCards} setLoading={setLoading} />
        {isLoading === null ? (
          <></>
        ) : isLoading === true ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesCards={moviesCards} />
            <DownloadMore />
          </>
        )}
      </section>
    </main>
  );
}

export default Movies;

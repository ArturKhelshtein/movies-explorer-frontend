import React from 'react';

import './Movies.css';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import CardList from '../CardList/CardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';

function Movies({ savedMoviesList, setSavedMoviesList }) {
  // состояния количества отображаемых фильмов
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [gridColumns, setGridColumns] = React.useState(0);
  const [gridRows, setGridRows] = React.useState(0);
  const [ammountShowMovies, setAmmountShowMovies] = React.useState(0);
  const [additionalDownloads, setAdditionalDownloads] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(null);
  const [isVisibleButtonDownloads, setVisibleButtonDownloads] =
    React.useState(true);

  // состояния списков фильмов
  const [fullMovieList, setFullMovieList] = React.useState([]);
  const [findMoviesList, setFindMoviesList] = React.useState([]);
  const [showMovieList, setShowMovieList] = React.useState([]);

  // состояние поиска
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchQueryError, setIsSearchQueryError] = React.useState(false);
  const [filterShortMovies, setFilterShortMovies] = React.useState(true);

  // первый рендеринг
  React.useEffect(() => {
    updateMovieCounters(windowSize);
    setFullMovieList(JSON.parse(localStorage.getItem('dataMovies')));
    setSearchQuery(localStorage.getItem('query') || '');
    setFilterShortMovies(JSON.parse(localStorage.getItem('filterShortMovies')));
    if (localStorage.getItem('query') === null) {
      setIsLoading(null);
    }
  }, []);

  // рендеринг при показе фильмов и догрузке фильмов
  React.useEffect(() => {
    updateMovieCounters(windowSize);
    setShowMovieList(findMoviesList.slice(0, ammountShowMovies));
    if (isLoading === null || isLoading === true) {
      return setVisibleButtonDownloads(false);
    }
    if (ammountShowMovies >= findMoviesList.length) {
      return setVisibleButtonDownloads(false);
    }
    setVisibleButtonDownloads(true);
  }, [
    isLoading,
    ammountShowMovies,
    findMoviesList,
    windowSize,
    savedMoviesList,
    filterShortMovies
  ]);

  // рендеринг при поиске
  React.useEffect(() => {
    setWindowSize(window.innerWidth);
    updateMovieCounters(windowSize);
    setAmmountShowMovies(() => gridColumns * gridRows);
  }, [isLoading, searchQuery, filterShortMovies]);

  // слушатель ширины экрана
  (function () {
    window.addEventListener('resize', resizeThrottler, false);

    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 1000);
      }
    }

    function actualResizeHandler() {
      setWindowSize(window.innerWidth);
    }
  })();

  function updateMovieCounters(width) {
    if (width > 1279) {
      setGridColumns(4);
      setGridRows(4);
      setAdditionalDownloads(4);
    } else if (width > 999) {
      setGridColumns(3);
      setGridRows(4);
      setAdditionalDownloads(3);
    } else if (width > 765) {
      setGridColumns(2);
      setGridRows(4);
      setAdditionalDownloads(2);
    } else {
      setGridColumns(1);
      setGridRows(5);
      setAdditionalDownloads(2);
    }
    return;
  }

  function handleDownloadMore() {
    let complementToFull;
    if ((ammountShowMovies + additionalDownloads) % gridColumns === 0) {
      complementToFull = 0;
    } else {
      complementToFull =
        gridColumns - ((ammountShowMovies + additionalDownloads) % gridColumns);
    }

    setAmmountShowMovies(
      ammountShowMovies + additionalDownloads + complementToFull
    );
    return;
  }

  function handleSubmitSearch(event) {
    event.preventDefault();

    // сброс ошибки, если ошибка была ранее
    setIsLoading(false);
    setIsSearchQueryError(false);
    event.target[0].placeholder = 'Фильм';

    // установка ошибки если не заполнено поле поиска
    if (event.target[0].value === '') {
      event.target[0].placeholder = 'Нужно ввести ключевое слово';
      setIsSearchQueryError(true);
      return;
    }

    // корректный запрос
    setIsLoading(true);
    if (localStorage.getItem('dataMovies') === null) {
      addReseponseBeatfilm();
    }
    addQueryToLocalStorage();
    setFindMoviesList(
      fullMovieList.filter(
        (m) =>
        (filterShortMovies ? m.duration < 40 : m)
        &&
          (m.nameRU.toLowerCase().indexOf(localStorage.getItem('query')) > -1 ||
          m.nameEN.toLowerCase().indexOf(localStorage.getItem('query')) > -1 )
      )
    );
    setIsLoading(false);
  }

  function addReseponseBeatfilm() {
    moviesApi
      .search()
      .then((response) => {
        localStorage.setItem('dataMovies', JSON.stringify(response));
      })
      .then(() =>
        setFullMovieList(JSON.parse(localStorage.getItem('dataMovies')))
      )
      .catch(() =>
        console.error(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        )
      );
  }

  function addQueryToLocalStorage() {
    localStorage.setItem('query', searchQuery);
    localStorage.setItem('filterShortMovies', filterShortMovies);
    return;
  }

  return (
    <main className="movies">
      <section className="movies__container" aria-label="movies">
        <SearchForm
          handleSubmitSearch={handleSubmitSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchQueryError={isSearchQueryError}
          filterShortMovies={filterShortMovies}
          setFilterShortMovies={setFilterShortMovies}
        />
        {isLoading === null ? (
          <></>
        ) : isLoading === true ? (
          <Preloader />
        ) : (
          <>
            <CardList
              showMovieList={showMovieList}
              savedMoviesList={savedMoviesList}
              setSavedMoviesList={setSavedMoviesList}
            />
            <DownloadMore
              isVisibleButtonDownloads={isVisibleButtonDownloads}
              handleDownloadMore={handleDownloadMore}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default Movies;

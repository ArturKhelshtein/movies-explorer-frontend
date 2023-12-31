import React from 'react';

import './Movies.css';

import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import CardList from '../CardList/CardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';
import { useResize } from '../../hooks/useResize';

function Movies({ savedMoviesList, setSavedMoviesList }) {
  const { width } = useResize();
  // состояния количества отображаемых фильмов
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
  const [searchQuery, setSearchQuery] = React.useState(
    localStorage.getItem('query') || ''
  );
  const [isSearchQueryError, setIsSearchQueryError] = React.useState(false);
  const [filterShortMovies, setFilterShortMovies] = React.useState(
    JSON.parse(localStorage.getItem('filterShortMovies') || false)
  );

  // первый рендеринг
  React.useEffect(() => {
    updateMovieCounters(width);
    if (localStorage.getItem('query') !== null) {
      setFullMovieList(JSON.parse(localStorage.getItem('dataMovies')));
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // рендеринг при поиске
  React.useEffect(() => {
    updateMovieCounters(width);
    setAmmountShowMovies(() => gridColumns * gridRows);
    if (localStorage.getItem('dataMovies') !== null) {
      addQueryToLocalStorage();
      handlerFindMoviesList();
    }
  }, [localStorage.getItem('query'), filterShortMovies, isLoading]);

  // рендеринг при показе фильмов и догрузке фильмов
  React.useEffect(() => {
    updateMovieCounters(width);
    setShowMovieList(findMoviesList?.slice(0, ammountShowMovies));
    if (isLoading === null || isLoading === true) {
      return setVisibleButtonDownloads(false);
    }
    if (ammountShowMovies >= findMoviesList?.length) {
      return setVisibleButtonDownloads(false);
    }
    setVisibleButtonDownloads(true);
  }, [isLoading, findMoviesList, ammountShowMovies, width]);

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
    updateMovieCounters(width);
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

  async function handleSubmitSearch(event) {
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
    if (localStorage.getItem('dataMovies') === null) {
      setIsLoading(true);
      await addReseponseBeatfilm();
    }
    addQueryToLocalStorage();
    handlerFindMoviesList();

    setIsLoading(false);
  }

  function handlerFindMoviesList() {
    setFindMoviesList(
      fullMovieList?.filter(
        (m) =>
          (filterShortMovies ? m.duration < 40 : m) &&
          (m.nameRU
            .toLowerCase()
            .indexOf(localStorage.getItem('query').toLowerCase()) > -1 ||
            m.nameEN
              .toLowerCase()
              .indexOf(localStorage.getItem('query').toLowerCase()) > -1)
      )
    );
  }

  async function addReseponseBeatfilm() {
    return moviesApi
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
        {isLoading === null || isSearchQueryError ? (
          <></>
        ) : isLoading === true ? (
          <Preloader />
        ) : showMovieList?.length > 0 ? (
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
        ) : (
          <div className="movies__no-found">Ничего не найдено</div>
        )}
      </section>
    </main>
  );
}

export default Movies;

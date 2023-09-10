import React from 'react';

import './SearchForm.css';

import IconSearch from '../IconSearch/IconSearch.js';
import IconSearchButton from '../IconSearchButton/IconSearchButton.js';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import moviesApi from '../../utils/MoviesApi';

function SearchForm({
  windowSize,
  setWindowSize,
  setLoading,
  gridColumns,
  gridRows,
  setAmmountShowMovieCards,
  ammountShowMovieCards,
  updateCardCounters,
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchQueryError, setIsSearchQueryError] = React.useState(false);
  const [filterShortMovies, setFilterShortMovies] = React.useState(true);

  function handleSubmitSearch(event) {
    event.preventDefault();
    setLoading(null);
    setIsSearchQueryError(false);
    event.target[0].placeholder = 'Фильм';
    if (event.target[0].value === '') {
      event.target[0].placeholder = 'Нужно ввести ключевое слово';
      setIsSearchQueryError(true);
      return;
    }
    setLoading(true);
    addQueryToLocalStorage();
    setWindowSize(window.innerWidth);
    console.log(`ширина экрана ${windowSize}`);
    updateCardCounters(windowSize);
    console.log(`количество столбцов ${gridColumns}`);
    console.log(`количество строк ${gridRows}`);
    setAmmountShowMovieCards(gridColumns * gridRows);
    console.log(`количество отображаемых карт ${ammountShowMovieCards}`);
    return;
  }

  function addQueryToLocalStorage() {
    moviesApi
      .search()
      .then((response) => {
        localStorage.setItem('dataMovies', JSON.stringify(response));
        localStorage.setItem('query', searchQuery);
        localStorage.setItem('filterShortMovies', filterShortMovies);
      })
      .catch(() =>
        console.error(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        )
      )
      .finally(() => setLoading(false));
  }

  return (
    <div className="search-form">
      <div className="search-form__search-container">
        <div className="search-form__search-container-icon">
          <IconSearch />
        </div>
        <form
          className="search-form__form"
          onSubmit={handleSubmitSearch}
          noValidate
        >
          <input
            className={`search-form__input ${
              isSearchQueryError ? 'search-form__input_error' : ''
            }`}
            type="text"
            placeholder="Фильм"
            value={searchQuery || ''}
            onChange={(event) => setSearchQuery(event.target.value)}
            required
          />
          <div className="search-form__search-button-container">
            <button
              className="search-form__search-button"
              type="submit"
              aria-label="Поиск"
            >
              <IconSearchButton />
            </button>
          </div>
        </form>
        <div className="search-form__separator search-form__separator_type_vertical" />
        <div className="search-form__filter-desktop">
          <FilterCheckbox
            filterShortMovies={filterShortMovies}
            setFilterShortMovies={setFilterShortMovies}
          />
        </div>
      </div>
      <div className="search-form__filter-mobile">
        <FilterCheckbox
          filterShortMovies={filterShortMovies}
          setFilterShortMovies={setFilterShortMovies}
        />
      </div>
      <div className="search-form__separator search-form__separator_type_horizontal" />
    </div>
  );
}

export default SearchForm;

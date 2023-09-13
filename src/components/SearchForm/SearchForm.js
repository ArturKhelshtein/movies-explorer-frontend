import React from 'react';

import './SearchForm.css';

import IconSearch from '../IconSearch/IconSearch.js';
import IconSearchButton from '../IconSearchButton/IconSearchButton.js';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import moviesApi from '../../utils/MoviesApi';

function SearchForm({
  windowSize,
  setWindowSize,
  isLoading,
  setIsLoading,
  gridColumns,
  gridRows,
  setAmmountShowMovies,
  updateMovieCounters,
  setFullMovieList,
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchQueryError, setIsSearchQueryError] = React.useState(false);
  const [filterShortMovies, setFilterShortMovies] = React.useState(true);

  async function handleSubmitSearch(event) {
    event.preventDefault();

    // сброс ошибки, если ошибка была ранее
    setIsLoading(null);
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
    addQueryToLocalStorage();
  }

  function addQueryToLocalStorage() {
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
      )
      .finally(() => setIsLoading(false));
    localStorage.setItem('query', searchQuery);
    localStorage.setItem('filterShortMovies', filterShortMovies);
    return;
  }

  React.useEffect(() => {
    setWindowSize(window.innerWidth);
    updateMovieCounters(windowSize);
    setAmmountShowMovies(() => gridColumns * gridRows);
  }, [isLoading]);

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

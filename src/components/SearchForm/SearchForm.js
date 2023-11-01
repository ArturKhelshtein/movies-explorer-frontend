import './SearchForm.css';

import IconSearch from '../IconSearch/IconSearch.js';
import IconSearchButton from '../IconSearchButton/IconSearchButton.js';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  handleSubmitSearch,
  searchQuery,
  setSearchQuery,
  isSearchQueryError,
  filterShortMovies,
  setFilterShortMovies,
}) {

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

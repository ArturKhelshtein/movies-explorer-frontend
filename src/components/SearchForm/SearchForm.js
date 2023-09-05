import './SearchForm.css';

import IconSearch from '../IconSearch/IconSearch.js';
import IconSearchButton from '../IconSearchButton/IconSearchButton.js';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__search-container">
        <div className="search-form__search-container-icon">
          <IconSearch />
        </div>
        <form
          className="search-form__form"
          onSubmit={() => console.log('запрос на поиск отправлен')}
        >
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            value=""
            onChange="заглушка"
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
          <FilterCheckbox />
        </div>
      </div>
      <div className="search-form__filter-mobile">
        <FilterCheckbox />
      </div>
      <div className="search-form__separator search-form__separator_type_horizontal" />
    </div>
  );
}

export default SearchForm;

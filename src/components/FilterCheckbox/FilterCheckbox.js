import './FilterCheckbox.css';

function FilterCheckbox({ filterShortMovies, setFilterShortMovies }) {
  function toggleChecked() {
    return filterShortMovies === true
      ? setFilterShortMovies(false)
      : setFilterShortMovies(true);
  }

  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        defaultChecked={filterShortMovies}
        onChange={toggleChecked}
      />
      <span className="filter-checkbox__icon" />
      <span className="filter-checkbox__label">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

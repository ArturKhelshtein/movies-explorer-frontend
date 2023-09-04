import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        defaultChecked
      />
      <span className="filter-checkbox__icon" />
      <span className="filter-checkbox__label">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

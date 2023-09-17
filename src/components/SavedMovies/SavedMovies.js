import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import CardList from '../CardList/CardList.js';

function SavedMovies({ savedMoviesList, setSavedMoviesList }) {
  // состояния списков фильмов
  const [findMoviesList, setFindMoviesList] = React.useState(savedMoviesList);

  console.log(findMoviesList);

  // состояние поиска
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchQueryError, setIsSearchQueryError] = React.useState(false);
  const [filterShortMovies, setFilterShortMovies] = React.useState(false);

  // рендеринг при поиске и удалении
  React.useEffect(() => {
    handlerFindMoviesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterShortMovies, savedMoviesList]);

  function handleSubmitSearch(event) {
    event.preventDefault();

    // сброс ошибки, если ошибка была ранее
    setIsSearchQueryError(false);
    event.target[0].placeholder = 'Фильм';

    // установка ошибки если не заполнено поле поиска
    if (event.target[0].value === '') {
      event.target[0].placeholder = 'Нужно ввести ключевое слово';
      setIsSearchQueryError(true);
      return;
    }

    // корректный запрос
    handlerFindMoviesList();
  }

  function handlerFindMoviesList() {
    setFindMoviesList(
      savedMoviesList?.filter(
        (m) =>
          (filterShortMovies ? m.duration < 40 : m) &&
          (m.nameRU.toLowerCase().indexOf(searchQuery) > -1 ||
            m.nameEN.toLowerCase().indexOf(searchQuery) > -1)
      )
    );
  }

  return (
    <main className="saved-movies">
      <section className="saved-movies__container" aria-label="saved-movies">
        <SearchForm
          handleSubmitSearch={handleSubmitSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchQueryError={isSearchQueryError}
          filterShortMovies={filterShortMovies}
          setFilterShortMovies={setFilterShortMovies}
        />
        {findMoviesList.length > 0 ? (
          <CardList
            showMovieList={findMoviesList}
            savedMoviesList={savedMoviesList}
            setSavedMoviesList={setSavedMoviesList}
          />
        ) : (
          <div className="saved-movies__no-found">Ничего не найдено</div>
        )}
      </section>
    </main>
  );
}

export default SavedMovies;

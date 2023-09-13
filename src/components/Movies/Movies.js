import React from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import CardList from '../CardList/CardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';

function Movies({ savedMoviesList, setSavedMoviesList }) {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [isLoading, setIsLoading] = React.useState(null);

  const [fullMovieList, setFullMovieList] = React.useState([]);
  const [findMoviesList, setFindMoviesList] = React.useState([]);
  const [showMovies, setShowMovies] = React.useState([]);

  const [gridColumns, setGridColumns] = React.useState(0);
  const [gridRows, setGridRows] = React.useState(0);
  const [ammountShowMovies, setAmmountShowMovies] = React.useState(0);
  const [additionalDownloads, setAdditionalDownloads] = React.useState(0);
  const [isVisibleButtonDownloads, setVisibleButtonDownloads] =
    React.useState(true);

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

  React.useEffect(() => {
    updateMovieCounters(windowSize);
  }, []);

  React.useEffect(() => {
    if (isLoading === null || isLoading === true) {
      setVisibleButtonDownloads(true);
      return;
    }
    if (ammountShowMovies >= fullMovieList.length) {
      setVisibleButtonDownloads(false);
    }
    updateMovieCounters(windowSize);
    setShowMovies(fullMovieList.slice(0, ammountShowMovies));
  }, [
    isLoading,
    ammountShowMovies,
    fullMovieList,
    windowSize,
    savedMoviesList,
  ]);

  return (
    <main className="movies">
      <section className="movies__container" aria-label="movies">
        <SearchForm
          windowSize={windowSize}
          setWindowSize={setWindowSize}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          gridColumns={gridColumns}
          gridRows={gridRows}
          setAmmountShowMovies={setAmmountShowMovies}
          updateMovieCounters={updateMovieCounters}
          setFullMovieList={setFullMovieList}
        />
        {isLoading === null ? (
          <></>
        ) : isLoading === true ? (
          <Preloader />
        ) : (
          <>
            <CardList
              showMovies={showMovies}
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

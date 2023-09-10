import React from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import DownloadMore from '../DownloadMore/DownloadMore.js';

function Movies() {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [isLoading, setLoading] = React.useState(null);

  const fullCardList = JSON.parse(localStorage.getItem('dataMovies'));
  const [movieCardList, setMovieCardList] = React.useState([]);

  const [gridColumns, setGridColumns] = React.useState(0);
  const [gridRows, setGridRows] = React.useState(0);
  const [ammountShowMovieCards, setAmmountShowMovieCards] = React.useState(0);
  const [additionalDownloads, setAdditionalDownloads] = React.useState(0);
  const [isVisibleButtonDownloads, setVisibleButtonDownloads] =
    React.useState(true);

  function handleDownloadMore() {
    updateCardCounters(windowSize);
    console.log(`количество перед нажатием ${ammountShowMovieCards}`);
    // debugger;
    let complementToFull;
    if ((ammountShowMovieCards + additionalDownloads) % gridColumns === 0) {
      complementToFull = 0;
    } else {
      complementToFull =
        gridColumns -
        ((ammountShowMovieCards + additionalDownloads) % gridColumns);
    }

    setAmmountShowMovieCards(
      ammountShowMovieCards + additionalDownloads + complementToFull
    );
    console.log(`количество после нажатия ${ammountShowMovieCards}`);
    return;
  }

  function updateCardCounters(width) {
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

  React.useEffect(() => {
    if (isLoading === null || isLoading === true) {
      setVisibleButtonDownloads(true);
      return;
    }
    if (ammountShowMovieCards >= fullCardList.length) {
      setVisibleButtonDownloads(false);
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

    console.log(windowSize);

    setMovieCardList(fullCardList.slice(0, ammountShowMovieCards));
  }, [isLoading, ammountShowMovieCards, windowSize]);

  return (
    <main className="movies">
      <section className="movies__container" aria-label="movies">
        <SearchForm
          windowSize={windowSize}
          setWindowSize={setWindowSize}
          setLoading={setLoading}
          gridColumns={gridColumns}
          gridRows={gridRows}
          setAmmountShowMovieCards={setAmmountShowMovieCards}
          ammountShowMovieCards={ammountShowMovieCards}
          updateCardCounters={updateCardCounters}
        />
        {isLoading === null ? (
          <></>
        ) : isLoading === true ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesCardList={movieCardList} />
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

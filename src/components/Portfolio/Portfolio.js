import { Link } from 'react-router-dom';

import './Portfolio.css';

import IconLink from '../IconLink/IconLink';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__container">
        <li className="portfolio__container-element">
          <Link
            to="https://arturkhelshtein.github.io/how-to-learn/"
            className="portfolio__link-container"
            target="_blank"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <div className="portfolio__link-icon-container">
              <IconLink />
            </div>
          </Link>
        </li>
        <li className="portfolio__container-element">
          <Link
            to="https://arturkhelshtein.github.io/russian-travel/"
            className="portfolio__link-container"
            target="_blank"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <div className="portfolio__link-icon-container">
              <IconLink />
            </div>
          </Link>
        </li>
        <li className="portfolio__container-element">
          <Link
            to="https://arturkhelshtein.nomoreparties.co"
            className="portfolio__link-container"
            target="_blank"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <div className="portfolio__link-icon-container">
              <IconLink />
            </div>
          </Link>
        </li>
        <li className="portfolio__container-element">
          <Link
            to="https://arturkhelshtein.github.io/contest"
            className="portfolio__link-container"
            target="_blank"
          >
            <p className="portfolio__link-text">Одностраничное приложение #2</p>
            <div className="portfolio__link-icon-container">
              <IconLink />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;

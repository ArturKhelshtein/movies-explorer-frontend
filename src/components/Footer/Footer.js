import { Link, Routes, Route } from 'react-router-dom';

import './Footer.css';

const date = new Date();

function Footer() {
  return (
    <Routes>
      <Route
        exact
        path="/*"
        element={
          <footer className="footer">
            <p className="footer__title">
						Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
            </p>
            <div className="footer__separator" />
            <div className="footer__content">
              <p className="footer__copyright">
                © {date.getFullYear()} by Artur Khelshtein
              </p>
              <div className="footer__link-container">
                <Link
                  to="https://practicum.yandex.ru/"
                  className="footer__link"
                  target="_blank"
                >
                  Яндекс.Практикум
                </Link>
                <Link
                  to="https://github.com/ArturKhelshtein"
                  className="footer__link"
                  target="_blank"
                >
                  Github
                </Link>
              </div>
            </div>
          </footer>
        }
      />
      <Route path="/signup" />
      <Route path="/signin" />
      <Route path="/profile" />
    </Routes>
  );
}

export default Footer;

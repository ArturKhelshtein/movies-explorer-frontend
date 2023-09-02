import { useNavigate } from 'react-router-dom';

import './NoFound.css';

import Button from '../Button/Button';

function NoFound() {
  const navigate = useNavigate();

  function returnBack() {
    navigate(-1);
  }

  return (
    <main className="no-found">
      <div className="no-found__error">
        <h1 className="no-found__error-title">404</h1>
        <p className="no-found__error-paragraph">Страница не&nbsp;найдена</p>
      </div>
      <div className="no-found__button">
        <Button type="link" buttonName="назад" onClick={returnBack} />
      </div>
    </main>
  );
}

export default NoFound;

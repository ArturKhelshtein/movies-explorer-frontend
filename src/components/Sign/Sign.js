import { Link } from 'react-router-dom';

import './Sign.css';

import LogoLink from '../LogoLink/LogoLink';
import Button from '../Button/Button';

function Sign({
  title,
  buttonName,
  linkDescription,
  linkText,
  linkTo,
  handleSubmit,
  children,
  isValid,
  isSendRequest,
  errorRequest,
  errorText
}) {
  return (
    <main className="sign">
      <section className="sign__container">
        <div className="sign__form-group">
          <LogoLink />
        </div>
        <h3 className="sign__title">{title}</h3>
        <form
          className="sign__form"
          name="sign__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="sign__form-input">{children}</div>
          <div className="sign__form-group">
            <span
              className={`${
                errorRequest ? 'sign__error' : 'sign__error_false'
              }`}
            >
              {errorText}
            </span>
            <Button
              type="submit-form"
              buttonName={buttonName}
              onSubmit={handleSubmit}
              isDisabled={!isValid || isSendRequest}
            />
            <div className="sign__link-container">
              <p className="sign__link-description">{linkDescription}</p>
              <Link to={linkTo} className="sign__link">
                {linkText}
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Sign;

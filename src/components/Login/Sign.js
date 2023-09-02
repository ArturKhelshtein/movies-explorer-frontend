import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

function Sign({ onSubmit, title, buttonName, linkText, linkTo }) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(values);
  }

  return (
    <main className="sign">
      <div className="sign__container">
        <h3 className="sign__heading">{title}</h3>
        <form className="sign__form" name="sign__form" onSubmit={handleSubmit}>
          <div className="sign__form-element">
            <input
              className="sign__input sign__input_value_email"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email || ''}
              onChange={handleChange}
              required
            />
            <input
              className="sign__input sign__input_value_password"
              type="password"
              name="password"
              placeholder="Пароль"
              value={values.password || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign__form-element">
            <button
              className="sign__button-save"
              type="submit"
              aria-label="{buttonName}"
            >
              {buttonName}
            </button>
            {Boolean(linkText) && (
              <Link to={linkTo} className="sign__link">
                {linkText}
              </Link>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

export default Sign;

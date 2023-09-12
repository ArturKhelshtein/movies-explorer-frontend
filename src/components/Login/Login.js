import React from 'react';
import { useNavigate } from 'react-router-dom';

import Sign from '../Sign/Sign';
import useForm from '../../hooks/useForm';
import mainApi from '../../utils/MainApi';

function Login({
  title,
  buttonName,
  linkDescription,
  linkText,
  linkTo,
  setLogged,
}) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [errorLogin, setErrorLogin] = React.useState(false);

  const navigate = useNavigate();

  function handleLoginSubmit({ email, password }) {
    mainApi
      .signIn({ email, password })
      .then(() => {
        navigate('/', { replace: true });
        setLogged(true);
        setErrorLogin(false);
      })
      .catch((error) => {
        setLogged(false);
        setErrorLogin(true);
        console.error(`Ошибка при входе пользователя: ${error}`);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleLoginSubmit(values);
  }

  return (
    <Sign
      title={title}
      buttonName={buttonName}
      linkDescription={linkDescription}
      linkText={linkText}
      linkTo={linkTo}
      handleSubmit={handleSubmit}
    >
      <label className="sign__input-label">E-mail</label>
      <input
        className={`sign__input sign__input_value_email ${
          errorLogin ? 'sign__input_error' : ''
        }`}
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      <label className="sign__input-label">Пароль</label>
      <input
        className={`sign__input sign__input_value_password ${
          errorLogin ? 'sign__input_error' : ''
        }`}
        type="password"
        name="password"
        minLength="2"
        maxLength="30"
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}
        required
      />
      <span className={`${errorLogin ? 'sign__error' : 'sign__error_false'}`}>
        Что-то пошло не&nbsp;так...
      </span>
    </Sign>
  );
}

export default Login;

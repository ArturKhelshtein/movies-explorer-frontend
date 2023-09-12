import React from 'react';
import { useNavigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
import Sign from '../Sign/Sign';
import useForm from '../../hooks/useForm';

function Register({
  title,
  buttonName,
  linkDescription,
  linkText,
  linkTo,
  setLogged,
}) {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [errorRegister, setErrorRegister] = React.useState(false);

  const navigate = useNavigate();

  function handleRegisterSubmit({ name, email, password }) {
    mainApi
      .signUp({ name, email, password })
      .then(() => {
        navigate('/', { replace: true });
        setLogged(true);
        setErrorRegister(false);
      })
      .catch((error) => {
        setLogged(false);
        setErrorRegister(true);
        console.error(`Ошибка при регистрации пользователя: ${error}`);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleRegisterSubmit(values);
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
      <label className="sign__input-label">Имя</label>
      <input
        className={`sign__input sign__input_value_name ${
          errorRegister ? 'sign__input_error' : ''
        }`}
        type="text"
        name="name"
        minLength="2"
        maxLength="30"
        placeholder="Имя"
        value={values.name || ''}
        onChange={handleChange}
        required
      />
      <label className="sign__input-label">E-mail</label>
      <input
        className={`sign__input sign__input_value_email ${
          errorRegister ? 'sign__input_error' : ''
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
          errorRegister ? 'sign__input_error' : ''
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
      <span
        className={`${errorRegister ? 'sign__error' : 'sign__error_false'}`}
      >
        Что-то пошло не&nbsp;так...
      </span>
    </Sign>
  );
}

export default Register;

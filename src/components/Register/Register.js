import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
import Sign from '../Sign/Sign';
import useFormWithValidation from '../../hooks/useFormWithValidatiion';
import {
  ERRORTEXT_REGISTER,
  ERRORTEXT_REGISTER_OCCUPIEDEMAIL,
  ERRORTEXT_LOGIN,
  ERRORTEXT_LOGIN_WRONGTOKEN,
} from '../../utils/errorText';

function Register({
  isLogged,
  isSendRequest,
  setSendRequest,
  title,
  linkDescription,
  linkText,
  linkTo,
  setLogged,
}) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();
  const [errorRequest, setErrorRequest] = React.useState(false);
  const [errorText, setErrorText] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  async function handleRegisterSubmit(event) {
    event.preventDefault();
    setSendRequest(true);
    const { email, name, password } = values;
    setErrorText('');

    await mainApi
      .signUp({ name, email, password })
      .then(() => {
        navigate('/movies', { replace: true });
        setErrorRequest(false);
      })
      .catch((error) => {
        setErrorRequest(true);
        if (error.status === 409) {
          setErrorText(ERRORTEXT_REGISTER_OCCUPIEDEMAIL);
          console.error(ERRORTEXT_REGISTER_OCCUPIEDEMAIL);
          return;
        }
        setErrorText(ERRORTEXT_REGISTER);
        console.error(ERRORTEXT_REGISTER);
      });

    await mainApi
      .signIn({ email, password })
      .then(() => {
        navigate('/movies', { replace: true });
        setLogged(true);
        setErrorRequest(false);
      })
      .catch((error) => {
        setLogged(false);
        setErrorRequest(true);
        if (error.status === 401) {
          setErrorText(ERRORTEXT_LOGIN_WRONGTOKEN);
          console.error(ERRORTEXT_LOGIN_WRONGTOKEN);
        }
        setErrorText(ERRORTEXT_LOGIN);
        console.error(ERRORTEXT_LOGIN);
      })
      .finally(() => setSendRequest(false));
  }

  return !isLogged ? (
    <Sign
      title={title}
      buttonName={`${isSendRequest ? 'Регистрация...' : 'Зарегестрироваться'}`}
      linkDescription={linkDescription}
      linkText={linkText}
      linkTo={linkTo}
      handleSubmit={handleRegisterSubmit}
      isValid={isValid}
      isSendRequest={isSendRequest}
      errorRequest={errorRequest}
      errorText={errorText}
    >
      <label className="sign__input-label">Имя</label>
      <input
        className={`sign__input sign__input_value_name ${
          errors.name ? 'sign__input_error' : ''
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
      <span className="sign__validation" name="sign-validation-name">
        {errors.name || ' '}
      </span>
      <label className="sign__input-label">E-mail</label>
      <input
        className={`sign__input sign__input_value_email ${
          errors.email ? 'sign__input_error' : ''
        }`}
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      <span className="sign__validation" name="sign-validation-email">
        {errors.email || ' '}
      </span>
      <label className="sign__input-label">Пароль</label>
      <input
        className={`sign__input sign__input_value_password ${
          errors.password ? 'sign__input_error' : ''
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
      <span className="sign__validation" name="sign-validation-password">
        {errors.password || ' '}
      </span>
    </Sign>
  ) : (
    <Navigate to="/profile" replace />
  );
}

export default Register;

import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
import Sign from '../Sign/Sign';
import useFormWithValidation from '../../hooks/useFormWithValidatiion';
import {
  ERRORTEXT_LOGIN,
  ERRORTEXT_LOGIN_WRONGTOKEN,
} from '../../utils/errorText';

function Login({
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

  function handleLoginSubmit(event) {
    event.preventDefault();
    setSendRequest(true);
    const { email, password } = values;
    setErrorText('');

    mainApi
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
      buttonName={`${isSendRequest ? 'Входим...' : 'Войти'}`}
      linkDescription={linkDescription}
      linkText={linkText}
      linkTo={linkTo}
      handleSubmit={handleLoginSubmit}
      isValid={isValid}
      isSendRequest={isSendRequest}
      errorRequest={errorRequest}
      errorText={errorText}
    >
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

export default Login;

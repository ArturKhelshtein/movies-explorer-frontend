import './Login.css';

import Sign from '../Sign/Sign';
import useForm from '../../hooks/useForm';

function Login({
  onSubmit,
  title,
  buttonName,
  linkDescription,
  linkText,
  linkTo,
}) {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(values);
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
      <label className="login__input-label">E-mail</label>
      <input
        className="login__input login__input_value_email"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      <label className="login__input-label">Пароль</label>
      <input
        className="login__input login__input_value_password login__input_error"
        type="password"
        name="password"
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}
        required
      />
      <span className="login__error">Что-то пошло не&nbsp;так...</span>
    </Sign>
  );
}

export default Login;

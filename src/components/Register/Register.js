import './Register.css';

import Sign from '../Sign/Sign';
import useForm from '../../hooks/useForm';

function Register({
  onSubmit,
  title,
  buttonName,
  linkDescription,
  linkText,
  linkTo,
}) {
  const { values, handleChange } = useForm({
    name: '',
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
      <label className="register__input-label">Имя</label>
      <input
        className="register__input register__input_value_name"
        type="text"
        name="name"
        placeholder="Имя"
        value={values.name || ''}
        onChange={handleChange}
        required
      />
      <label className="register__input-label">E-mail</label>
      <input
        className="register__input register__input_value_email"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      <label className="register__input-label">Пароль</label>
      <input
        className="register__input register__input_value_password register__input_error"
        type="password"
        name="password"
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}
        required
      />
      <span className="register__error">Что-то пошло не&nbsp;так...</span>
    </Sign>
  );
}

export default Register;

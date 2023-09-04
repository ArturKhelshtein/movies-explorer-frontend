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
      <label className="sign__input-label">Имя</label>
      <input
        className="sign__input sign__input_value_name"
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
        className="sign__input sign__input_value_email"
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      <label className="sign__input-label">Пароль</label>
      <input
        className="sign__input sign__input_value_password sign__input_error"
        type="password"
        name="password"
				minLength="2"
				maxLength="30"
        placeholder="Пароль"
        value={values.password || ''}
        onChange={handleChange}
        required
      />
      <span className="sign__error">Что-то пошло не&nbsp;так...</span>
    </Sign>
  );
}

export default Register;

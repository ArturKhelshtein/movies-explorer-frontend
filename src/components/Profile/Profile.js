import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button from '../Button/Button';

function Profile({ setLogged }) {
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);
  const [startEdit, setStartEdit] = React.useState(false);
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleStartEdit(event) {
    event.preventDefault();

    return setStartEdit(true);
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    return console.log(`отправить изменение профиля → ${values}. заглушка`);
  }

  function handleSignOut() {
    navigate('/');
    setLogged(false);
    return console.log(`выйти из профиля пользователя. заглушка`);
  }

  return (
    <main className="profile">
      <h2 className="profile__header">Привет, Виталий!</h2>
      <form
        className="profile__form"
        name="profile"
        onSubmit={handleSubmitForm}
        //noValidate
      >
        <div className="profile__input-container-group">
          <div className="profile__input-container">
            <p className="profile__input-label">Имя</p>
            <input
              className="profile__input profile__input_value_user-name"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              value={values.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile__separator"> </div>
          <div className="profile__input-container">
            <p className="profile__input-label">E-mail</p>
            <input
              className="profile__input profile__input_value_email"
              type="email"
              name="email"
              placeholder="Почта"
              value={values.email || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="profile__input-container-group">
          <div
            className={`profile__button-save ${
              startEdit ? 'profile__button-save_show' : ''
            } `}
          >
            <span className="profile__error">
              При обновлении профиля произошла ошибка.
            </span>
            <Button
              type="submit-form"
              buttonName="Сохранить"
              onClick={handleSubmitForm}
            />
          </div>
        </div>
      </form>
      <div
        className={`profile__button-edit ${
          startEdit ? '' : 'profile__button-edit_show'
        } `}
      >
        <Button
          type="profile-edit"
          buttonName="Редактировать"
          onClick={handleStartEdit}
        />
        <Button
          type="profile-signout"
          buttonName="Выйти из аккаунта"
          onClick={handleSignOut}
        />
      </div>
    </main>
  );
}

export default Profile;

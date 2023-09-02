import React from 'react';

import './Profile.css';

import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button from '../Button/Button';

function Profile() {
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
              name="about"
              placeholder="Почта"
              value={values.email || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="profile__input-container-group">
          <div
            className={` ${
              startEdit
                ? 'profile__start-edit_true'
                : 'profile__start-edit_false'
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
        className={` ${
          startEdit ? 'profile__start-edit_false' : 'profile__start-edit_true'
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

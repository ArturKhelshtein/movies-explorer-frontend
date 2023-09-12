import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button from '../Button/Button';
import mainApi from '../../utils/MainApi';
import { ERRORTEXT_PATCHUSER } from '../../utils/errorText';

function Profile({ setLogged, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);
  const [startEdit, setStartEdit] = React.useState(false);
  const [isChangedProfile, setIsCangedProfie] = React.useState(false);
  const { values, handleChange, setValues } = useForm({});
  const [errorPatchUser, setErrorPatchUser] = React.useState(false);

  React.useEffect(() => {
    setIsCangedProfie(false);
  }, []);

  React.useEffect(() => {
    if (
      !(values.email === currentUser.email) ||
      !(values.name === currentUser.name)
    ) {
      setIsCangedProfie(true);
    }
  }, [values]);

  React.useEffect(() => {
    setValues(currentUser);
    setIsCangedProfie(false);
  }, [currentUser]);

  function handleStartEdit(event) {
    event.preventDefault();
    return setStartEdit(true);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    const email = values.email;
    const name = values.name;
    mainApi
      .patchUserMe(email, name)
      .then((data) => {
        setErrorPatchUser(false);
        setCurrentUser(data.dataUser);
      })
      .catch((error) => {
        setErrorPatchUser(true);
        console.error(error);
      });
  }

  function handleSignOut() {
    mainApi
      .signOut()
      .then(() => {
        navigate('/', { replace: true });
        setLogged(false);
        localStorage.clear();
      })
      .catch((error) => {
        console.error(`Ошибка при выходе пользователя: ${error}`);
      });
  }

  return (
    <main className="profile">
      <section className="profile__section">
        <h2 className="profile__header">{`Привет, ${currentUser?.name}!`}</h2>
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
                readOnly={!startEdit}
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
                readOnly={!startEdit}
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
              <span
                className={`${
                  errorPatchUser ? 'profile__error' : 'profile__error_false'
                }`}
              >
                {ERRORTEXT_PATCHUSER}
              </span>
              <Button
                type={`${
                  isChangedProfile ? 'submit-form' : 'submit-form-disable'
                }`}
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
      </section>
    </main>
  );
}

export default Profile;

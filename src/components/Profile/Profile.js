import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

import useFormWithValidation from '../../hooks/useFormWithValidatiion';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button from '../Button/Button';
import mainApi from '../../utils/MainApi';
import PopupSuccesedPatch from '../PopupSuccesedPatch/PopupSuccesedPatch';
import {
  ERRORTEXT_PATCHUSER,
  ERRORTEXT_REGISTER_OCCUPIEDEMAIL,
} from '../../utils/errorText';

function Profile({ isSendRequest, setSendRequest, setLogged, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);
  const [startEdit, setStartEdit] = React.useState(false);
  const [isChangedProfile, setIsCangedProfie] = React.useState(false);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();
  const [errorPatchUser, setErrorPatchUser] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [isSuccesedPatch, setSuccesedPatch] = React.useState(false);

  React.useEffect(() => {
    setIsCangedProfie(false);
  }, []);

  React.useEffect(() => {
    if (
      !(values.email === currentUser.email) ||
      !(values.name === currentUser.name)
    ) {
      setIsCangedProfie(true);
    } else {
      setIsCangedProfie(false);
    }
    setErrorPatchUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, setIsCangedProfie]);

  React.useEffect(() => {
    resetForm(currentUser, {}, true);
    setIsCangedProfie(false);
  }, [currentUser, resetForm]);

  function handleStartEdit(event) {
    event.preventDefault();
    return setStartEdit(true);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    setSendRequest(true);
    const { email, name } = values;

    mainApi
      .patchUserMe(email, name)
      .then((data) => {
        setErrorPatchUser(false);
        setCurrentUser(data.dataUser);
        setStartEdit(false);
        setSuccesedPatch(true);
      })
      .catch((error) => {
        setErrorPatchUser(true);
        setErrorText(
          error.status === 409
            ? ERRORTEXT_REGISTER_OCCUPIEDEMAIL
            : ERRORTEXT_PATCHUSER
        );
        console.error(error);
      })
      .finally(() => setSendRequest(false));
  }

  function handleSignOut() {
    setSendRequest(true);
    mainApi
      .signOut()
      .then(() => {
        navigate('/', { replace: true });
        setLogged(false);
        localStorage.clear();
      })
      .catch((error) => {
        setErrorText(ERRORTEXT_PATCHUSER);
        console.error(`Ошибка при выходе пользователя: ${error}`);
      })
      .finally(() => setSendRequest(false));
  }
  function handlePopupClose() {
    setSuccesedPatch(false);
  }

  return (
    <main className="profile">
      <section className="profile__section">
        <PopupSuccesedPatch
          name="succesed"
          title="Информация обновлена"
          isOpen={isSuccesedPatch}
          buttonType="submit-form"
          buttonName="OK"
          onClose={handlePopupClose}
        />
        <h2 className="profile__header">{`Привет, ${currentUser?.name}!`}</h2>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmitForm}
          noValidate
        >
          <div className="profile__input-container-group">
            <div className="profile__input-container">
              <p className="profile__input-label">Имя</p>
              <input
                className={`profile__input profile__input_value_user-name ${
                  errors.name ? 'profile__input_error' : ''
                }`}
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
            <span
              className="profile__validation"
              name="profile-validation-name"
            >
              {errors.name || ' '}
            </span>
            <div className="profile__input-container">
              <p className="profile__input-label">E-mail</p>
              <input
                className={`profile__input profile__input_value_email ${
                  errors.email ? 'profile__input_error' : ''
                }`}
                type="email"
                name="email"
                placeholder="Почта"
                value={values.email || ''}
                onChange={handleChange}
                readOnly={!startEdit}
                required
              />
            </div>
            <span
              className="profile__validation"
              name="profile-validation-email"
            >
              {errors.email || ' '}
            </span>
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
                {errorText}
              </span>
              <Button
                type={`submit-form`}
                buttonName={`${isSendRequest ? 'Сохраняю...' : 'Сохранить'}`}
                onClick={handleSubmitForm}
                isDisabled={!isChangedProfile || !isValid || isSendRequest}
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
            buttonName={`${isSendRequest ? 'Выходим...' : 'Выйти из аккаунта'}`}
            onClick={handleSignOut}
            isDisabled={isSendRequest}
          />
        </div>
      </section>
    </main>
  );
}

export default Profile;

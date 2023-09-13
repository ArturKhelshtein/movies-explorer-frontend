// Тексты ошибок (Ошибки ниже отображаются не под инпутами, а при получении ошибки после отправки запроса)
const ERRORTEXT_LOGIN = 'Вы ввели неправильный логин или пароль.';
const ERRORTEXT_LOGIN_INCORRECTTOKEN = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
const ERRORTEXT_LOGIN_WRONGTOKEN = 'При авторизации произошла ошибка. Переданный токен некорректен.';

const ERRORTEXT_REGISTER = 'При регистрации пользователя произошла ошибка.';
const ERRORTEXT_REGISTER_OCCUPIEDEMAIL = 'Пользователь с таким email уже существует.';

const ERRORTEXT_PATCHUSER = 'При обновлении профиля произошла ошибка.';
const ERRORTEXT_PATCHUSER_OCCUPIEDEMAIL = 'Пользователь с таким email уже существует.';

const ERRORTEXT_SERVERERROR = '500 На сервере произошла ошибка.';

const ERRORTEXT_NOFOUND = '404 Страница по указанному маршруту не найдена.';


module.exports = {
  ERRORTEXT_LOGIN,
  ERRORTEXT_LOGIN_INCORRECTTOKEN,
  ERRORTEXT_LOGIN_WRONGTOKEN,
  ERRORTEXT_REGISTER,
  ERRORTEXT_REGISTER_OCCUPIEDEMAIL,
  ERRORTEXT_PATCHUSER,
  ERRORTEXT_PATCHUSER_OCCUPIEDEMAIL,
  ERRORTEXT_SERVERERROR,
  ERRORTEXT_NOFOUND
};

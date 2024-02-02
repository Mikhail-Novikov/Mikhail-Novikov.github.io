import { SagaIterator } from 'redux-saga';
import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { api, actions as profileActions } from '@features/profile';
import { sagas as sagasToken } from '@features/token';

import { actions as profileProcessAction } from './actions';
/**
 * Процесс для авторизованного пользователя с токеном
 * @returns {void}
 */
export function* profileProcess(): SagaIterator {
  try {
    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на сервер и получение id, email, signupDate */
    const profileData: SagaReturnType<typeof api.profileFetch> = yield call(
      api.profileFetch,
      tokenApp,
    );

    /** пишем в setState полученные данные чтоб потом извлечь из седетора в компоненте */
    yield put(profileActions.setState(profileData));

    /** АВТОМАТИЧЕСКАЯ ПОДРУЗКА ДАННЫХ ИЗ ПРОФИЛЯ  - ИНИЦИАЛИЗАЦИЯ */
    /** 1. ручной переход на страницу профиля если пользователь зарегистрирован isAuth = true
     *  2. получить токен с localStorage.getItem и передать параметром в запрос
     *  2. запрос на получение данных с сервера profileFetch (дата регистрации, почта)
     *  3. ответ получит setState
     *
     *  если пользователь НЕ зарегистрирован isAuth = false
     */
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error profile process', error);
  }
}

/**
 * Процесс для авторизованного пользователя с токеном, смена пароля /profile/change-password POST PROTECTED
 * @returns {void}
 */
export function* profileAuthProcess({
  payload,
}: ReturnType<typeof profileProcessAction.profileAuth>): SagaIterator {
  try {
    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на сервер и получение положительного ответа о смене пароля */
    const success: SagaReturnType<typeof api.profileChangePasswordFetch> =
      yield call(api.profileChangePasswordFetch, payload, tokenApp);

    /** пишем в setState признак успешного действия */
    yield put(profileActions.changePasswordResult(success));
    yield delay(10000);
    yield put(profileActions.changePasswordResult(false));

    /** ОТПРАВИТЬ ДАННЫЕ ПОЛЕЙ ФОРМЫ
    /** 1. Поля password & newPassword отправка на сервер /profile/change-password POST
     *  2. получить токен
     *  3. запрос на сервер profileChangePasswordFetch (пароли и токен)
     *  4. ответ получит setState вида - success: boolean
     *  5. статус покажем на странице
     */
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error profile process', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* profileProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(profileProcessAction.profile, profileProcess),
    takeEvery(profileProcessAction.profileAuth, profileAuthProcess),
  ]);
}

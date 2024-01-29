import { SagaIterator } from 'redux-saga';
import { SagaReturnType, all, call, put, takeEvery } from 'redux-saga/effects';

import { api, actions as profileActions } from '@features/profile';
import { sagas as sagasToken } from '@features/token';

import { actions as profileProcessAction } from './actions';
/**
 * Процесс инициализации приложения
 * @returns {void}
 */
export function* profileProcess(): SagaIterator {
  try {
    // eslint-disable-next-line no-console
    /* читаем токен из хранилища браузера */
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

    /** Записываем данные профиля в стейт ? */

    /** данные профиля нам нужны только при открытии страницы профиля,
     *  то есть надо сделать запрос на сервер и получить
     *  данные профиля и показать на странице профиля */

    /* процесс для profile */
    /** 1. ручной переход на страницу профиля
     *  2. запуск процесса Profile по хуку из компонента
     *  3. запрос на сервер с получением данных для старницы
     *  4. данные нужно отобразить на странице профиля через селектор
     *  5. использовать селектор profileSelectors от setState редюсера
     *  6. в компоненте извлекаем из селектора данные и парсим(подставляем) значения в разметку
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
  yield all([takeEvery(profileProcessAction.profile, profileProcess)]);
}

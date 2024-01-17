import { SagaIterator } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

import { actions as registrationActions } from '@features/registration';

import { actions as registrationProcessAction } from './actions';
import { actions as useTokenProcessActions } from '../token/actions';

/**
 * Процесс инициализации приложения
 * @returns {void}
 */
export function* registrationProcess(): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run before registraion worker');
  try {
    /* Запуск процесса токена */
    yield put(useTokenProcessActions.token());

    /* Записываем или отправляем на сервер токен */

    /* Запрашиваем ответ сервера или читаем токен c localstorage */

    /* Разрешаем авторизацию  */
    yield put(registrationActions.registration());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error registration process', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* registrationProcessWatcher(): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run registration-Process-Watcher');

  yield all([
    takeEvery(registrationProcessAction.registration, registrationProcess),
  ]);
}

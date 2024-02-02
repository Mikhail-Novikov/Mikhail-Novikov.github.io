import { SagaIterator } from 'redux-saga';
import { all, put, takeEvery } from 'redux-saga/effects';

import { actions as tokenActions } from '@features/token';

import { actions as tokenProcessAction } from './actions';

/**
 * Процесс инициализации приложения
 * @returns {void}
 */
export function* tokenProcess(): SagaIterator {
  try {
    /** Генерируем токен  */
    yield put(tokenActions.generationToken());
    /** Надо записать полученное значение токена в Local сторадж браузера  */
    yield put(tokenActions.recTokenApp);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error token process', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* tokenProcessWatcher(): SagaIterator {
  yield all([takeEvery(tokenProcessAction.token, tokenProcess)]);
}

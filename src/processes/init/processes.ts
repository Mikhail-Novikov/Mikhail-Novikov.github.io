import { createHashHistory } from 'history';
import { SagaIterator } from 'redux-saga';
import { put, all, takeEvery } from 'redux-saga/effects';

import { actions as initActions } from '@features/init-app';

import { actions as initProcessActions } from './actions';

export const history = createHashHistory();

/**
 * Процесс инициализации приложения
 * @returns {void}
 */
export function* initProcess(): SagaIterator {
  try {
    yield put(initActions.switchIsInitApp());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker init app', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]); // eslint-disable-next-line no-console
}

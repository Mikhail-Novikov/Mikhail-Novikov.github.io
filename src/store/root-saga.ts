import { initProcessWatcher } from '@processes/init';
import { tokenProcessWatcher } from '@processes/token';
import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { registrationProcessWatcher } from '@src/processes/registration';

/**
 * Главная сага - точка входа
 * @returns {void}
 */
export function* rootSaga(): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run rootSaga');
  yield all(
    [tokenProcessWatcher, initProcessWatcher, registrationProcessWatcher].map(
      fork,
    ),
  );
}

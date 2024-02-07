import { initProcessWatcher } from '@processes/init';
import { operationProcessWatcher } from '@processes/operation';
import { profileProcessWatcher } from '@processes/profile';
import { registrationProcessWatcher } from '@processes/registration';
import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { categoryProcessWatcher } from '@src/processes/category';

/**
 * Главная сага - точка входа
 * @returns {void}
 */
export function* rootSaga(): SagaIterator {
  yield all(
    [
      initProcessWatcher,
      registrationProcessWatcher,
      profileProcessWatcher,
      operationProcessWatcher,
      categoryProcessWatcher,
    ].map(fork),
  );
}

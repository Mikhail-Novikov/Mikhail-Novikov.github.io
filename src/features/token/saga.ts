import { SagaIterator } from 'redux-saga';
import { CallEffect, call, put, select } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import {
  actions as tokenActions,
  selectors as selectorsToken,
} from '@features/token';

import { TokenState } from './types';

/**
 * Сага записи токена
 * @returns {string} token код системы в которой авторизуемся
 */
export function* saveToken(): SagaIterator<TokenState> {
  yield put(tokenActions.generationToken());

  const token = yield select(selectorsToken.useTokenSelector);

  return token;
}

/**
 * Сага читатет токен из хранилища
 * @returns token код системы в которой авторизуемся либо 'not-auth'
 */
export function* getTokenValueFromStorage(): Generator<
  CallEffect<string>,
  string,
  never
> {
  const getTokenApp = (): string => localStorage.getItem('token-app');
  const tokenApp = yield call(getTokenApp);

  return tokenApp ?? 'not-auth';
}

export const sagas = {
  getTokenValueFromStorage,
  saveToken,
};

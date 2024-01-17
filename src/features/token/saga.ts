import { SagaIterator } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import {
  actions as tokenActions,
  selectors as selectorsToken,
} from '@features/token';

import { TokenState } from './types';

/**
 * Сага создание токена
 * @returns {string} token код системы в которой авторизуемся
 */
export function* generatorToken(): SagaIterator<TokenState> {
  yield put(tokenActions.generationToken());

  const token = yield select(selectorsToken.useTokenSelector);

  return token;
}

export const sagas = {
  generatorToken,
};

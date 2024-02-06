import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType } from 'redux-saga/effects';

import { sagas as sagasToken } from '@features/token';

import { api as apiOperation } from './api';
import { actions as operationActions } from './ducks';
import { BudgetState } from './types';

/**
 * Сага получения списка созданных
 * @returns  профиль и token
 */
export function* getListOfCreatedOperations(): SagaIterator<BudgetState[]> {
  /* читаем токен из хранилища браузера */
  const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
    yield call(sagasToken.getTokenValueFromStorage);
  /* запускаем saga получение данных */
  const operations: SagaReturnType<typeof apiOperation.getOperations> =
    yield call(apiOperation.getOperations, tokenApp, 5);

  /** запись данных в стейт для селектора */
  yield put(operationActions.setOperations(operations));

  return operations;
}

export const sagas = {
  getListOfCreatedOperations,
};

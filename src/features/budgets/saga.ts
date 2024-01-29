import { SagaIterator } from 'redux-saga';
import { call, SagaReturnType } from 'redux-saga/effects';

import { api } from './api';
import { BudgetState } from './types';

/**
 * Сага операций подсчёта бюджета
 * @returns  профиль и token
 */
export function* getBudgetSaga(): SagaIterator<BudgetState> {
  /** запрос на сервер */
  const BudgetsData: SagaReturnType<typeof api.BudgetsFetch> = yield call(
    api.BudgetsFetch,
  );

  return BudgetsData;
}

export const sagas = {
  getBudgetSaga,
};

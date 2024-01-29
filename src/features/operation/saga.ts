import { SagaIterator } from 'redux-saga';
import { SagaReturnType, call, put, select } from 'redux-saga/effects';

import {
  selectors as operationSelectors,
  api as apiBudgetItem,
  actions as operationActions,
} from '@features/operation';

/**
 * Сага получает данные о конкретной операции из таблицы,
 * для просмотра её на детальной странице
 * и для редактирования операции(заполнения формы)
 * @returns void - запись в стейт
 */

export function* getDataOperationById(ids: string): SagaIterator<any> {
  console.log('🚀 ~ function*getDataOperationById ~ ids:', ids);

  const id = '651b1a5bba9cfae1c95bd3a6';
  try {
    /** получение id operation */
    // const { id }: ReturnType<typeof operationSelectors.operationSelectors> =
    //   yield select(operationSelectors.operationSelectors);

    /** запрос на сервер c id */
    const operationData: SagaReturnType<typeof apiBudgetItem.operationFetch> =
      yield call(apiBudgetItem.operationFetch, id);

    /** запись данных в стейт для селектора */
    yield put(operationActions.setFields(operationData));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error getDataOperationById', error);
  }
}

export const sagas = {
  getDataOperationById,
};

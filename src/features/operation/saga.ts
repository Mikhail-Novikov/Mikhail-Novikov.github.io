import { SagaIterator } from 'redux-saga';
import { SagaReturnType, call, put } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import {
  api as apiBudgetItem,
  actions as operationActions,
} from '@features/operation';

/**
 * Сага получает данные о конкретной операции из таблицы,
 * для просмотра её на детальной странице
 * и для редактирования операции(заполнения формы)
 * @returns void - запись в стейт
 */

export function* getDataOperationById(id: string): SagaIterator<void> {
  try {
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

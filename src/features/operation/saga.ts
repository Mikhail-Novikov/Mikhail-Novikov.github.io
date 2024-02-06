import { SagaIterator } from 'redux-saga';
import { SagaReturnType, call, put, take } from 'redux-saga/effects';

import { actions as modalActions } from '@features/modal';
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

/**
 * Сага подтверждения,
 * удаления/редактирования
 * @returns boolean
 */

export function* confirmSaga(): SagaIterator<boolean> {
  /** запрос на сервер c id */
  yield put(
    modalActions.showModalMessage({
      isOpenSuccess: true,
      message: 'Вы действительно хотите удалить операцию?',
      title: 'Удаление',
      rightBtn: 'Удалить',
    }),
  );

  const { payload: isConfirm } = yield take(modalActions.confirm);

  yield put(
    modalActions.showModalMessage({
      isOpenSuccess: false,
      message: '',
      title: 'Удаление',
      rightBtn: 'Удалить',
    }),
  );

  return isConfirm;
}

export const sagas = {
  getDataOperationById,
  confirmSaga,
};

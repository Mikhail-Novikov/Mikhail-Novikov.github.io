import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import {
  put,
  all,
  takeEvery,
  call,
  SagaReturnType,
  select,
} from 'redux-saga/effects';

import { config } from '@common/config';

import { sagas as budgetSagas } from '@features/budgets';
import { actions as modalActions } from '@features/modal';
import {
  selectors as operationSelectors,
  api as apiOperation,
  actions as operationActions,
  sagas as operationSagas,
} from '@features/operation';
import { sagas as sagasToken } from '@features/token';

import { actions as operationProcessActions } from './actions';

/**
 * Процесс редактирования операции
 * @returns {void}
 */
export function* editOperation(): SagaIterator {
  try {
    /** получение id operation */
    const { id }: ReturnType<typeof operationSelectors.operationSelectors> =
      yield select(operationSelectors.operationSelectors);

    /** запускаем saga получение данных об операции которую хотим изменить */
    yield call(operationSagas.getDataOperationById, id);

    /** открытие модального окна, редактирования операции */
    yield put(
      modalActions.showModal({
        isOpen: true,
        isOpenSuccess: false,
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker budget app', error);
  }
}

/**
 * Процесс отправки отредактированной операции(см. выше)
 * @returns {void}
 */
export function* sendEditFormOperation({
  payload,
}: ReturnType<
  typeof operationProcessActions.sendEditFormOpertaion
>): SagaIterator {
  try {
    /** получение id операции */
    const { id }: ReturnType<typeof operationSelectors.operationSelectors> =
      yield select(operationSelectors.operationSelectors);

    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    const status: SagaReturnType<typeof apiOperation.editOperationFetch> =
      yield call(apiOperation.editOperationFetch, payload, tokenApp, id);

    /** перезапуск - обновление списка после изменений */
    yield call(budgetSagas.getListOfCreatedOperations);

    if (status === 200) {
      /** открытие модального окна, успех */
      yield put(
        modalActions.showModalMessage({
          isOpenSuccess: true,
          title: 'Операция',
          message: 'Операция изменена',
          rightBtn: null,
        }),
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker sendEditFormCategory', error);
  }
}

/**
 * Процесс добавления операции
 * @returns {void}
 */
export function* addOperation(
  fieldsAddOPeration: ReturnType<typeof operationProcessActions.addOperation>,
): SagaIterator {
  try {
    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запускаем отправку на сервер данных из формы */
    const status: SagaReturnType<typeof apiOperation.addOperationFetch> =
      yield call(
        apiOperation.addOperationFetch,
        fieldsAddOPeration.payload,
        tokenApp,
      );

    if (status === 200) {
      /** открытие модального окна, успех */
      yield put(
        modalActions.showModalMessage({
          isOpenSuccess: true,
          title: 'Операции',
          message: 'Операция добавлена',
          rightBtn: null,
        }),
      );
    }
    /** перезапуск - обновление списка после изменений */
    /* запускаем saga получение данных */
    yield call(budgetSagas.getListOfCreatedOperations);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker budget app', error);
  }
}

/**
 * Процесс для 1ой операции, просмотр
 * @returns {void}
 */
export function* operationProcess(): SagaIterator {
  try {
    /** получение id operation */
    const { id }: ReturnType<typeof operationSelectors.operationSelectors> =
      yield select(operationSelectors.operationSelectors);

    /** запрос на сервер c id */
    const operationData: SagaReturnType<typeof apiOperation.operationFetch> =
      yield call(apiOperation.operationFetch, id);

    /** запись данных в стейт для селектора */
    yield put(operationActions.setFields(operationData));

    /** Переходим на страницу просмотра операции */
    yield put(push(config.routes.budgetItem.url));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker operation app', error);
  }
}

/**
 * Процесс удаления категории
 * @returns {void}
 */
export function* deleteOperation(): SagaIterator {
  try {
    /** получение id operation */
    const { id }: ReturnType<typeof operationSelectors.operationSelectors> =
      yield select(operationSelectors.operationSelectors);

    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на удаление */
    const status: SagaReturnType<typeof apiOperation.deleteOperationFetch> =
      yield call(apiOperation.deleteOperationFetch, id, tokenApp);

    /** убираем окно подтверждения */
    yield put(modalActions.confirm(false));

    /** перезапуск - обновление списка после изменений */
    /* запускаем saga получение данных */
    yield call(budgetSagas.getListOfCreatedOperations);

    if (status !== 200) {
      /* открытие модального окна, неудачный запрос */
      yield put(
        modalActions.showModalMessage({
          isOpenSuccess: true,
          message:
            'Запрос на удаление операции не выполнен, повторите удаление позже',
          title: 'Операция',
          rightBtn: null,
        }),
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker deleteOperation', error);
  }
}

// Спросим подтверждение на удаление категории
export function* operationProcessDelete(): SagaIterator {
  const isConfirm = yield call(operationSagas.confirmSaga);

  if (isConfirm) {
    yield call(deleteOperation);
  } else {
    yield put(
      modalActions.showModalMessage({
        isOpenSuccess: false,
      }),
    );
  }
}

/**
 * Вотчер процесса для операциё
 * @returns {void}
 */
export function* operationProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(operationProcessActions.editOperation, editOperation),
    takeEvery(
      operationProcessActions.sendEditFormOpertaion,
      sendEditFormOperation,
    ),
    takeEvery(operationProcessActions.operation, operationProcess),
    takeEvery(operationProcessActions.addOperation, addOperation),
    takeEvery(operationProcessActions.deleteOperation, operationProcessDelete),
  ]);
}

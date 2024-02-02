import { push } from 'connected-react-router';
import { createHashHistory } from 'history';
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

import { api as apiBudgets } from '@features/budgets';
import { actions as modalActions } from '@features/modal';
import {
  selectors as operationSelectors,
  api as apiOperation,
  actions as operationActions,
  sagas as operationSagas,
} from '@features/operation';
import { sagas as sagasToken } from '@features/token';

import { actions as operationProcessActions } from './actions';

export const history = createHashHistory();
/**
 * Процесс редактирования операции
 * @returns {void}
 */
export function* editOperation(
  fieldsEditOPeration: ReturnType<typeof operationProcessActions.editOperation>,
): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run edit operation process');
  try {
    /**
     * --- Редактирования операции
     * 0. открыть окно с формой с признаком - редактирование
     * 1. заполняем форму в мод. окне через пропс formsValues
     * 2. нажимаем Submit
     * 3. срабатывает функция submitOnSuccess => submitEditOperation
     * 4. запускает процесс editOperation
     * --- передать данные об операции в форму
     * 1. получаем токен
     * 7. запускаем отправку на сервер данных с полей
     * 8. получаем ответ с сервера с новой сущностью, параметры теже
     * 9.
     */
    /** получение id operation */
    const { id }: ReturnType<typeof operationSelectors.operationSelectors> =
      yield select(operationSelectors.operationSelectors);

    /** запускаем saga получение данных об операции которую хотим изменить */
    yield call(operationSagas.getDataOperationById, id);

    /** открытие модального окна, редактирования операции */
    yield put(
      modalActions.showModal({
        isOpen: true,
      }),
    );

    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на сервер с измененёнными данными формы */
    const resEditOperation: SagaReturnType<
      typeof apiOperation.editOperationFetch
    > = yield call(
      apiOperation.editOperationFetch,
      fieldsEditOPeration.payload,
      tokenApp,
      id,
    );
    // eslint-disable-next-line no-console
    console.log('edit-operation process resEditOperation', resEditOperation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker budget app', error);
  }
}
/**
 * Процесс добавления операции
 * @returns {void}
 */
export function* addOperation(
  fieldsAddOPeration: ReturnType<typeof operationProcessActions.addOperation>,
): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run addOperation process');
  try {
    /**
     * --- Добавление операции
     * 1. заполняем форму в мод. окне
     * 2. нажимаем Submit
     * 3. срабатывает функция submitAddOperation
     * 4. запускает процесс addOperation
     * 5. пробуем передать ему данные с полей
     * 6. получаем токен
     * 7. запускаем отправку на сервер данных с полей
     * 8. получаем ответ с сервера с новой сущностью, параметры теже
     * 9. запускаем процесс показа обновленной страницы бюджета с новой сущностью
     */

    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запускаем отправку на сервер данных с полей */
    const resNewOperation: SagaReturnType<
      typeof apiOperation.addOperationFetch
    > = yield call(
      apiOperation.addOperationFetch,
      fieldsAddOPeration.payload,
      tokenApp,
    );
    // eslint-disable-next-line no-console
    console.log('add operation process resNewOperation', resNewOperation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker budget app', error);
  }
}

/**
 * Процесс общего бюджета
 * @returns {void}
 */
export function* budgetProcess(): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run budget process');
  try {
    /** запрос на сервер */
    yield call(apiBudgets.operationsFetch);
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
  // eslint-disable-next-line no-console
  console.log('run operation process');
  try {
    /**
     *  Ручной запуск подгруки данных из api
     *  1. подгрузка данных из api operations c параметром pageSize
     * --- Надо реализовать переход на карточку операции и просмотра её по id ---
     * --- При клике на строку
     *  1. Вызывать событие возвращающее id строки
     *  2. Переход на страницу просмотра операции
     *  3. Запуск процесса Операции
     *  4.
     *  3. Делаем запрос api /operations/:id на получение полей с конкретной операции по запросу
     *  4. Селектором переносим их в поля карточки операции
     *

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
 * Вотчер процесса для операциё
 * @returns {void}
 */
export function* operationProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(operationProcessActions.editOperation, editOperation),
    takeEvery(operationProcessActions.operation, operationProcess),
    takeEvery(operationProcessActions.budget, budgetProcess),
    takeEvery(operationProcessActions.addOperation, addOperation),
  ]);
}

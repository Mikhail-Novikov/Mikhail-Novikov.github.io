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

import {
  selectors as categorySelectors,
  api as apiCategory,
  sagas as categorySagas,
} from '@features/categories';
import { actions as modalActions } from '@features/modal';
import { sagas as sagasToken } from '@features/token';

import { actions as categoryProcessActions } from './actions';

export const history = createHashHistory();

/**
 * Процесс добавления категории
 * @returns {void}
 */
export function* addCategory(
  fieldsAddCategory: ReturnType<typeof categoryProcessActions.addCategory>,
): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('run addCategories process', fieldsAddCategory);
  try {
    /**
     * --- Добавление категории
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
    const resNewOperation: SagaReturnType<typeof apiCategory.addCategoryFetch> =
      yield call(
        apiCategory.addCategoryFetch,
        fieldsAddCategory.payload,
        tokenApp,
      );
    // eslint-disable-next-line no-console
    console.log('add operation process resNewOperation', resNewOperation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker add-category', error);
  }
}

/**
 * Процесс редактирования категории
 * @returns {void}
 */
export function* editCategory(): SagaIterator {
  try {
    /** получение id operation */
    const { id }: ReturnType<typeof categorySelectors.categorySelectors> =
      yield select(categorySelectors.categorySelectors);

    /* запускаем saga получение данных об операции которую хотим изменить */
    yield call(categorySagas.getDataCategoryById, id);

    /* открытие модального окна, редактирования операции, заполняется форма данными полученными сагой */
    yield put(
      modalActions.showModal({
        isOpen: true,
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker editCategory', error);
  }
}

/**
 * Процесс отправки отредактированной категории
 * @returns {void}
 */
export function* sendEditFormCategory({
  payload,
}: ReturnType<
  typeof categoryProcessActions.sendEditFormCategory
>): SagaIterator {
  try {
    /* получение id operation */
    const { id }: ReturnType<typeof categorySelectors.categorySelectors> =
      yield select(categorySelectors.categorySelectors);

    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    const response: SagaReturnType<typeof apiCategory.editCategoryFetch> =
      yield call(apiCategory.editCategoryFetch, payload, id, tokenApp);
    // eslint-disable-next-line no-console
    console.log('editCategoryFetch', response);

    if (response.ok) {
      /* открытие модального окна, успех */
      yield put(
        modalActions.showModal({
          isOpen: true,
        }),
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker sendEditFormCategory', error);
  }
}
/**
 * Вотчер процесса категорий
 * @returns {void}
 */
export function* categoryProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(categoryProcessActions.addCategory, addCategory),
    takeEvery(categoryProcessActions.editCategory, editCategory),
    takeEvery(
      categoryProcessActions.sendEditFormCategory,
      sendEditFormCategory,
    ),
  ]);
}

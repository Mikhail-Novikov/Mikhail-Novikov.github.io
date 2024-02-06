import { SagaIterator } from 'redux-saga';
import {
  put,
  all,
  takeEvery,
  call,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

import {
  actions as categoryActions,
  selectors as categorySelectors,
  api as apiCategory,
  sagas as categorySagas,
} from '@features/categories';
import { actions as modalActions } from '@features/modal';
import { sagas as sagasToken } from '@features/token';

import { actions as categoryProcessActions } from './actions';

/**
 * Процесс создания категории
 * @returns {void}
 */
export function* addCategory(
  fieldsAddCategory: ReturnType<typeof categoryProcessActions.addCategory>,
): SagaIterator {
  try {
    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запускаем отправку на сервер данных с полей */
    const status: SagaReturnType<typeof apiCategory.addCategoryFetch> =
      yield call(
        apiCategory.addCategoryFetch,
        fieldsAddCategory.payload,
        tokenApp,
      );

    /** перезапуск - обновление списка категорий после изменений */
    /* запускаем saga получение данных всех категорий */
    const categories: SagaReturnType<typeof categorySagas.getDataCategory> =
      yield call(categorySagas.getDataCategory);

    /** запись данных в стейт для селектора */
    yield put(categoryActions.setCategories(categories));

    if (status === 200) {
      /* открытие модального окна, успех */
      yield put(
        modalActions.showModalMessage({
          isOpenSuccess: true,
          title: 'Категoрии',
          message: 'Добавление категории выполнено успешно',
          rightBtn: null,
        }),
      );
    }
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
        isOpenSuccess: false,
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker editCategory', error);
  }
}

/**
 * Процесс отправки отредактированной категории(см. выше)
 * @returns {void}
 */
export function* sendEditFormCategory({
  payload,
}: ReturnType<
  typeof categoryProcessActions.sendEditFormCategory
>): SagaIterator {
  try {
    /* получение id категории */
    const { id }: ReturnType<typeof categorySelectors.categorySelectors> =
      yield select(categorySelectors.categorySelectors);

    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    const status: SagaReturnType<typeof apiCategory.editCategoryFetch> =
      yield call(apiCategory.editCategoryFetch, payload, id, tokenApp);

    /** перезапуск - обновление списка категорий после изменений */
    /* запускаем saga получение данных всех категорий */
    const categories: SagaReturnType<typeof categorySagas.getDataCategory> =
      yield call(categorySagas.getDataCategory);

    /** запись данных в стейт для селектора */
    yield put(categoryActions.setCategories(categories));

    if (status === 200) {
      /* открытие модального окна, успех */
      yield put(
        modalActions.showModalMessage({
          isOpenSuccess: true,
          title: 'Категория',
          message: 'Категория изменена',
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
 * Процесс удаления категории
 * @returns {void}
 */
export function* deleteCategory(): SagaIterator {
  try {
    /** получение id operation */
    const { id }: ReturnType<typeof categorySelectors.categorySelectors> =
      yield select(categorySelectors.categorySelectors);

    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /* отправка запроса на удаление категории по id */
    const status: SagaReturnType<typeof apiCategory.deleteCategoryFetch> =
      yield call(apiCategory.deleteCategoryFetch, id, tokenApp);
    /** перезапуск - обновление списка категорий после изменений */
    /* запускаем saga получение данных всех категорий */
    const categories: SagaReturnType<typeof categorySagas.getDataCategory> =
      yield call(categorySagas.getDataCategory);

    /** запись данных в стейт для селектора */
    yield put(categoryActions.setCategories(categories));

    if (status !== 200) {
      /* открытие модального окна, успех */
      yield put(
        modalActions.showModalMessage({
          isOpenSuccess: true,
          message:
            'Запрос на удаление категории не выполнен, повторите удаление позже',
          title: 'Категория',
          rightBtn: null,
        }),
      );
    }
    yield put(
      modalActions.showModalMessage({
        isOpenSuccess: false,
      }),
    );
    // yield put(modalActions.confirm(false));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker editCategory', error);
  }
}

// Спросим подтверждение на удаление категории
export function* categoryProcessDelete(): SagaIterator {
  yield put(
    modalActions.showModalMessage({
      isOpenSuccess: true,
      message: 'Вы действительно хотите удалить категорию?',
      title: 'Категория',
      rightBtn: 'Удалить',
    }),
  );

  const { payload: isConfirm } = yield take(modalActions.confirm);

  if (isConfirm) {
    yield call(deleteCategory);
  } else {
    yield put(
      modalActions.showModalMessage({
        isOpenSuccess: false,
        message: 'Вы нажали отмена',
        title: 'Категория',
      }),
    );
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
    takeEvery(categoryProcessActions.deleteCategory, categoryProcessDelete),
  ]);
}

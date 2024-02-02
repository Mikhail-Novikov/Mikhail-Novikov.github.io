import { SagaIterator } from 'redux-saga';
import { SagaReturnType, call, put } from 'redux-saga/effects';

// eslint-disable-next-line import/no-cycle
import {
  api as apiCategory,
  actions as categoryActions,
} from '@features/categories';
import { sagas as sagasToken } from '@features/token';

/**
 * Сага получает данные о конкретной категории из таблицы,
 * для редактирования
 * @returns void - запись в стейт
 */

export function* getDataCategoryById(id: string): SagaIterator<void> {
  try {
    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на сервер c id */
    const categoryData: SagaReturnType<typeof apiCategory.categoryFetch> =
      yield call(apiCategory.categoryFetch, id, tokenApp);

    /** запись данных в стейт для селектора */
    yield put(categoryActions.setFields(categoryData));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error getDatacategoryById', error);
  }
}

export const sagas = {
  getDataCategoryById,
};

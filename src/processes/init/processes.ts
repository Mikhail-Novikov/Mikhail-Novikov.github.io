import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { put, all, takeEvery, call, SagaReturnType } from 'redux-saga/effects';

import { config } from '@common/config';

import { sagas as categorySagas } from '@features/categories';
import { actions as initActions } from '@features/init-app';
import { actions as registrationActions } from '@features/registration';
import { sagas as sagasToken } from '@features/token';

import { actions as initProcessActions } from './actions';

/**
 * Процесс инициализации приложения - воркер
 * @returns {void}
 */
export function* initProcess(): SagaIterator {
  // eslint-disable-next-line no-console
  console.log('Инициализация приложения');
  try {
    /** запуск приложения */
    yield put(initActions.switchIsInitApp());

    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** Примитивная проверка токена */
    if (tokenApp.length > 25) {
      /** создаем стейт с признаком isAuthorization: true, через хук проверки токена формируем переменную для всх компонентов */
      yield put(registrationActions.registrationSuccess());

      /** заносим в селектор созданные категории для списка в форме создания операции */
      yield call(categorySagas.getListOfCreatedCategories);

      yield put(push(config.routes.budgetList.url));
    } else {
      yield put(push(config.routes.authorization.url));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker init app', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]); // eslint-disable-next-line no-console
}

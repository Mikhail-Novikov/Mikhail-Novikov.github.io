import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import {
  SagaReturnType,
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { config } from '@common/config';
import { ErrorCode } from '@common/types/errorCodes';

import { actions as modalActions } from '@features/modal';
import {
  actions as registrationActions,
  sagas as registrationSaga,
  selectors as registrationSelectors,
} from '@features/registration';

import { actions as registrationProcessAction } from './actions';
/**
 * Процесс регистрации приложения - воркер
 * @returns {void}
 */
export function* registrationProcess(): SagaIterator {
  try {
    /** получение данных с формы */
    const email: ReturnType<typeof registrationSelectors.selectorEmail> =
      yield select(registrationSelectors.selectorEmail);
    const password: ReturnType<typeof registrationSelectors.selectorPassword> =
      yield select(registrationSelectors.selectorPassword);

    /** отправка формы на сервер и получение ответа */
    const responseReg: SagaReturnType<
      typeof registrationSaga.registrationNewUserSaga
    > = yield call(registrationSaga.registrationNewUserSaga, {
      email,
      password,
    });

    /*  если нет ошибок в ответе */
    if (!responseReg.errors?.length) {
      /** запуск записи из формы в стейт setState */
      yield put(registrationActions.setState(responseReg));

      /** читаем токен из state после запроса */
      const token: ReturnType<typeof registrationSelectors.selectorsSetState> =
        yield select(registrationSelectors.selectorsSetState);

      /** запись token в locastorage */
      localStorage.setItem('token-app', token);

      /** Разрешаем авторизацию isAuthorization: true */
      yield put(registrationActions.registrationSuccess());

      /** Переходим на основную страницу */
      yield put(push(config.routes.budgetList.url));
    }

    /*  ошибка в ответе */
    if (responseReg.errors?.length) {
      const nameError = responseReg.errors[0].extensions.code;

      // eslint-disable-next-line max-depth
      if (ErrorCode.ERR_ACCOUNT_ALREADY_EXIST === nameError) {
        yield put(
          modalActions.showModalMessage({
            isOpenSuccess: true,
            message: 'Пользователь с таким email уже существует',
            title: 'Категория',
            rightBtn: null,
          }),
        );
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error registration process', error);
  }
}

/**
 * Вотчер процесса регистрации приложения
 * @returns {void}
 */
export function* registrationProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(registrationProcessAction.registration, registrationProcess),
  ]);
}

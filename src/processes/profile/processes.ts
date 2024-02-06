import { SagaIterator } from 'redux-saga';
import {
  SagaReturnType,
  all,
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';

import { ErrorCode } from '@common/types/errorCodes';

import { actions as modalActions } from '@features/modal';
import { api, actions as profileActions } from '@features/profile';
import { sagas as sagasToken } from '@features/token';

import { actions as profileProcessAction } from './actions';
/**
 * Процесс для авторизованного пользователя
 * @returns {void}
 */
export function* profileProcess(): SagaIterator {
  try {
    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на сервер и получение id, email, signupDate */
    const profileData: SagaReturnType<typeof api.profileFetch> = yield call(
      api.profileFetch,
      tokenApp,
    );

    /** пишем в setState полученные данные чтоб потом извлечь из селектора в компоненте */
    yield put(profileActions.setState(profileData));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error profile process', error);
  }
}

/**
 * Процесс для авторизованного пользователя, смена пароля /profile/change-password POST PROTECTED
 * @returns {void}
 */
export function* profileEditProcess({
  payload,
}: ReturnType<typeof profileProcessAction.profileEdit>): SagaIterator {
  try {
    /** читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /** запрос на сервер и получение положительного ответа о смене пароля */
    const {
      errors,
      success,
    }: SagaReturnType<typeof api.profileChangePasswordFetch> = yield call(
      api.profileChangePasswordFetch,
      payload,
      tokenApp,
    );

    if (errors?.length) {
      const nameError = errors[0].extensions.code;

      // eslint-disable-next-line max-depth
      if (ErrorCode.ERR_INCORRECT_PASSWORD === nameError) {
        yield put(
          modalActions.showModalMessage({
            isOpenSuccess: true,
            message: 'Неверно набран старый пароль',
            title: 'Пароль',
            rightBtn: null,
          }),
        );
      }
    }
    /** пишем в setState признак успешного действия */
    yield put(profileActions.changePasswordResult(success));
    yield delay(10000);
    yield put(profileActions.changePasswordResult(false));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error profile process', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* profileProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(profileProcessAction.profile, profileProcess),
    takeEvery(profileProcessAction.profileEdit, profileEditProcess),
  ]);
}

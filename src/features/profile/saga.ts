import { SagaIterator } from 'redux-saga';
import { call, SagaReturnType } from 'redux-saga/effects';

import { api } from './api';

/**
 * Сага регистрации нового пользователя
 * @returns  профиль и token
 */
export function* registrationNewUserSaga(): SagaIterator<any> {
  /** Отправляем запрос на авторизацию */
  const profileData: SagaReturnType<typeof api.auth> = yield call(api.auth);

  return profileData;
}

export const sagas = {
  registrationNewUserSaga,
};

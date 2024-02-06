import { SagaIterator } from 'redux-saga';
import { call, SagaReturnType } from 'redux-saga/effects';

import { api } from './api';
import { SignUpBody } from './types';

/**
 * Сага регистрации нового пользователя
 * @returns  профиль и token
 */
export function* registrationNewUserSaga({
  email,
  password,
}: SignUpBody): SagaIterator<any> {
  /** Отправляем запрос на авторизацию */
  const profileData: SagaReturnType<typeof api.auth> = yield call(api.auth, {
    email,
    password,
  });

  return profileData;
}

export const sagas = {
  registrationNewUserSaga,
};

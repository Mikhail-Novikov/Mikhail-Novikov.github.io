import { CallEffect, call } from 'redux-saga/effects';

/**
 * Сага читатет токен из хранилища
 * @returns token код системы в которой авторизуемся либо 'not-auth'
 */
export function* getTokenValueFromStorage(): Generator<
  CallEffect<string>,
  string,
  never
> {
  const getTokenApp = (): string => localStorage.getItem('token-app');
  const tokenApp = yield call(getTokenApp);

  return tokenApp ?? 'not-auth';
}

export const sagas = {
  getTokenValueFromStorage,
};

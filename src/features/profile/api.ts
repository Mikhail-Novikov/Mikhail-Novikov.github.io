import { config } from '@common/config';

import { AuthResult, ProfileState, SignInBody } from './types';

/**
 * Запрос на получение данных профиля
 * @param токен
 * @returns {Profile} - данные профиля
 */
const profileFetch = (token: string): Promise<ProfileState> =>
  fetch(config.api.profileUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api profileUser', errors);
    });

/**
 * Запрос на авторизацию
 * @param token - ?
 * @returns - token
 */
const urlencoded = new URLSearchParams();

const signinFetch = ({ email, password }: SignInBody): Promise<AuthResult> => {
  urlencoded.append('email', `${email}`);
  urlencoded.append('password', `${password}`);

  return fetch(config.api.signinUser, {
    method: 'post',
    body: urlencoded,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api signin', errors);
    });
};

export const api = {
  profileFetch,
  signinFetch,
};

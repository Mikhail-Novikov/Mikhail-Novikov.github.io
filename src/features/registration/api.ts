import { config } from '@common/config';

import { AuthResult, SignUpBody } from './types';
/**
 * Запрос на регистрацию нового пользователя
 * @param {SignUpBody}
 * @returns - ответ
 */

const auth = ({ email, password }: SignUpBody): Promise<AuthResult> => {
  const urlencoded = new URLSearchParams();

  urlencoded.append('email', `${email}`);
  urlencoded.append('password', `${password}`);
  urlencoded.append('commandId', Math.random().toString(36).slice(2));
  // urlencoded.append('commandId', '65a9686860c8b274331b4653');

  return fetch(config.api.signupUser, {
    method: 'post',
    body: urlencoded,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api signup', errors);
    });
};

export const api = {
  auth,
};

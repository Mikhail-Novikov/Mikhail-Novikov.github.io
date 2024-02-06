import { TFormValues } from '@common/components/form/profile-form/types';
import { config } from '@common/config';

import { ProfileState } from './types';

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
 * Запрос на смену пароля
 * @param token
 * @param password
 * @param newPassword
 * @returns - status
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const profileChangePasswordFetch = (
  { password, newPassword }: Partial<TFormValues>,
  token: string,
) => {
  const body = JSON.stringify({
    password,
    newPassword,
  });

  const res = fetch(config.api.profileChangePassword, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => ({
      errors: res.errors,
      success: res.success,
    }));
  return res;
};

export const api = {
  profileFetch,
  profileChangePasswordFetch,
};

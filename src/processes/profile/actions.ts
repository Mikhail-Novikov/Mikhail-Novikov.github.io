import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';

/** Экшн для запуска процесса просмиотра профиля, токен в системе */
const profile = createAction('profile');

/** Экшн для запуска процесса авторизации ранее зарег. поользователя, вход по паролю */
const profileAuth = createAction('profileAuth');

export const actions = {
  profile,
  profileAuth,
};

export const useProfileProcessActions = (): typeof actions =>
  useActions(actions);

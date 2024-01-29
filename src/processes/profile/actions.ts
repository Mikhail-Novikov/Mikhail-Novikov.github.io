import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';

/** Экшн для запуска процесса регистрации пользователя через форму */
const profile = createAction('profile');

export const actions = {
  profile,
};

export const useProfileProcessActions = (): typeof actions =>
  useActions(actions);

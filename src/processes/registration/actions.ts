import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';

/** Экшн для запуска процесса регистрации пользователя через форму */
const registration = createAction('registration');

export const actions = {
  registration,
};

export const useRegistrationProcessActions = (): typeof actions =>
  useActions(actions);

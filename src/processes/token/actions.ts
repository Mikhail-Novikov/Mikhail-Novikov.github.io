import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';

/** Экшн для запуска процесса создания токена */
const token = createAction('token');

export const actions = {
  token,
};

export const useTokenProcessActions = (): typeof actions => useActions(actions);

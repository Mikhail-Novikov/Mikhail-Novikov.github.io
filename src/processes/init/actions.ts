import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';

/** Экшн для запуска процесса инициализации приложения */
const initApp = createAction('initApp');

export const actions = {
  initApp,
};

export const useInitAppProcessActions = (): typeof actions =>
  useActions(actions);

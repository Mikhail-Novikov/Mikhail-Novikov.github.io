import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';
import { TFieldsAddOPeration } from '@common/types';

/** Экшн для запуска процесса работы с операциями */
const operation = createAction('operaton');

/** Экшн для запуска процесса работы с бюджетом пользователя */
const budget = createAction('budget');

/** Экшн для запуска процесса добавления операции */
const addOperation = createAction<TFieldsAddOPeration, string>('addOperation');

/** Экшн для запуска процесса редактирования операции */
const editOperation = createAction<string>('editOperation');

export const actions = {
  operation,
  addOperation,
  editOperation,
  budget,
};

export const useOperationProcessActions = (): typeof actions =>
  useActions(actions);

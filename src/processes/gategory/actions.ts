import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';

/** Экшн для запуска процесса работы с категориями */
const category = createAction('category');

/** Экшн для запуска процесса добавления категории */
const addCategory = createAction<string>('addCategory');

/** Экшн для запуска процесса редактирования категории */
const editCategory = createAction<string>('editCategory');

/** Экшн для запуска процесса отправки отредактировнной категории */
const sendEditFormCategory = createAction<string>('sendEditFormCategory');

export const actions = {
  category,
  addCategory,
  editCategory,
  sendEditFormCategory,
};

export const useCategoryProcessActions = (): typeof actions =>
  useActions(actions);

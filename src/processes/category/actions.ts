import { createAction } from '@reduxjs/toolkit';

import { useActions } from '@common/hooks';
import { Category } from '@common/types';

import { CategoryState } from '@features/categories/types';

/** Экшн для запуска процесса работы с категориями */
const category = createAction('category');

/** Экшн для запуска процесса добавления категории */
const addCategory = createAction<Category>('addCategory');

/** Экшн для запуска процесса редактирования категории */
const editCategory = createAction<string>('editCategory');

/** Экшн для запуска процесса удаления категории */
const deleteCategory = createAction<string>('deleteCategory');

/** Экшн для запуска процесса отправки отредактировнной категории */
const sendEditFormCategory = createAction<CategoryState>(
  'sendEditFormCategory',
);

export const actions = {
  category,
  addCategory,
  editCategory,
  deleteCategory,
  sendEditFormCategory,
};

export const useCategoryProcessActions = (): typeof actions =>
  useActions(actions);

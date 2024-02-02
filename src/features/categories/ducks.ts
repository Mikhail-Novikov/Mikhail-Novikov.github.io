import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
import { useActions } from '@common/hooks';

import { CategoryState } from './types';

export const initialState = {
  id: '',
  name: '',
  photo: '',
  createdAt: '',
  updatedAt: '',
} as unknown as CategoryState;

const categorySlice = createSlice({
  name: nameFeatures.category,
  initialState,
  reducers: {
    /**
     * Запись id с клика по ряду
     * @param payload - id
     * @returns id
     */
    setId: (
      state: CategoryState,
      { payload }: PayloadAction<string>,
    ): CategoryState => ({
      ...state,
      id: payload,
    }),
    /**
     * Запись данных операции с сервера
     * @param payload - ответ сервера
     * @returns token
     */
    setFields: (
      state: CategoryState,
      { payload }: PayloadAction<CategoryState>,
    ): CategoryState => ({
      ...state,
      ...payload,
    }),
  },
});
export const categoryReducer = categorySlice.reducer;

export const actions = {
  ...categorySlice.actions,
};

export const useCategory = (): typeof actions => useActions(actions);

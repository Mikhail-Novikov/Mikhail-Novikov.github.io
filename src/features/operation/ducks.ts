import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
// eslint-disable-next-line import/no-cycle
import { useActions } from '@common/hooks';

import { OperationState } from './types';

export const initialState = {
  id: '',
  name: '',
  desc: '',
  amount: 0,
  date: '',
  type: undefined,
} as OperationState;

const operationSlice = createSlice({
  name: nameFeatures.operation,
  initialState,
  reducers: {
    /**
     * Запись id с клика по ряду
     * @param payload - id
     * @returns id
     */
    setId: (
      state: OperationState,
      { payload }: PayloadAction<string>,
    ): OperationState => ({
      ...state,
      id: payload,
    }),
    /**
     * Запись данных операции с сервера
     * @param payload - ответ сервера
     * @returns token
     */
    setFields: (
      state: OperationState,
      { payload }: PayloadAction<OperationState>,
    ): OperationState => ({
      ...state,
      ...payload,
    }),
  },
});
export const operationReducer = operationSlice.reducer;

export const actions = {
  ...operationSlice.actions,
};

export const useOperation = (): typeof actions => useActions(actions);

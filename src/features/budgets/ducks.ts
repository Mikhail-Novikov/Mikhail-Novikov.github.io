import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
// eslint-disable-next-line import/no-cycle
import { useActions } from '@common/hooks';

import { BudgetState } from './types';

export const initialState = {
  id: '',
  name: '',
  desc: '',
  amount: 0,
  date: '',
  type: undefined,
} as unknown as BudgetState;

const budgetSlice = createSlice({
  name: nameFeatures.budget,
  initialState,
  reducers: {
    /**
     * Получение сумм по операциям
     * @param payload - ответ сервера
     * @returns token
     */
    getAmountOperations: (
      state: BudgetState,
      { payload }: PayloadAction<any>,
    ): BudgetState => ({
      ...state,
      ...payload,
    }),
  },
});
export const budgetReducer = budgetSlice.reducer;

export const actions = {
  ...budgetSlice.actions,
};

export const useBudget = (): typeof actions => useActions(actions);

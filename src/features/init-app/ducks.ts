import { createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
import { useActions } from '@common/hooks';

import { InitAppState } from './types';

export const initialState = {
  initApp: false,
} as InitAppState;

const initAppSlice = createSlice({
  name: nameFeatures.initApp,
  initialState,
  reducers: {
    /**
     * Установка значения isInitApp
     * @param state - Текущее состояние app
     * @returns - булево значение состояние
     */
    switchIsInitApp: (state) => ({
      ...state,
      [nameFeatures.initApp]: true,
    }),
  },
});

export const initAppReducer = initAppSlice.reducer;

export const actions = {
  ...initAppSlice.actions,
};

export const useInitialApp = (): typeof actions => useActions(actions);

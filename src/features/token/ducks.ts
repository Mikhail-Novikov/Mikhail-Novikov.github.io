import { createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
import { useActions } from '@common/hooks';

import { TokenState } from './types';

export const initialState = {
  /** сгенерированный токен */
  genToken: '',
  /** текущий токен */
  valueTokenApp: '',
} as TokenState;

const tokenSlice = createSlice({
  name: nameFeatures.token,
  initialState,
  reducers: {
    /**
     * Генерации значения token
     * @param state - Текущее состояние
     * @returns {TokenState} - random token
     */
    generationToken: (state): TokenState => ({
      ...state,
      genToken: Math.random().toString(16),
    }),
    /**
     * Запись token в приложение
     * @param state - Текущее состояние
     * @param valueTokenApp - полученный токен
     * @returns {TokenState} - token
     */
    recTokenApp: (state): TokenState => ({
      ...state,
      valueTokenApp: state.genToken,
    }),
  },
});
export const tokenReducer = tokenSlice.reducer;

export const actions = {
  ...tokenSlice.actions,
};

export const useToken = (): typeof actions => useActions(actions);

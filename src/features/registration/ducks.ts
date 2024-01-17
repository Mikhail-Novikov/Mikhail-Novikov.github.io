import { createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
// eslint-disable-next-line import/no-cycle
import { useActions } from '@common/hooks';

import { RegistrationState } from './types';

export const initialState = {
  /** Призеак регистрации */
  isAuthorization: false,
} as RegistrationState;

const registrationSlice = createSlice({
  name: nameFeatures.token,
  initialState,
  reducers: {
    /**
     * Генерации значения token
     * @param state - Текущее состояние
     * @returns {TokenState} - random token
     */
    registration: (state): RegistrationState => ({
      ...state,
      isAuthorization: true,
    }),
  },
});
export const registrationReducer = registrationSlice.reducer;

export const actions = {
  ...registrationSlice.actions,
};

export const useRegistration = (): typeof actions => useActions(actions);

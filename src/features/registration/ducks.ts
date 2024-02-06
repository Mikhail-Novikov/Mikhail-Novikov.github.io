import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
// eslint-disable-next-line import/no-cycle
import { useActions } from '@common/hooks';

import { RegistrationState, SignUpBody } from './types';

export const initialState = {
  /** Признак регистрации */
  isAuthorization: false,
  /** Значение токена */
  token: 'not-auth',
  email: '',
  password: '',
} as RegistrationState;

const registrationSlice = createSlice({
  name: nameFeatures.registration,
  initialState,
  reducers: {
    /**
     * Генерации значения token
     * @param state - Текущее состояние
     * @returns {TokenState} - random token
     */
    registrationSuccess: (state): RegistrationState => ({
      ...state,
      isAuthorization: true,
    }),
    /**
     * Запись стейта регистрации нового пользователя
     * @param payload - ответ сервера
     * @returns token
     */
    setState: (
      state: RegistrationState,
      { payload }: PayloadAction<RegistrationState>,
    ): RegistrationState => ({
      ...state,
      token: payload.token,
    }),
    /**
     * Получет данные с полей формы
     * @param payload - данные с формы
     * @returns email password
     */
    getFieldsForm: (
      state: Omit<RegistrationState, 'email' | 'password' | 'commandId'>,
      { payload }: PayloadAction<SignUpBody>,
    ): RegistrationState => ({
      ...state,
      ...payload,
    }),
  },
});
export const registrationReducer = registrationSlice.reducer;

export const actions = {
  ...registrationSlice.actions,
};

export const useRegistration = (): typeof actions => useActions(actions);

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
// eslint-disable-next-line import/no-cycle
import { useActions } from '@common/hooks';

import { ProfileState, SignInBody } from './types';

export const initialState = {
  /** id пользователя */
  id: null,
  /** имя пользователя */
  name: '',
  /** емайл при регистрации */
  email: '',
  /** дата регистрации пользователя */
  signUpDate: '',
} as unknown as ProfileState;

const profileSlice = createSlice({
  name: nameFeatures.token,
  initialState,
  reducers: {
    getFieldsForm: (
      state: Omit<ProfileState, 'email' | 'password'>,
      { payload }: PayloadAction<SignInBody>,
    ): ProfileState => ({
      ...state,
      ...payload,
    }),
    /**
     * Запись стейта профиля при инициализации
     * @param payload - ответ сервера
     * @returns token
     */
    setState: (
      state: Omit<ProfileState, 'email' | 'signUpDate'>,
      { payload }: PayloadAction<ProfileState>,
    ): ProfileState => ({
      ...state,
      ...{
        signUpDate: payload.signUpDate,
        email: payload.email,
      },
    }),
  },
});
export const profileReducer = profileSlice.reducer;

export const actions = {
  ...profileSlice.actions,
};

export const useProfile = (): typeof actions => useActions(actions);

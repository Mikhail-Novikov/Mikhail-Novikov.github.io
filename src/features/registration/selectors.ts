import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { RegistrationState } from './types';

/** Селектор состояния features регистрации */
const featureState = (state: RootState): RegistrationState =>
  state[nameFeatures.registration];

/** Селектор списка уже созданных блоков проsграммы */
const selectorsSetState = createSelector(featureState, (state) => state.token);

/** Селекторы полей формы */
const selectorEmail = createSelector(featureState, (state) => state.email);
const selectorPassword = createSelector(
  featureState,
  (state) => state.password,
);

const useRegistrationSelector = (): RegistrationState =>
  useSelector(featureState);

export const selectors = {
  useRegistrationSelector,
  selectorsSetState,
  selectorEmail,
  selectorPassword,
};

import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { RegistrationState } from './types';

const registrationSelector = (state: RootState): RegistrationState =>
  state[nameFeatures.registration];

const useRegistrationSelector = (): RegistrationState =>
  useSelector(registrationSelector);

export const selectors = {
  useRegistrationSelector,
};

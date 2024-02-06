import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { ProfileState } from './types';

const featureState = (state: RootState): ProfileState =>
  state[nameFeatures.profile];

const profileSelectors = createSelector(featureState, (state) => state);

const useProfileSelector = (): ProfileState => useSelector(featureState);

export const selectors = {
  useProfileSelector,
  profileSelectors,
};

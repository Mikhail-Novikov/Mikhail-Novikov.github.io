import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { CategoryState } from './types';

const featureState = (state: RootState): CategoryState =>
  state[nameFeatures.category];

const categorySelectors = createSelector(featureState, (state) => state);

const useCategorySelector = (): CategoryState => useSelector(featureState);

export const selectors = {
  useCategorySelector,
  categorySelectors,
};

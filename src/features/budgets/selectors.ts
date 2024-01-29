import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { BudgetState } from './types';

const featureState = (state: RootState): BudgetState =>
  state[nameFeatures.budget];

const budgetSelectors = createSelector(featureState, (state) => state);

const useBudgetSelector = (): BudgetState => useSelector(featureState);

export const selectors = {
  useBudgetSelector,
  budgetSelectors,
};

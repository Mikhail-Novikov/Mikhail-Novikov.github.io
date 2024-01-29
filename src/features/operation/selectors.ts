import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { OperationState } from './types';

const featureState = (state: RootState): OperationState =>
  state[nameFeatures.operation];

const operationSelectors = createSelector(featureState, (state) => state);

const useOperationSelector = (): OperationState => useSelector(featureState);

export const selectors = {
  useOperationSelector,
  operationSelectors,
};

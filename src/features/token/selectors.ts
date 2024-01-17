import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { TokenState } from './types';

const tokenSelector = (state: RootState): TokenState =>
  state[nameFeatures.token];

const genTokenSelector = createSelector(
  tokenSelector,
  (state: TokenState) => state.genToken,
);

const useTokenSelector = (): TokenState => useSelector(tokenSelector);

export const selectors = {
  useTokenSelector,
  genTokenSelector,
};

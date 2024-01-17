import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { InitAppState } from './types';

const initAppSelector = (state: RootState) => state[nameFeatures.initApp];

/**
 * Признак инитиализации
 * @returns {boolean} признак
 */

const useInitialAppSelector = (): InitAppState => useSelector(initAppSelector);

export const selectors = {
  useInitialAppSelector,
};

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

import { nameFeatures } from '@common/constants';

import { ModalState } from './types';

const featureState = (state: RootState) => state[nameFeatures.modal];

const modalSelectors = createSelector(featureState, (state) => state);

const useModalSelector = (): ModalState => useSelector(featureState);

export const selectors = {
  useModalSelector,
  modalSelectors,
};

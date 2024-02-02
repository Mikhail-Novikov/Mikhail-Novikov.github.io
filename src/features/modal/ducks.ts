import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
import { useActions } from '@common/hooks';

import { ModalState } from './types';

export const initialState = {
  isOpen: false,
} as ModalState;

const modalSlice = createSlice({
  name: nameFeatures.modal,
  initialState,
  reducers: {
    /**
     * Экшен открытия модального окна
     * @param payload - Параметры открываемого модального окна
     * @returns {ModalState} Новый стейт признак открытого окна
     */
    showModal: (
      state: ModalState,
      { payload: { isOpen } }: PayloadAction<ModalState>,
    ): ModalState => ({
      ...state,
      isOpen,
    }),
  },
});

export const modalReducer = modalSlice.reducer;

export const actions = {
  ...modalSlice.actions,
};

export const useModal = (): typeof actions => useActions(actions);

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { nameFeatures } from '@common/constants';
import { useActions } from '@common/hooks';

import { ModalState } from './types';

export const initialState = {
  isOpen: false,
  isOpenSuccess: false,
  isConfirm: false,
  message: '',
  title: '',
  rightBtn: '',
} as unknown as ModalState;

const modalSlice = createSlice({
  name: nameFeatures.modal,
  initialState,
  reducers: {
    /**
     * Экшен открытия модального окна для форм
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
    /**
     * Экшен открытия модального окна для сообщений
     * @param payload - Параметры открываемого модального окна
     * @returns {ModalState} Новый стейт с параметрами для окна
     */
    showModalMessage: (
      state: Pick<ModalState, 'isOpen'>,
      {
        payload: { isOpenSuccess, message = '', title = '', rightBtn },
      }: PayloadAction<Omit<ModalState, 'isOpen'>>,
    ): ModalState => ({
      ...state,
      isOpenSuccess,
      message,
      title,
      rightBtn,
    }),
    /**
     * Экшен клика по кнопке подтверждения
     * @param payload
     * @returns {boolean}
     */
    confirm: (
      state: ModalState,
      { payload: isConfirm }: PayloadAction<boolean>,
    ): ModalState => ({
      ...state,
      isConfirm,
    }),
  },
});

export const modalReducer = modalSlice.reducer;

export const actions = {
  ...modalSlice.actions,
};

export const useModalActions = (): typeof actions => useActions(actions);

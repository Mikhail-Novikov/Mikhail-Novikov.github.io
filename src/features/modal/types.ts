import { TRightButtonModal } from '@common/types';

export type ModalState = {
  isOpen: boolean;
  isOpenSuccess: boolean;
  isConfirm?: boolean;
  message?: string;
  title?: string;
  rightBtn?: TRightButtonModal;
};

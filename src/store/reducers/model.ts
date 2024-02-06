import { ReactElement } from 'react';

import { TRightButtonModal } from '@common/types';

export type StateType = {
  titleModal: string;
  rightBtn?: TRightButtonModal;
  action?: Action;
  isOpen?: boolean;
  isEdit?: boolean;
  form?: ReactElement<string>;
};

export type Action = {
  payload: ReactElement<string>;
  type: string;
  titleModal: string;
  rightBtn?: string;
};

export type ReducerType = {
  action?: Action;
  isOpen?: boolean;
  isEdit?: boolean;
  form?: ReactElement<string>;
  titleModal?: string;
  rightBtn?: string;
};

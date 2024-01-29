import { ReactElement } from 'react';

export type StateType = {
  titleModal: string;
  action?: Action;
  isOpen?: boolean;
  isEdit?: boolean;
  form?: ReactElement<string>;
};

export type Action = {
  payload: ReactElement<string>;
  type: string;
  titleModal: string;
};

export type ReducerType = {
  action?: Action;
  isOpen?: boolean;
  isEdit?: boolean;
  form?: ReactElement<string>;
  titleModal?: string;
};

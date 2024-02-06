import { Action, ReducerType, StateType } from './model';

export const addOperationReducer = (
  state: StateType,
  action: Action,
): ReducerType => {
  switch (action.type) {
    case 'openModalAdd': {
      return {
        ...state,
        isOpen: true,
        isEdit: false,
        form: action.payload,
        titleModal: action.titleModal,
        rightBtn: action.rightBtn,
      };
    }
    case 'closeModal': {
      return {
        ...state,
        isOpen: false,
        isEdit: false,
        form: null,
        titleModal: '',
        rightBtn: '',
      };
    }
    case 'editModalOperation': {
      return {
        ...state,
        isEdit: true,
        isOpen: true,
        form: action.payload,
        titleModal: action.titleModal,
        rightBtn: action.rightBtn,
      };
    }
    default:
      return state;
  }
};

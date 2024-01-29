import { Action, ReducerType, StateType } from './model';

export const addOperationReducer = (
  state: StateType,
  action: Action,
): ReducerType => {
  switch (action.type) {
    case 'openModalAddOperation': {
      return {
        ...state,
        isOpen: true,
        isEdit: false,
        form: action.payload,
        titleModal: action.titleModal,
      };
    }
    case 'closeModalAddOpertation': {
      return {
        ...state,
        isOpen: false,
        isEdit: false,
        form: null,
        titleModal: '',
      };
    }
    case 'editModalOperation': {
      return {
        ...state,
        isEdit: true,
        isOpen: true,
        form: action.payload,
        titleModal: action.titleModal,
      };
    }
    default:
      return state;
  }
};

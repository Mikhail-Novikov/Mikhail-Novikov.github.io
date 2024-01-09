import { Action, ReducerType, StateType } from './model';

export const addOperationReducer = (
  state: StateType,
  action: Action,
): ReducerType => {
  switch (action.type) {
    case 'openModalAddOpertation': {
      return {
        ...state,
        isOpen: true,
        form: action.payload,
        titleModal: action.titleModal,
      };
    }
    case 'closeModalAddOpertation': {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return state;
  }
};

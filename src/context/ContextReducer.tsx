import React, { Dispatch } from 'react';

import { StateType, Action } from '../store/reducers/model';

interface IContextProps {
  state: StateType;
  dispatch: Dispatch<Action>;
}

const ContextReducer = React.createContext(null);

export const useContextReducer = (): IContextProps =>
  React.useContext(ContextReducer);

export default ContextReducer;

import { configureStore as confStore, EnhancedStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { history } from '@store/root-reducer';

import { rootSaga } from './root-saga';

const configureStore = (): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();

  const store = confStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, routerMiddleware(history)],
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;

export type RootState = ReturnType<typeof rootReducer>;

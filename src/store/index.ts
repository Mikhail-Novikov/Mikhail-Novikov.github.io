import { configureStore as confStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import { rootSaga } from './root-saga';

const configureStore = (): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();

  const store = confStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;

export type RootState = ReturnType<typeof rootReducer>;

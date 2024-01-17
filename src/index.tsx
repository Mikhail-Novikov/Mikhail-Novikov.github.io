import { actions as initProcessActions } from '@processes/init';
import configureStore from '@store';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { AppRoutes } from '@src/routes';

import i18n from '@common/i18n/i18';

import '@styles/main.css';
import '@styles/helpers.css';

/** store приложения */
const store = configureStore();

/** инициализация */
store.dispatch(initProcessActions.initApp());

export const render = (): void => {
  ReactDOM.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppRoutes />
      </I18nextProvider>
    </Provider>,
    document.getElementById('app'),
  );
};

window.addEventListener('load', render);

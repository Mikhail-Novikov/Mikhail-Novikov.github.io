import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/order
import i18n from '@common/i18n/i18';
import '@styles/main.css';
import '@styles/helpers.css';

import { I18nextProvider } from 'react-i18next';

import { AppRoutes } from '@src/routes';

export const render = (): void => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <AppRoutes />
    </I18nextProvider>,
    document.getElementById('app'),
  );
};

window.addEventListener('load', render);

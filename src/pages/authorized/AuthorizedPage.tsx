import React from 'react';

import { Layout } from '@layouts/index';

import { RegistrationForm } from '@common/components/form';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

/**
 * Страница списка Расходов
 * @returns - Компонент
 */
export const AuthorizedPage = (): React.ReactElement => (
  <Layout isAuthorized>
    <h1 className="table-title margin-top-8 margin-bottom-16">Авторизация</h1>
    <div className="width-75">
      <RegistrationForm />
    </div>
  </Layout>
);

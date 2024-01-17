import { createHashHistory } from 'history';
import React, { useEffect } from 'react';

import { Layout } from '@layouts/index';
import { useRegistrationProcessActions } from '@src/processes/registration';

import { AuthorizationForm } from '@common/components/form';

import { selectors as registrationSelector } from '@features/registration';
import { selectors as tokenSelector } from '@features/token';

/**
 * Страница списка Расходов
 * @returns - Компонент
 */
export const AuthorizationPage = (): React.ReactElement => {
  const { registration } = useRegistrationProcessActions();
  const history = createHashHistory();

  const { isAuthorization } = registrationSelector.useRegistrationSelector();
  const { genToken } = tokenSelector.useTokenSelector();

  // eslint-disable-next-line no-console
  console.log('isAuthorization', isAuthorization);

  const submitForm = () => {
    registration();
  };

  useEffect(() => {
    if (!isAuthorization) {
      localStorage.setItem('token-app', genToken);
    }
  }, [genToken]);

  useEffect(() => {
    if (isAuthorization) {
      history.push('./');
    }
  }, [isAuthorization]);

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">Авторизация</h1>
      <div className="width-75">
        <AuthorizationForm submitOnSuccess={submitForm} />
      </div>
    </Layout>
  );
};

import React from 'react';

import { Layout } from '@layouts/index';
import { useRegistrationProcessActions } from '@src/processes/registration';

import { RegistrationForm } from '@common/components/form';
import { TFormValues } from '@common/components/form/registration-form/types';

import { useRegistration } from '@features/registration/ducks';

/**
 * Страница регистрации нового пользователя
 * @returns - Компонент
 */
export const RegistrationPage = (): React.ReactElement => {
  const { registration } = useRegistrationProcessActions();
  const { getFieldsForm } = useRegistration();

  const submitForm = (values: TFormValues) => {
    /** запустить редюсер c параметрами, далее процесс регистрации */
    getFieldsForm(values);
    registration();
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">Регистрация</h1>
      <div className="width-75">
        <RegistrationForm submitOnSuccess={submitForm} />
      </div>
    </Layout>
  );
};

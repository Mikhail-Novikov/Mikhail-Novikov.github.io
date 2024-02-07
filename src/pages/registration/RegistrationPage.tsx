import React from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '@layouts/index';
import { useRegistrationProcessActions } from '@src/processes/registration';

import { RegistrationForm } from '@common/components/form';
import { TFormValues } from '@common/components/form/registration-form/types';

import { StatusMessageModal } from '@features/modal';
import { useRegistration } from '@features/registration/ducks';

/**
 * Страница регистрации нового пользователя
 * @returns - Компонент
 */
export const RegistrationPage = (): React.ReactElement => {
  const { registration } = useRegistrationProcessActions();
  const { getFieldsForm } = useRegistration();

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  const submitForm = (values: TFormValues) => {
    /** запись данных с формы в стейт для селектора */
    getFieldsForm(values);
    /** процесс регистрации */
    registration();
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">
        {t('registration')}
      </h1>
      <div className="width-75">
        <RegistrationForm submitOnSuccess={submitForm} />
      </div>
      <StatusMessageModal />
    </Layout>
  );
};

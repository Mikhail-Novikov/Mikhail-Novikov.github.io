/* eslint-disable camelcase */
import '../form.css';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorMessages } from './error-message';
import { TFormValues } from './types';
import { SignupSchema, validateEmail } from '../ValidationShema';

interface Props {
  /** Обработчик формы */
  submitOnSuccess: (values: TFormValues) => void;
}

/**
 * Компонент формы регистрации
 */
export const RegistrationForm = ({
  submitOnSuccess,
}: Props): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        submitOnSuccess(values);
        actions.resetForm();
      }}
    >
      <Form className="form">
        <div className="flex-row gap-16">
          <div className="mb-32 mt-32">
            <label htmlFor="numPhone">*{t('label-email')}</label>
            <Field
              id="mail"
              type="text"
              name="email"
              placeholder="mail@mail.ru"
              validate={validateEmail}
            />
            <ErrorMessages field="email" />
          </div>

          <div className="mb-32 mt-32">
            <label htmlFor="password">*{t('label-password')}</label>
            <Field id="password" name="password" type="password" />
            <ErrorMessages field="password" />
          </div>
        </div>

        <div className="mb-32">
          <label htmlFor="name">{t('label-name')}</label>
          <Field id="name" name="name" type="text" />
        </div>

        <hr />
        <div className="txt-right">
          <button type="submit">{t('label-send')}</button>
        </div>
      </Form>
    </Formik>
  );
};

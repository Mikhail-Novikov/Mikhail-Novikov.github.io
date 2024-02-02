/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import '../form.css';

import { TFormValues } from './types';
// import {
//   SignupSchema,
//   validateEmail,
//   validatePassword,
//   validatePhone,
// } from '../ValidationShema';
import { ErrorMessages } from '../error-message';

interface Props {
  /** Обработчик формы */
  submitOnSuccess: (values: TFormValues) => void;
}

/**
 * Компонент формы регистрации
 */
export const RegistrationForm = ({
  submitOnSuccess,
}: Props): React.ReactElement => (
  <Formik
    initialValues={{
      name: '',
      password: '',
      age: '',
      documentItem: '',
      documentType: 'passport',
      numPhone: '',
      email: '',
    }}
    // validationSchema={SignupSchema}
    onSubmit={(values, actions) => {
      submitOnSuccess(values);
      actions.resetForm();
    }}
  >
    <Form className="form">
      <div className="mb-32">
        <label htmlFor="name">Имя</label>
        <Field id="name" name="name" type="text" />
        <ErrorMessages field="name" />
      </div>

      <div className="mb-32 mt-32">
        <label htmlFor="password">*Пароль</label>
        <Field id="password" name="password" type="password" />
        <ErrorMessages field="password" />
      </div>

      <div className="mb-32 mt-32">
        <label htmlFor="numPhone">*Почта</label>
        <Field id="mail" type="text" name="email" placeholder="mail@mail.ru" />
        <ErrorMessages field="email" />
      </div>

      <hr />
      <div className="txt-right">
        <button type="submit">Отправить</button>
      </div>
    </Form>
  </Formik>
);

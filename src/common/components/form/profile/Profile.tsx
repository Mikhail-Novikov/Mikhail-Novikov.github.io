/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import '../form.css';

import {
  SignupSchema,
  validateEmail,
  validatePassword,
} from './ValidationShema';
import { TFormValues } from './types';
import { ErrorMessages } from '../error-message';

interface Props {
  /** Обработчик формы */
  submitOnSuccess: (values: TFormValues) => void;
  /** Режим авторизации */
  isAuthorization?: boolean;
  /** Дата последней регистрации */
  signUpDate?: Date;
  /** адрес почты при последней регистрации */
  email?: string;
}

/**
 * Компонент формы авторизацииz
 */
export const Profile = ({
  submitOnSuccess,
  isAuthorization,
  signUpDate,
  email,
}: Props): React.ReactElement => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      name: '',
      desc: '',
    }}
    validationSchema={SignupSchema}
    onSubmit={(values, actions) => {
      submitOnSuccess(values);
      actions.resetForm();
    }}
  >
    <Form className="form">
      {!isAuthorization && (
        <>
          <h2 className="margin-bottom-16">Вы не авторизованы</h2>
          <ul className="flex-row wrap gap-16 form-group">
            <li>
              <label htmlFor="password">*Емайл</label>
              <Field
                id="mail"
                type="text"
                name="email"
                placeholder="mail@mail.ru"
                validate={validateEmail}
              />
              <ErrorMessages field="email" />
            </li>
            <li>
              <label htmlFor="password">*Пароль</label>
              <Field
                id="password"
                name="password"
                type="password"
                validate={validatePassword}
                placeholder="xxxxxxxxxx"
              />
              <ErrorMessages field="password" />
            </li>
          </ul>
          <p className="margin-bottom-16 txt-subtitle">
            Для работы с приложением надо авторизоваться
          </p>
          <hr />
        </>
      )}
      {isAuthorization && (
        <>
          <h4 className="table-title mt-24 mb-16">Информация</h4>
          <p className="margin-bottom-8 txt-subtitle">
            Дата последней регистрации: {signUpDate ?? 'Неизвестна'}
          </p>
          <p className="margin-bottom-16 txt-subtitle">
            Ваш емайл: {email ?? 'Потерялся'}
          </p>

          <ul className="flex-row wrap gap-16 form-group mt-24">
            <li>
              <label htmlFor="name">Ваш ник(имя)</label>
              <Field id="name" type="text" name="name" placeholder="Слон" />
            </li>
            <li>
              <label htmlFor="desc">О себе</label>
              <Field
                id="desc"
                name="desc"
                type="textarea"
                as="textarea"
                placeholder="Я маленькая лошадка"
              />
            </li>
          </ul>

          <hr />
          <h4 className="table-title mt-24">Настройки</h4>
          <ul className="flex-row wrap gap-16 form-group mt-24">
            <li>
              <label htmlFor="newPassword">Новый пароль</label>
              <Field
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="ххххххххх"
              />
            </li>
            <li>
              <label htmlFor="confirmPassword">*Подтвердите пароль</label>
              <Field
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="ххххххххх"
              />
              <ErrorMessages field="confirmPassword" />
            </li>
          </ul>
        </>
      )}
      <hr />
      <div className="txt-right">
        <button type="submit">Отправить</button>
      </div>
    </Form>
  </Formik>
);

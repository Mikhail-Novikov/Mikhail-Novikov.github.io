/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import '../form.css';

import { SignupSchema } from './ValidationShema';
import { TFormValues } from './types';
import { ErrorMessages } from '../registration-form/error-message';

interface Props {
  /** Обработчик формы */
  submitOnSuccess: (values: TFormValues) => void;
  /** Дата последней регистрации */
  signUpDate?: Date;
  /** адрес почты при последней регистрации */
  email?: string;
  /** признак успешного редактирования профиля */
  isConfirmEditProfile?: boolean;
}

/**
 * Компонент формы для авторизованного пользователя(токен в системе)
 * смена пароля
 */
export const AuthForm = ({
  submitOnSuccess,
  signUpDate,
  email,
  isConfirmEditProfile,
}: Props): React.ReactElement => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      newPassword: '',
      unconfirmedPassword: '',
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
      <div className="mt-24">
        <label htmlFor="password">Старый пароль</label>
        <Field
          id="password"
          type="password"
          name="password"
          placeholder="ххххххххх"
        />
        <ErrorMessages field="password" />
      </div>
      <ul className="flex-row wrap gap-16 form-group mt-24">
        <li>
          <label htmlFor="unconfirmedPassword">Новый пароль</label>
          <Field
            id="unconfirmedPassword"
            type="password"
            placeholder="ххххххххх"
            name="unconfirmedPassword"
          />
        </li>
        <li>
          <label htmlFor="newPassword">*Подтвердите пароль</label>
          <Field
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="ххххххххх"
          />
          <ErrorMessages field="newPassword" />
        </li>
      </ul>
      {isConfirmEditProfile && (
        <p className="margin-bottom-12 txt-bold txt-right txt-primary">
          Пароль был изменён!
        </p>
      )}

      <hr />
      <div className="txt-right">
        <button type="submit">Отправить</button>
      </div>
    </Form>
  </Formik>
);

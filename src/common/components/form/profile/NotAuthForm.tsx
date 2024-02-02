/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import '../form.css';

import { TFormValues } from './types';
import { ErrorMessages } from '../error-message';

interface Props {
  /** Обработчик формы */
  submitOnSuccess: (values: TFormValues) => void;
}

/**
 * Компонент формы для  пользователя без токена(вышел из сессии)
 * вход по паролю
 */
export const NotAuthForm = ({ submitOnSuccess }: Props): React.ReactElement => {
  const validateEmail = (value: string): string => {
    if (!value) {
      return 'Авторизуйтесь, введите емайл и пароль';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Формат электронной почты должен быть mail@mail.ru';
    }
    return null;
  };

  const validatePassword = (value: string): string => {
    if (!value) {
      return 'Введите пароль';
    }
    if (value.length < 6) {
      return 'Пароль должен быть не менее 6 символов';
    }
    return null;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        submitOnSuccess(values);
        actions.resetForm();
      }}
    >
      <Form className="form">
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
        <div className="txt-right">
          <button type="submit">Отправить</button>
        </div>
      </Form>
    </Formik>
  );
};

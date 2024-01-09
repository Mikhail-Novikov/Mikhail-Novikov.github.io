/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import '../form.css';

import {
  SignupSchema,
  validateEmail,
  validatePassword,
  validatePhone,
} from '../ValidationShema';
import { ErrorMessages } from '../error-message';

/**
 * Компонент формы регистрации
 */
export const RegistrationForm = (): React.ReactElement => {
  const [documentItem, setDocument] = useState('passport');
  const [infoMethod, setInfoMethod] = useState<string>('phone');

  return (
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
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
      }}
    >
      <Form className="form">
        <ul className="flex-row wrap gap-16 form-group">
          <li>
            <label htmlFor="name">*Имя</label>
            <Field id="name" name="name" type="text" />
            <ErrorMessages field="name" />
          </li>
          <li>
            <label htmlFor="password">*Пароль</label>
            <Field
              id="password"
              name="password"
              type="password"
              validate={validatePassword}
            />
            <ErrorMessages field="password" />
          </li>
        </ul>
        <ul className="flex-row wrap gap-16 form-group">
          <li>
            <label htmlFor="documentType">*Документ</label>
            <Field
              component="select"
              id="documentType"
              name="document"
              onChange={(event: {
                target: { value: React.SetStateAction<string> };
              }) => setDocument(event.target.value)}
            >
              <option value="passport">Паспорт</option>
              <option value="card">Удостоверение</option>
            </Field>
          </li>
          <li>
            <label htmlFor="age">Возраст</label>
            <Field id="age" name="age" type="number" />
          </li>
        </ul>

        <Field
          className="mt-16"
          id="documentItem"
          name="documentItem"
          type="text"
          placeholder={
            documentItem === 'passport'
              ? 'xxxx-xxxxxx'
              : 'Введите номер документа'
          }
        />
        <ErrorMessages field="documentItem" />

        <div className="mb-32 mt-32">
          <label htmlFor="numPhone">*Для связи</label>
          {infoMethod === 'phone' ? (
            <>
              <Field
                id="numPhone"
                type="text"
                name="numPhone"
                placeholder="+7 111 111-11-11"
                validate={validatePhone}
              />
              <ErrorMessages field="numPhone" />
            </>
          ) : (
            <>
              <Field
                id="mail"
                type="text"
                name="email"
                placeholder="mail@mail.ru"
                validate={validateEmail}
              />
              <ErrorMessages field="email" />
            </>
          )}
          <div className="flex-row align-items-center gap-16 mt-16">
            <div className="flex-row align-items-center">
              <Field
                id="infoMethodPhone"
                type="radio"
                name="contact"
                value="phone"
                onChange={() => setInfoMethod('phone')}
                checked={infoMethod === 'phone'}
              />
              <label className="mb-0" htmlFor="infoMethodPhone">
                Телефон
              </label>
            </div>

            <div className="flex-row align-items-center">
              <Field
                id="infoMethodPhoneMail"
                type="radio"
                name="contact"
                value="mail"
                onChange={() => setInfoMethod('mail')}
                checked={infoMethod === 'mail'}
              />
              <label className="mb-0" htmlFor="infoMethodPhoneMail">
                Интернет почта
              </label>
            </div>
          </div>
        </div>

        <hr />
        <div className="txt-right">
          <button type="submit">Отправить</button>
        </div>
      </Form>
    </Formik>
  );
};

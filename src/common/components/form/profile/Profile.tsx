/* eslint-disable camelcase */
import React from 'react';
import '../form.css';

import { AuthForm } from './AuthForm';
// import { NotAuthForm } from './NotAuthForm';
import { TFormValues } from './types';

interface Props {
  /** Обработчик формы */
  submitOnSuccess: (values: TFormValues) => void;
  /** Режим авторизации */
  // isAuthorization?: boolean;
  /** Дата последней регистрации */
  signUpDate?: Date;
  /** адрес почты при последней регистрации */
  email?: string;
  /** адрес почты при последней регистрации */
  isSuccess?: boolean;
}

/**
 * Компонент формы авторизации
 */
export const Profile = ({
  submitOnSuccess,
  // isAuthorization = true,
  signUpDate,
  email,
  isSuccess,
}: Props): React.ReactElement => (
  /*  isAuthorization ? ( */
  <AuthForm
    submitOnSuccess={submitOnSuccess}
    signUpDate={signUpDate}
    email={email}
    isSuccess={isSuccess}
  />
);
/*  ) : (
    <NotAuthForm submitOnSuccess={submitOnSuccess} />
  ); */

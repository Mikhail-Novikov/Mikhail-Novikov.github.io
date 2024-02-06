/* eslint-disable camelcase */
import React from 'react';
import '../form.css';

import { AuthForm } from './AuthForm';
import { TFormValues } from './types';

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
 * Компонент формы авторизации
 */
export const Profile = ({
  submitOnSuccess,
  signUpDate,
  email,
  isConfirmEditProfile,
}: Props): React.ReactElement => (
  <AuthForm
    submitOnSuccess={submitOnSuccess}
    signUpDate={signUpDate}
    email={email}
    isConfirmEditProfile={isConfirmEditProfile}
  />
);

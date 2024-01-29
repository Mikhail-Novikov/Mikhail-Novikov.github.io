/* eslint-disable camelcase */
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Password is required')
    .matches(/(?=.{6,})/, 'Пароль должен быть не менее 6 символов'),
  confirmPassword: Yup.string()
    .required('Требуется подтверждение нового пароля')
    .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают'),
});

export const validateEmail = (value: string): string => {
  if (!value) {
    return 'Авторизуйтесь, введите емайл и пароль';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Формат электронной почты должен быть mail@mail.ru';
  }
  return null;
};

export const validatePassword = (value: string): string => {
  if (!value) {
    return 'Введите пароль';
  }
  if (value.length < 6) {
    return 'Пароль должен быть не менее 6 символов';
  }
  return null;
};

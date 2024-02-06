/* eslint-disable camelcase */
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required('Введите пароль указанный при регистрации')
    .matches(/(?=.{6,})/, 'Пароль должен быть не менее 6 символов'),
  unconfirmedPassword: Yup.string()
    .required('Введите пароль')
    .matches(/(?=.{6,})/, 'Пароль должен быть не менее 6 символов'),
  newPassword: Yup.string()
    .required('Требуется подтверждение нового пароля')
    .oneOf([Yup.ref('unconfirmedPassword')], 'Пароли не совпадают'),
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

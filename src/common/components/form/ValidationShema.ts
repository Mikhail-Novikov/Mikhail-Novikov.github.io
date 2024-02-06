/* eslint-disable camelcase */
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required('Введите пароль')
    .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Должен содержать 8 символов и цифры '),
});

export const validateEmail = (value: string): string => {
  if (!value) {
    return 'Введите почту';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Формат электронной почты должен быть mail@mail.ru';
  }
  return null;
};

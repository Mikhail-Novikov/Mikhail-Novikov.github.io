/* eslint-disable camelcase */
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно к заполнению'),
  documentItem: Yup.string().min(10).required('Введите номер документ'),

  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const validateEmail = (value: string): string => {
  if (!value) {
    return 'При регистрации, телефон или почта, обязательно к заполнению';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Формат электронной почты должен быть mail@mail.ru';
  }
  return null;
};

export const validatePhone = (value: string): string => {
  if (!value) {
    return 'При регистрации, телефон или почта, обязательно к заполнению';
  }
  if (value.length < 10) {
    return 'Номер телефона должен быть не менее 10 цифр';
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

export const validateText = (value: string): string => {
  if (!value) {
    return 'Заполните поле';
  }
  return null;
};

export const validateNumber = (value: number): string => {
  if (!value) {
    return 'Неверно заполненое поле';
  }
  if (value < 0) {
    return 'Число не может быть меньше нуля';
  }
  return null;
};

import { ErrorCode } from '@common/types/errorCodes';

export type ChangePasswordResult = {
  success?: boolean;
};

export type ProfileState = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
  isConfirmEditProfile: boolean;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

export type Errors = {
  name: 'IncorrectPasswordError';
  extensions: {
    code: ErrorCode;
  };
};

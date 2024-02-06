type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
};

export type SignUpBody = {
  email: string;
  password: string;
  commandId?: string;
};

export type AuthResult = {
  token: string;
  profile: Profile;
};

export type RegistrationState = {
  /** Текущий токен в приложении */
  isAuthorization: boolean;
  /** Значение токена */
  token: string;
} & SignUpBody;

export type ProfileState = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
};

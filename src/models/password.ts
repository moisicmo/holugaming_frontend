
export interface FormPasswordModel {
  password: string;
  passwordVerify: string;
}

export interface FormPasswordValidations {
  password: [(value: string) => boolean, string];
  passwordVerify: [(value: string) => boolean, string];
}
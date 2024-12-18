
export interface FormAuthModel {
  email: string;
  password: string;
}

export interface FormAuthValidations {
  email: [(value: string) => boolean, string];
  password: [(value: string) => boolean, string];
}

export interface FormRegisterModel {
  name: string;
  lastName: string;
  nick: string;
  email: string;
}

export interface FormRegisterValidations {
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  nick: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
}
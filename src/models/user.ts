
export interface UserModel {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  phone: string|null;
  email:string;
  image:string;
}

export interface FormUserModel {
  dni: string;
  name: string;
  lastName: string;
  email: string;
}

export interface FormUserValidations {
  dni: [(value: string) => boolean, string];
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
}


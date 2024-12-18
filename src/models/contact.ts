/* FORM BRANCH OFFICE MODEL */
export interface FormContactModel {
  name: string;
  email: string;
  message: string;
}

/*FORM BRANCH OFFICE VALIDATIONS */
export interface FormContactValidations {
  name: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
  message: [(value: string) => boolean, string];
}
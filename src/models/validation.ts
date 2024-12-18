
export interface FormValidationModel {
  code: string;
}

export interface FormValidationValidations {
  code: [(value: string) => boolean, string];
}
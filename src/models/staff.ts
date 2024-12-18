import { FormUserModel, FormUserValidations, RoleModel, UserModel } from ".";

export interface StaffModel extends  UserModel{
  id: number;
  role: RoleModel;
}

export interface FormStaffModel extends FormUserModel {
  role: RoleModel|null;
}

export interface FormStaffValidations extends FormUserValidations {
  role: [(value: RoleModel) => boolean, string];
}
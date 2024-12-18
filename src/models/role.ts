import { PermissionModel } from ".";

export interface RoleModel {
  id: number;
  name: string;
  permissions: PermissionModel[];
}

export interface FormRoleModel {
  name: string;
  permissions: PermissionModel[];
}

export interface FormRoleValidations {
  name: [(value: string) => boolean, string];
  permissions: [(value: PermissionModel[]) => boolean, string];
}
import { PermissionModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    permissions: [] as PermissionModel[],
  },
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload.permissions;
    },
  },
});

export const {
  //permisions
  setPermissions,
} = permissionSlice.actions;

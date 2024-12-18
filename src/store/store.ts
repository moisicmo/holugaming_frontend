import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  permissionSlice,
  roleSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

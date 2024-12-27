import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  permissionSlice,
  playerSlice,
  roleSlice,
  tournamentSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    tournaments: tournamentSlice.reducer,
    players: playerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

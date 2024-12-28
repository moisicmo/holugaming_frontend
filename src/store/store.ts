import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  permissionSlice,
  playerSlice,
  roleSlice,
  teamSlice,
  tournamentSlice,
} from '.';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    permissions: permissionSlice.reducer,
    roles: roleSlice.reducer,
    tournaments: tournamentSlice.reducer,
    players: playerSlice.reducer,
    teams: teamSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

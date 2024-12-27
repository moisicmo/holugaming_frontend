import { PlayerModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    players: [] as PlayerModel[]
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload.players;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setPlayers } = playerSlice.actions;
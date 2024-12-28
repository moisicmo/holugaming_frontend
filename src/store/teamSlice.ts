import { TeamModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const teamSlice = createSlice({
  name: 'team',
  initialState: {
    team: null as TeamModel | null,
  },
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload.team;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setTeam } = teamSlice.actions;
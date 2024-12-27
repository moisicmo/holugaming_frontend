import { TournamentModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState: {
    tournaments: [] as TournamentModel[],
    tournament: null as TournamentModel | null,
  },
  reducers: {
    setTournaments: (state, action) => {
      state.tournaments = action.payload.tournaments;
    },
    setTournament: (state, action) => {
      state.tournament = action.payload.tournament;
    },
  }
});


// Action creators are generated for each case reducer function
export const { setTournaments, setTournament } = tournamentSlice.actions;
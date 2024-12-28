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
    addTeamTournament: (state, action) => {
      if (state.tournament?.inscriptions) {
        state.tournament.inscriptions.push(action.payload.inscription);
      }
    },
  }
});


// Action creators are generated for each case reducer function
export const { setTournaments, setTournament,addTeamTournament } = tournamentSlice.actions;
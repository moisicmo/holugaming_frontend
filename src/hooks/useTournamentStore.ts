import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setTournament,
  setTournaments,
} from '@/store';
import { useErrorStore } from '.';
import { useNavigate } from 'react-router-dom';

export const useTournamentStore = () => {
  const { tournaments, tournament } = useSelector((state: any) => state.tournaments);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const navigate = useNavigate();
  // const { showSuccess, showWarning, showError } = useAlertStore();

  const getTournaments = async () => {
    try {
      const { data } = await coffeApi.get('/tournament');
      console.log(data);
      dispatch(setTournaments({ tournaments: data.tournaments }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const getTournamentById = async (id:number) => {
    try {
        console.log('consultando');

      const { data } = await coffeApi.get(`/tournament/${id}`);
      console.log(data);
      dispatch(setTournament({ tournament: data }));
    } catch (error) {
      return navigate('/404', { replace: true });
    }
  };

  return {
    //* Propiedades
    tournaments,
    tournament,
    //* Métodos
    getTournaments,
    getTournamentById,
  };
};

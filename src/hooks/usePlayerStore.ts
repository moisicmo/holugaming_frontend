import { useDispatch, useSelector } from 'react-redux';
import { coffeApiUsers } from '@/services';
import { setPlayers } from '@/store';
import { useErrorStore } from '.';

export const usePlayerStore = () => {
  const { players } = useSelector((state: any) => state.players);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();

  const getPlayers = async () => {
    try {
      const { data } = await coffeApiUsers.get('/player');
      console.log(data);
      dispatch(setPlayers({ players: data.players }));
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    players,
    //* Métodos
    getPlayers,
  };
};

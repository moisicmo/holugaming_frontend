import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { useErrorStore } from '.';
import { setTeam } from '@/store';

export const useTeamStore = () => {
  const { team } = useSelector((state: any) => state.teams);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();

  const createTeam = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/team/', body);
      console.log(data);
      dispatch(setTeam({ team: data }));
      return data;
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    team,
    //* Métodos
    createTeam,
  };
};

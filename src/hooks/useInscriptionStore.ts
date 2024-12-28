import { useDispatch } from 'react-redux';
import { coffeApi } from '@/services';
import { useAlertStore, useErrorStore } from '.';
import { addTeamTournament } from '@/store';

export const useInscriptionStore = () => {
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess } = useAlertStore();

  const createInscription = async (body: object) => {
    try {
      
      const { data } = await coffeApi.post('/inscription/',body);
      dispatch(addTeamTournament({ inscription: data }));
      showSuccess('Inscripción creada correctamente');
      
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Métodos
    createInscription,
  };
};

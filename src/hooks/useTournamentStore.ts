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
  // const createStaff = async (body: object) => {
  //   try {
  //     const { data } = await coffeApi.post('/staff/', body);
  //     console.log(data);
  //     dispatch(setAddStaff({ staff: data }));
  //     showSuccess('Staff creado correctamente');
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // };
  // const updateStaff = async (id: number, body: object) => {
  //   try {
  //     const { data } = await coffeApi.put(`/staff/${id}`, body);
  //     console.log(data);
  //     dispatch(setUpdateStaff({ staff: data }));
  //     showSuccess('Staff editado correctamente');
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // };
  // const deleteStaff = async (id: number) => {
  //   try {
  //     const result = await showWarning();
  //     if (result.isConfirmed) {
  //       await coffeApi.delete(`/staff/${id}`);
  //       dispatch(setDeleteStaff({ id }));
  //       showSuccess('Staff eliminado correctamente');
  //     } else {
  //       showError('Cancelado', 'El Staff esta a salvo :)');
  //     }
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // };

  return {
    //* Propiedades
    tournaments,
    tournament,
    //* Métodos
    getTournaments,
    getTournamentById,
    // createStaff,
    // updateStaff,
    // deleteStaff,
  };
};

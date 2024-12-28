import { useDispatch, useSelector } from 'react-redux';
import { coffeApiUsers } from '@/services';
import { setAddRole, setRoles, setUpdateRole } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useRoleStore = () => {
  const { roles } = useSelector((state: any) => state.roles);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess } = useAlertStore();

  const getRoles = async () => {
    try {
      const { data } = await coffeApiUsers.get('/role');
      console.log(data);
      dispatch(setRoles({ roles: data.roles }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const createRole = async (body: object) => {
    try {
      const { data } = await coffeApiUsers.post(`/role`, body);
      console.log(data);
      dispatch(setAddRole({ role: data }));
      showSuccess('Rol creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const updateRole = async (id: number, body: object) => {
    try {
      const { data } = await coffeApiUsers.put(`/role/${id}`, body);
      console.log(data);
      dispatch(setUpdateRole({ role: data }));
      showSuccess('Rol editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const deleteRole = async () => {
    try {
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    roles,
    //* Métodos
    getRoles,
    createRole,
    updateRole,
    deleteRole,
  };
};

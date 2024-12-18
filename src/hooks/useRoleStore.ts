import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddRole, setDeleteRole, setRoles, setUpdateRole } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useRoleStore = () => {
  const { roles } = useSelector((state: any) => state.roles);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getRoles = async () => {
    try {
      const { data } = await coffeApi.get('/role');
      console.log(data);
      dispatch(setRoles({ roles: data.roles }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const createRole = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/role`, body);
      console.log(data);
      dispatch(setAddRole({ role: data }));
      showSuccess('Rol creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const updateRole = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/role/${id}`, body);
      console.log(data);
      dispatch(setUpdateRole({ role: data }));
      showSuccess('Rol editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const deleteRole = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/role/${id}`);
        dispatch(setDeleteRole({ id }));
        showSuccess('Rol eliminado correctamente');
      } else {
        showError('Cancelado', 'El rol esta a salvo :)');
      }
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

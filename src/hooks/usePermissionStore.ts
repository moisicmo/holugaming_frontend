import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setPermissions } from '@/store';
import { useErrorStore } from '.';

export const usePermissionStore = () => {
  const { permissions } = useSelector((state: any) => state.permissions);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();

  const getPermissions = async () => {
    try {
      const { data } = await coffeApi.get('/permission');
      console.log(data);
      dispatch(setPermissions({ permissions: data.permissions }));
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    permissions,
    //* Métodos
    getPermissions,
  };
};

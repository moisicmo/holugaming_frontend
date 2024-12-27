import { useDispatch, useSelector } from 'react-redux';
import { coffeApiUsers } from '@/services';
import { onLogin, onLogout } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useAuthStore = () => {
  const { status, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
    const { showSuccess } = useAlertStore();

  const startLogin = async (body: object) => {
    try {
      console.log('INICIANDO SESION');
      console.log(body);
      const { data } = await coffeApiUsers.post('/auth', body);
      console.log(data);
      if(data.statusCode == 1){
        return data;
      }
      // const user = `${data.user.name} ${data.user.lastName}`;
      // const role = data.user.staffs.role;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', user);
      // localStorage.setItem('role', JSON.stringify(role));
      dispatch(onLogin(data.user));
      // dispatch(setRoleUser({ role }));
    } catch (error) {
      dispatch(onLogout());
      throw handleError(error);
    }
  };

  const register = async (body: object) => {
    try {
      console.log('REGISTRANDO');
      console.log(body);
      const { data } = await coffeApiUsers.post('/player', body);
      console.log(data);
      showSuccess('Cuenta creada!!!','tu contraseña es tu mismo correo');
    } catch (error) {
      dispatch(onLogout());
      throw handleError(error);
    }
  }

  const validate = async(body:object) => {
    try {
      console.log('VALIDANDO');
      console.log(body);
      const { data } = await coffeApiUsers.post('/auth/validate-email', body);
      console.log(data);
      showSuccess('Cuenta verificada!!!');
    } catch (error) {
      dispatch(onLogout());
      throw handleError(error);
    }
  }

  const changePassword = async(body:object) => {
    try {
      console.log('CAMBIANDO CONTRASEÑA');
      console.log(body);
      const { data } = await coffeApiUsers.post('/auth/change-password', body);
      console.log(data);
      showSuccess('Listo!!!');
    } catch (error) {
      dispatch(onLogout());
      throw handleError(error);
    }
  }

  
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = localStorage.getItem('user');
      // console.log(user)
      return dispatch(onLogin(user));
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    status,
    user,

    //* Métodos
    startLogin,
    register,
    validate,
    changePassword,
    checkAuthToken,
  };
};

export const useLogoutStore = () => {
  const dispatch = useDispatch();
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };
  return {
    startLogout,
  };
};

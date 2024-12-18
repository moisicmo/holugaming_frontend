import { AxiosError } from 'axios';
import { useAlertStore, useLogoutStore } from '.';

export const useErrorStore = () => {
  const { startLogout } = useLogoutStore();
  const { showError } = useAlertStore();

  const handleError = (error: any) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          startLogout();
          break;
        default:
          showError('Oops', error.response?.data.error);
          break;
      }
    } else {
      throw error;
    }
  };
  return {
    handleError,
  };
};

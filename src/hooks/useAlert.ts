import Swal from 'sweetalert2';

export const useAlertStore = () => {
  const showSuccess = (message: string,subtitle?:string) => {
    Swal.fire(message, subtitle??'', 'success');
  };

  const showWarning = (title: string, message: string) => {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
    });
  };

  const showError = (title: string, message: string) => {
    Swal.fire(title, message, 'error');
  };

  const showDesition = (title: string, content: string, confirmButtonText: string) => {
    return Swal.fire({
      title: title,
      text: content,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: '¡No, cancelar!',
    });
  }


  return {
    showSuccess,
    showWarning,
    showError,
    showDesition,
  };
};

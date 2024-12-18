// import { useDispatch, useSelector } from 'react-redux';
// import { coffeApi } from '@/services';
// import {
//   setStaffs,
//   setAddStaff,
//   setUpdateStaff,
//   setDeleteStaff,
// } from '@/store';
// import { useAlertStore, useErrorStore } from '.';

// export const useStaffStore = () => {
//   const { staffs } = useSelector((state: any) => state.staffs);
//   const dispatch = useDispatch();
//   const { handleError } = useErrorStore();
//   const { showSuccess, showWarning, showError } = useAlertStore();

//   const getStaffs = async () => {
//     try {
//       const { data } = await coffeApi.get('/staff');
//       console.log(data);
//       dispatch(setStaffs({ staffs: data.staffs }));
//     } catch (error) {
//       throw handleError(error);
//     }
//   };
//   const createStaff = async (body: object) => {
//     try {
//       const { data } = await coffeApi.post('/staff/', body);
//       console.log(data);
//       dispatch(setAddStaff({ staff: data }));
//       showSuccess('Staff creado correctamente');
//     } catch (error) {
//       throw handleError(error);
//     }
//   };
//   const updateStaff = async (id: number, body: object) => {
//     try {
//       const { data } = await coffeApi.put(`/staff/${id}`, body);
//       console.log(data);
//       dispatch(setUpdateStaff({ staff: data }));
//       showSuccess('Staff editado correctamente');
//     } catch (error) {
//       throw handleError(error);
//     }
//   };
//   const deleteStaff = async (id: number) => {
//     try {
//       const result = await showWarning();
//       if (result.isConfirmed) {
//         await coffeApi.delete(`/staff/${id}`);
//         dispatch(setDeleteStaff({ id }));
//         showSuccess('Staff eliminado correctamente');
//       } else {
//         showError('Cancelado', 'El Staff esta a salvo :)');
//       }
//     } catch (error) {
//       throw handleError(error);
//     }
//   };

//   return {
//     //* Propiedades
//     staffs,
//     //* Métodos
//     getStaffs,
//     createStaff,
//     updateStaff,
//     deleteStaff,
//   };
// };

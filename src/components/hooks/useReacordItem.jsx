import { useDispatch } from "react-redux";
import {
  addRecordModal,
  addRecordToDelete,
  changeStateWarningDelete,
} from "../../store/recods/recordsSlices";
import { toast } from "react-hot-toast";

export const useReacordItem = () => {
  const dispatch = useDispatch();

  // agrega un valor par el modal de update al estado global
  const handleAddModal = (item,openModal) => {
    dispatch(addRecordModal(item));
    openModal();
  };

  // cambiar el estado de ver el warning de delete y agrega el valor a eliminar
  const changeStateWarning = (item) => {
    dispatch(changeStateWarningDelete());
    dispatch(addRecordToDelete(item));
  };

  // notificacion si decea eliminar el registro
  const viewAlert = (item) =>
    toast(() => (
      <div>
        <p>Estas seguro de eliminarlo</p>
        <div className="flex justify-between mt-2">
          <button
            className="bg-red-500 text-white hover:bg-red-600 p-1 rounded-md"
            onClick={() => {
              changeStateWarning(item);
              toast.dismiss();
            }}
          >
            Eliminar
          </button>
          <button
            className="bg-white hover:bg-slate-100 p-1 rounded-md border border-black"
            onClick={() => {
              toast.dismiss();
              dispatch(addRecordToDelete({}));
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    ));

  return {
    //* properties
    //* methods
    viewAlert,
    changeStateWarning,
    handleAddModal,
  };
};





// code por si falla algo del code anterior
// agrega un valor par el modal de update al estado global
  // const handleAddModal = () => {
  //   dispatch(addRecordModal(item));
  //   openModal();
  // };

  // // cambiar el estado de ver el warning de delete y agrega el valor a eliminar
  // const changeStateWarning = () => {
  //   dispatch(changeStateWarningDelete());
  //   dispatch(addRecordToDelete(item));
  // };

  // // notificacion si decea eliminar el registro
  // const viewAlert = () =>
  //   toast((t) => (
  //     <div>
  //       <p>Estas seguro de eliminarlo</p>
  //       <div className="flex justify-between mt-2">
  //         <button
  //           className="bg-red-500 text-white hover:bg-red-600 p-1 rounded-md"
  //           onClick={() => {
  //             changeStateWarning();
  //             toast.dismiss();
  //           }}
  //         >
  //           Eliminar
  //         </button>
  //         <button
  //           className="bg-white hover:bg-slate-100 p-1 rounded-md border border-black"
  //           onClick={() => {
  //             toast.dismiss()
  //             dispatch(addRecordToDelete({}));
  //           }}
  //         >
  //           Cancelar
  //         </button>
  //       </div>
  //     </div>
  //   ));

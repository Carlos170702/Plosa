import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecordToDelete,
  changeStateWarningDelete,
  deleteRecord,
} from "../store/recods/recordsSlices";
import { getData } from "../api/getData";
import { toast } from "react-hot-toast";

export const WarningDelete = () => {
  const dispatch = useDispatch();
  const { recordToDelete } = useSelector((state) => state.records);

  //cambiar estado del warning
  const changeStateWarning = () => {
    dispatch(changeStateWarningDelete());
  };

  //delete record
  const emptyRecord = async () => {
    const res = await getData(
      "PUT",
      "http://localhost:4000/api/clients/empty",
      { art_codigo: recordToDelete.art_codigo }
    );
    if (!res.error) {
      toast.success("ELiminado correctamente!");
      dispatch(deleteRecord(recordToDelete));
    } else {
      toast.error("Error al eliminar el registro!");
    }
  };

  return (
    <div className="w-screen bg-warning fixed z-30 flex items-center justify-center h-screen ">
      <div
        className="w-min() ml-auto mr-auto flex flex-col gap-9 bg-red-50 border-l-4 text-gray-500 p-4 rounded-sm"
        role="alert"
      >
        <p className="font-bold text-base">
          Estas realmente seguro que quieres eliminar el Registro esto afectara
          en tu Base de datos
        </p>

        <div className="flex justify-between mt-2">
          <button
            className="bg-red-500 text-white hover:bg-red-600 p-1 rounded-md"
            onClick={() => {
              changeStateWarning();
              emptyRecord();
              dispatch(addRecordToDelete({}));
            }}
          >
            Eliminar
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 p-1 rounded-md text-white"
            onClick={() => {
              changeStateWarning();
              dispatch(addRecordToDelete({}));
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

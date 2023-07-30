import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../api/getData";
import { toast } from "react-hot-toast";
import { updateRecord } from "../store/recods/recordsSlices";

export const RequestPassword = ({ data, closeModal, clodeRequestPassword }) => {
  const dispatch = useDispatch();
  const { recordModal, user } = useSelector((state) => state.records);
  const [password, setPassword] = useState("");

  // editar registro
  // endpoint= http://localhost:4000/api/clients, PUT
  const editRecord = async (data) => {
    const { commission, currency, name, price, um, unit, weight } = data;
    const infoUpdate = {
      art_codigo: recordModal.art_codigo,
      art_nombre: name,
      art_um: parseFloat(um).toFixed(2),
      art_precio: parseFloat(price).toFixed(2),
      art_peso: parseFloat(weight).toFixed(2),
      art_unidad: unit,
      art_comision: parseFloat(commission).toFixed(2),
      art_divisa: currency,
    };
    const res = await getData(
      "PUT",
      "http://localhost:4000/api/clients",
      infoUpdate
    );

    if (!res.error) {
      toast.success("Actualizado correctamente!");
      dispatch(
        updateRecord({ art_codigo: recordModal.art_codigo, newRecords: data })
      );
      closeModal();
    } else {
      toast.error("Error al actualizar el registro!");
    }
  };

//   agregar el password que se dijita en el requestPassword
  const onChange = ({ target }) => {
    setPassword(target.value);
  };

  // lo que ara si la contraseña dijitada y la del password global son iguales
  const handleUpdateRecord = async (data) => {
    if (password === user?.usu_password) {
      editRecord(data);
      return;
    }
    toast.error("Contraseña incorrecta", {
      duration: 1500,
    });
  };

  return (
    <div className="bg-white rounded-md absolute top-1 right-1 z-50 p-3">
      <div className="flex flex-col">
        <label htmlFor="password" className="font-bold">
          Introduce tu contraseña:
        </label>
        <input
          type="password"
          placeholder="contraseña"
          className="outline-none border border-blue-400 p-1 rounded-2xl bg-white focus:border-blue-500 focus:border-2 text-sm pl-2 mt-1"
          onChange={onChange}
        />
        <div className="flex justify-between mt-2">
          <button
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              handleUpdateRecord(data);
            }}
          >
            Actualizar
          </button>
          <button
            className="bg-white hover:bg-slate-100 p-1 rounded-md border border-black"
            onClick={() => {
              clodeRequestPassword();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

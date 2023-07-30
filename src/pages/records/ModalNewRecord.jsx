import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../api/getData";
import { toast } from "react-hot-toast";
import {
  addRecordModal,
  addoneRecord,
  updateRecord,
} from "../../store/recods/recordsSlices";
import { RiEdit2Line } from "react-icons/ri";
import { RequestPassword } from "../../components/RequestPassword";
import { useState } from "react";

export const ModalNewRecord = ({ Modal }) => {
  const [info, setInfo] = useState({});
  const [activeRequestPassword, setActiveRequestPassword] = useState(false);
  const { recordModal } = useSelector((state) => state.records);
  const dispatch = useDispatch();

  // control del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: recordModal?.art_nombre,
      unit: recordModal?.art_unidad,
      status: recordModal?.art_status,
      um: recordModal?.art_um,
      price: recordModal?.art_precio,
      commission: recordModal?.art_comision,
      currency: recordModal?.art_divisa,
    },
  });

  // cerrar el modal
  const closeModal = () => {
    dispatch(addRecordModal({}));
    Modal();
  };

  // agregar nuevo registro
  const addRecord = async (data) => {
    const { commission, currency, name, price, um, unit, status } = data;
    const infoInsert = {
      art_nombre: name,
      art_um: parseFloat(um).toFixed(2),
      art_precio: parseFloat(price).toFixed(2),
      art_status: status.toUpperCase(),
      art_unidad: unit.toUpperCase(),
      art_comision: parseFloat(commission).toFixed(2),
      art_divisa: currency.toUpperCase(),
    };
    const res = await getData(
      "POST",
      "http://localhost:4000/api/clients",
      infoInsert
    );

    if (!res.error) {
      toast.success("Agregado correctamente!");
      dispatch(
        addoneRecord({ ...infoInsert, art_codigo: res.message.insertId })
      );
      closeModal();
    } else {
      toast.error("Error al agregar nuevo registro!");
    }
  };

  const updateRecordDB = async (data) => {
    const dataUpdate = {
      art_nombre: data.name,
      art_um: data.um,
      art_precio: data.price,
      art_unidad: data.unit,
      art_status: data.status,
      art_comision: data.commission,
      art_divisa: data.currency,
      art_codigo: recordModal.art_codigo,
    };
    try {
      const res = await getData(
        "PUT",
        "http://localhost:4000/api/clients",
        dataUpdate
      );

      if (!res.error) {
        toast.success("Actualizado correctamente!");
        dispatch(updateRecord({ ...data, art_codigo: recordModal.art_codigo }));
        closeModal();
        return;
      }

      toast.error("Error al actualizar el registro!");
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error");
    }
  };

  // lo que ejecutara cuando este completo el formulario
  const onSubmit = async (data) => {
    if (Object.keys(recordModal).length <= 0) {
      addRecord(data);
      return;
    } else {
      updateRecordDB(data);
    }
    setInfo(data);
    setActiveRequestPassword(true);
  };

  const clodeRequestPassword = () => {
    setActiveRequestPassword(false);
  };

  return (
    <>
      {activeRequestPassword && (
        <RequestPassword
          closeModal={closeModal}
          data={info}
          clodeRequestPassword={clodeRequestPassword}
        />
      )}
      <div className="fixed z-20 inset-0 overflow-hidden">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate_animated animate_backInUp">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start relative">
                {/* mostrar el codigo del producto a editar */}
                {Object.keys(recordModal).length > 0 && (
                  <div className="p-1 shadow-sm shadow-indigo-300 border border-indigo-500 rounded-sm text-black absolute right-0 top-0">
                    <span>{recordModal?.art_codigo}</span>
                  </div>
                )}
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  {Object.keys(recordModal).length > 0 ? (
                    <RiEdit2Line color="rgb(79 70 229)" fontSize={26} />
                  ) : (
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 py-1 text-center"
                    id="modal-title"
                  >
                    {`${
                      Object.keys(recordModal).length > 0
                        ? "Actualizar producto"
                        : "Registrar nuevo producto"
                    }`}
                  </h3>
                  <div className="mt-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Nombre
                          </label>
                          <input
                            type="text"
                            name="name"
                            {...register("name", { required: true })}
                            className={`p-1 pl-3 border border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${
                              errors.name &&
                              "border-red-300 mt-1 outline-red-500"
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            UM
                          </label>
                          <input
                            type="number"
                            name="um"
                            {...register("um", { required: true })}
                            className={`p-1 pl-3 border border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${
                              errors.um && "border-red-300 mt-1 outline-red-500"
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Precio
                          </label>
                          <input
                            type="number"
                            name="price"
                            step={0.1}
                            {...register("price", { required: true })}
                            className={`p-1 pl-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                              errors.price &&
                              "border-red-300 mt-1 outline-red-500"
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Unidad
                          </label>
                          <input
                            type="text"
                            name="unit"
                            {...register("unit", { required: true })}
                            placeholder="Kilos..."
                            className={`p-1 pl-3 border border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${
                              errors.unit &&
                              "border-red-300 mt-1 outline-red-500"
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <input
                            type="text"
                            name="status"
                            {...register("status")}
                            className={`p-1 pl-3 border border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${
                              errors.weight &&
                              "border-red-300 mt-1 outline-red-500"
                            }`}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            comisión
                          </label>
                          <input
                            defaultValue={0.25}
                            type="number"
                            name="commission"
                            step={0.1}
                            min={0}
                            {...register("commission", { required: true })}
                            className={`p-1 pl-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                              errors.commission &&
                              "border-red-300 mt-1 outline-red-500"
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Divisa
                          </label>
                          <select
                            {...register("currency", { required: true })}
                            name="currency"
                            className={`p-1 pl-3 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                              errors.commission &&
                              "border-red-300 mt-1 outline-red-500"
                            } `}
                          >
                            <option value="MXN">MXN</option>
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {`${
                    Object.keys(recordModal).length > 0
                      ? "Actualizar"
                      : "Guardar"
                  }`}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => closeModal()}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

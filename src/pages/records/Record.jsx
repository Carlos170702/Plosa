import { NavBar } from "../../components/NavBar";
import { IoAddCircleSharp } from "react-icons/io5";
import { useRecord } from "./hooks/useRecord";
import { ModalNewRecord } from "./ModalNewRecord";
import { RecordItem } from "../../components/RecordItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addRecods } from "../../store/recods/recordsSlices";
import { toast } from "react-hot-toast";
import { getData } from "../../api/getData";
import { WarningDelete } from "../../components/WarningDelete";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

export const Record = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { openModal, modalNewRecord } = useRecord();
  const { records, stateWarningDelete, user } = useSelector(
    (state) => state.records
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Object.keys(user).length <= 0 && navigate("/");
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getData("GET", "http://localhost:4000/api/clients");
      setData(res);
    })();
  }, []);

  // al renderizar la pantalla cargara los datos al estado global
  useEffect(() => {
    dispatch(addRecods(data?.message));
  }, [data]);

  useEffect(() => {
    Object.keys(user).length > 0 &&
      toast.success(`Bienvenido ${user.usu_nombre}`);
  }, [true]);

  return (
    <>
      {stateWarningDelete && <WarningDelete />}
      {modalNewRecord && <ModalNewRecord Modal={openModal} />}
      <NavBar />
      <div className="flex justify-end mb-4 fixed bottom-0 right-5 z-10">
        <button
          className="rounded-lg md:rounded-xl"
          onClick={() => openModal()}
        >
          <IoAddCircleSharp
            color="rgb(20 180 52)"
            fontSize={55}
            className="cursor-pointer"
          />
        </button>
      </div>

      <div>
        <table className=" mt-5 min-w-full divide-y divide-gray-200 mb-10">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Codigo
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Um
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unidad
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Comisión
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Divisa
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records?.map((item) => (
              <RecordItem
                key={item?.art_codigo}
                item={item}
                openModal={openModal}
              />
            ))}
          </tbody>
        </table>
        {
          /* message que mostrara si no hay registros */
          !records && <Loader />
        }
      </div>
    </>
  );
};

import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { useReacordItem } from "./hooks/useReacordItem";

export const RecordItem = ({ item, openModal }) => {
  const { handleAddModal, viewAlert } = useReacordItem();

  return (
    <tr className="animate__animated animate__backInLeft">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {item?.art_codigo}
            </div>
          </div>
        </div>
      </td>
      <td className="px-2 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {item?.art_nombre}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item?.art_um}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item?.art_precio}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item?.art_unidad}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item?.art_status}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item?.art_comision}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item?.art_divisa}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg md:rounded-xl"
          onClick={() => handleAddModal(item, openModal)}
        >
          <RiEdit2Line fontSize={20} />
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg md:rounded-xl ml-4"
          onClick={() => viewAlert(item)}
        >
          <RiDeleteBin5Line fontSize={20} />
        </button>
      </td>
    </tr>
  );
};

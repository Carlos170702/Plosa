import { useDispatch } from "react-redux";
import { clearUser } from "../store/recods/recordsSlices";
import { useLocation, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const distpatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="flex p-2 bg-Nav items-center w-full">
      <div className="w-7">
        <img
          src="http://201.151.250.100/Server94/Plosa/Catalogos/assets/Plosa.png"
          alt="logo"
          className="w-max "
        />
      </div>
      <h1 className="flex-1 text-center text-yellow-50 font-bold tracking-wider text-2xl">
        Comercializadora Ochoa
      </h1>
      {location.pathname !== "/" && (
        <nav>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              distpatch(clearUser());
              navigate("/", { replace: true });
            }}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};

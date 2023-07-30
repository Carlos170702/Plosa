import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import { useLogin } from "./hooks/useLogin";

export const Login = () => {
  const { user, loading, onSubmit, handleUser, handleActive } = useLogin();

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      {/* muestra carga de el login */}
      {loading && (
        <div className="w-screen h-screen bg-warning fixed z-10 flex justify-center items-center flex-col">
          <p className="text-white font-bold mb-2 tracking-wider">Espere</p>
          <Loader />
        </div>
      )}

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Bienvenido a Comercializadora Ochoa
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión en tu cuenta para continuar.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="backdrop-blur-sm bg-black/20 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nombre de usuario
                </label>
                <div className="mt-1">
                  <input
                    name="user"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-500 sm:text-sm"
                    onChange={handleUser}
                    value={user?.user}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    value={user?.password}
                    onChange={handleUser}
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={user.active}
                    onChange={() => handleActive()}
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Recordarme
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={onSubmit}
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

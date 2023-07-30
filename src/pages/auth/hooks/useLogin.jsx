import { useNavigate } from "react-router-dom";
import { getData } from "../../../api/getData";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../store/recods/recordsSlices";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const [user, Setuser] = useState({
    user: "",
    password: "",
    active: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: dataUser } = useSelector((state) => state.records);

  // checar si esta logueado no dejar que regrese a el login
  useEffect(() => {
    Object.keys(dataUser).length > 0 && navigate("./registros");
  }, []);

  // checa si ahi un usuario guardado en el localstorache para que se agrege alos inputs automaticamente
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const dataUser = JSON.parse(localStorage.getItem("user"));
      Setuser({
        user: dataUser,
        password: "",
        active: true,
      });
    }
  }, []);

  // vaidar si existe o no
  const login = async (userName, password) => {
    setLoading(true);
    try {
      const res = await getData(
        "GET",
        `http://localhost:4000/api/clients/${userName}`
        // "http://localhost:4000/api/clients/MASTER"
      );

      if (!res.error && res?.message[0].usu_password === password) {
        navigate("./Registros", { replace: true });
        dispatch(addUser(res.message[0]));

        user.active
          ? localStorage.setItem("user", JSON.stringify(userName))
          : localStorage.clear();
        setLoading(false);
      } else {
        toast.error("Usuario o Contraseña incorrectos");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Usuario o Contraseña incorrectos");
      setLoading(false);
    }
  };

  // loguearse
  const onSubmit = async (e) => {
    e.preventDefault();
    login(user.user, user.password);
  };

  /// obtener datos de los inputs
  const handleUser = (e) => {
    Setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // cambiar el estado de guardar contraseña
  const handleActive = () => {
    Setuser({
      ...user,
      active: !user.active,
    });
  };

  return {
    // *properties
    user,
    loading,
    // *methods
    onSubmit,
    handleUser,
    handleActive,
  };
};

// codigo del onSubmin
// try {
//   const res = await getData(
//     "GET",
//     `http://localhost:4000/api/clients/${user?.user}`
//   );

//   if (!res.error && res?.message[0].usu_password === user.password) {
//     navigate("./Registros", { replace: false });
//     dispatch(addUser(res.message[0]));

//     user.active
//       ? localStorage.setItem("user", JSON.stringify(user))
//       : localStorage.clear();
//   } else {
//     toast.error("Usuario o Contraseña incorrectos");
//   }
// } catch (error) {
//   console.log(error);
// }

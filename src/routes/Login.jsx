import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  const { user, signIn, signOut, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogin = () => {
    setUser(true);
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <h2>{user ? "Conectado" : "Desconectado"}</h2>
      <button onClick={handleClickLogin}>iniciar sesion</button>
      {/* {user ? (
        <button className="btn btn-danger" onClick={signOut}>
          Cerrar sesión
        </button>
      ) : (
        <button className="btn btn-primary" onClick={signIn}>
          Iniciar sesión
        </button>
      )} */}
    </div>
  );
};

export default Login;

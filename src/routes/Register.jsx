import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserProvider";

// comdandorafce para hacer un archivo/componente basico de react
const Register = () => {
  const [email, setEmail] = useState("manolito34@gmail.com");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("procesando form: " + email, password);
    try {
      await registerUser(email, password);
      console.log("usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">registrar</button>
      </form>
    </>
  );
};

export default Register;

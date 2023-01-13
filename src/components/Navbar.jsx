import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserProvider, { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={() => setUser(false)}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
};

export default Navbar;

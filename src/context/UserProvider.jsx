import { createContext, useState } from "react";

//Aca se crea el contexto pra compartier la informacion y props entre componentes, luego este componente se importa idealmente en el main
export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  // const signIn = () => {
  //   setUser(true);
  // };

  // const signOut = () => {
  //   setUser(false);
  // };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

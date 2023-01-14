import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

//Aca se crea el contexto pra compartier la informacion y props entre componentes, luego este componente se importa idealmente en el main
export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });

    return () => unsuscribe();
  }, []);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

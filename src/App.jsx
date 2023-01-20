import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutContainerForm from "./components/layout/LayoutContainerForm";

import Navbar from "./components/Navbar";
import RequiereAuth from "./components/layout/LayoutRequiereAuth";
import { UserContext } from "./context/UserProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import LayoutRequiereAuth from "./components/layout/LayoutRequiereAuth";
import Perfil from "./components/Perfil";
import NotFound from "./routes/NotFound";
import LayoutRedirect from "./components/layout/LayoutRedirect";
// import NotFound from "./routes/NotFound";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LayoutRequiereAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* aca se pasa el nanoid comp params  */}
        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

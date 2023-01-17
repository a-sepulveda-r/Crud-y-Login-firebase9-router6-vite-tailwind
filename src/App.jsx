import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutContainerForm from "./components/LayoutContainerForm";

import Navbar from "./components/Navbar";
import RequiereAuth from "./components/RequiereAuth";
import { UserContext } from "./context/UserProvider";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
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
        <Route
          path="/"
          element={
            <RequiereAuth>
              <Home />
            </RequiereAuth>
          }
        />
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

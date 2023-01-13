import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RequiereAuth from "./components/RequiereAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";
// import NotFound from "./routes/NotFound";

const App = () => {
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

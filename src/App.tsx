import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Principal from "./pages/Principal/Principal";
import Formulario from "./pages/Principal/Formulario";
import Mis_cursos from "./pages/Principal/Miscursos";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/principal" element={<Principal />} />

      <Route path="/formulario" element={<Formulario />} />
      
      <Route path="/principal/miscursos" element={<Mis_cursos/>} />
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

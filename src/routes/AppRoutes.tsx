import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/admin/Dashboard";
import Formulario from "../pages/admin/Formulario";
import AsignacionHorario from "../pages/admin/AsignacionHorario";
import Miscursos from "../pages/admin/Miscursos";

import HomeUsuario from "../pages/usuario/HomeUsuario";
import Cursos from "../pages/usuario/Cursos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/formulario" element={<Formulario />} />
      <Route path="/admin/asignacion" element={<AsignacionHorario />} />
      <Route path="/admin/cursos" element={<Miscursos />} />

      <Route path="/usuario" element={<HomeUsuario />} />
      <Route path="/usuario/cursos" element={<Cursos />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

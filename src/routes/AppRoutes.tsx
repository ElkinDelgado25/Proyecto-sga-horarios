import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/admin/Dashboard";
import DashboardNew from "../pages/admin/DashboardNew";
import Formulario from "../pages/admin/Formulario";
import AsignacionHorario from "../pages/admin/AsignacionHorario";
import Miscursos from "../pages/admin/Miscursos";

import HomeUsuario from "../pages/usuario/HomeUsuario";
import Cursos from "../pages/usuario/Cursos";
import Horarios from "../pages/usuario/Horarios";
import Notificaciones from "../pages/usuario/Notificaciones";
import Miperfil from "../pages/usuario/Miperfil";

import AppDemo from "../AppDemo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Nueva ruta demo con componentes integrados */}
<Route path="/login" element={<AppDemo />} />
        <Route path="/" element={<AppDemo />} />

      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/dashboard-new" element={<DashboardNew />} />
      <Route path="/admin/formulario" element={<Formulario />} />
      <Route path="/admin/asignacion" element={<AsignacionHorario />} />
      <Route path="/admin/cursos" element={<Miscursos />} />

      <Route path="/usuario" element={<HomeUsuario />} />
      <Route path="/usuario/cursos" element={<Cursos />} />
      <Route path="/usuario/horarios" element={<Horarios />} />
      <Route path="/usuario/notificaciones" element={<Notificaciones />} />
      <Route path="/usuario/perfil" element={<Miperfil />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

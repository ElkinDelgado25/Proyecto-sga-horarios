import { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { MisCursos } from "../../components/MisCursos/MisCursos";
import { AsignacionHorarios } from "../../components/AsignacionHorarios/AsignacionHorarios";
import type { UserRole } from "../../types";

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState("dashboard");
  
  // Este es un ejemplo - en producción vendría del AuthContext
  const userRole: UserRole = "administrador";
  const userName = "Admin Usuario";

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard userRole={userRole} onNavigate={setCurrentView} />;
      case "mis-cursos":
        return <MisCursos />;
      case "asignacion":
        return <AsignacionHorarios />;
      case "horarios":
        return (
          <div style={{ padding: "1.5rem" }}>
            <h1>Horarios</h1>
            <p>Vista de horarios (por implementar)</p>
          </div>
        );
      case "notificaciones":
        return (
          <div style={{ padding: "1.5rem" }}>
            <h1>Notificaciones</h1>
            <p>Vista de notificaciones (por implementar)</p>
          </div>
        );
      case "usuarios":
        return (
          <div style={{ padding: "1.5rem" }}>
            <h1>Gestión de Usuarios</h1>
            <p>Vista de gestión de usuarios (por implementar)</p>
          </div>
        );
      case "facultades":
        return (
          <div style={{ padding: "1.5rem" }}>
            <h1>Facultades y Materias</h1>
            <p>Vista de facultades (por implementar)</p>
          </div>
        );
      case "preferencias":
        return (
          <div style={{ padding: "1.5rem" }}>
            <h1>Preferencias Docente</h1>
            <p>Vista de preferencias (por implementar)</p>
          </div>
        );
      default:
        return <Dashboard userRole={userRole} onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} userRole={userRole} userName={userName}>
      {renderView()}
    </Layout>
  );
}

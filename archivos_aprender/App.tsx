import { useState } from "react";
import { Login } from "./components/Login";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { MisCursos } from "./components/MisCursos";
import { ConsultaHorarios } from "./components/ConsultaHorarios";
import { GestionUsuarios } from "./components/GestionUsuarios";
import { GestionFacultades } from "./components/GestionFacultades";
import { AsignacionHorarios } from "./components/AsignacionHorarios";
import { PreferenciasDocente } from "./components/PreferenciasDocente";
import { Notificaciones } from "./components/Notificaciones";
import { Perfil } from "./components/Perfil";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("login");
  const [userRole, setUserRole] = useState<"estudiante" | "docente" | "administrador">("estudiante");
  const [userName, setUserName] = useState<string>("");

  const handleLogin = (role: "estudiante" | "docente" | "administrador", name: string) => {
    setUserRole(role);
    setUserName(name);
    setCurrentView("dashboard");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case "login":
        return <Login onLogin={handleLogin} />;
      case "dashboard":
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />;
      case "mis-cursos":
        return <MisCursos />;
      case "horarios":
        return <ConsultaHorarios userRole={userRole} />;
      case "usuarios":
        return <GestionUsuarios />;
      case "facultades":
        return <GestionFacultades />;
      case "asignacion":
        return <AsignacionHorarios />;
      case "preferencias":
        return <PreferenciasDocente />;
      case "notificaciones":
        return <Notificaciones />;
      case "perfil":
      case "configuracion":
        return <Perfil userName={userName} userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />;
    }
  };

  if (currentView === "login") {
    return (
      <>
        {renderContent()}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Layout currentView={currentView} onNavigate={handleNavigate} userRole={userRole} userName={userName}>
        {renderContent()}
      </Layout>
      <Toaster />
    </>
  );
}

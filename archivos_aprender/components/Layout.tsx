import { useState } from "react";
import { Home, Calendar, Users, BookOpen, Clock, Bell, Settings, Menu, X, ChevronDown, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: "estudiante" | "docente" | "administrador";
  userName: string;
}

export function Layout({ children, currentView, onNavigate, userRole, userName }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { id: "dashboard", label: "Inicio", icon: Home },
      { id: "mis-cursos", label: "Mis cursos", icon: BookOpen },
      { id: "horarios", label: "Horarios", icon: Calendar },
      { id: "notificaciones", label: "Notificaciones", icon: Bell },
    ];

    if (userRole === "administrador") {
      return [
        ...commonItems,
        { id: "usuarios", label: "Usuarios", icon: Users },
        { id: "facultades", label: "Facultades y Materias", icon: GraduationCap },
        { id: "asignacion", label: "Asignación de Horarios", icon: Clock },
      ];
    }

    if (userRole === "docente") {
      return [
        ...commonItems,
        { id: "preferencias", label: "Preferencias", icon: Settings },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar - Estilo Moodle */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="hidden md:inline">Aula Virtual</span>
            </div>
          </div>

          {/* Navigation Menu - Top */}
          <nav className="hidden lg:flex items-center gap-1">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => onNavigate("dashboard")}
            >
              Página Principal
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => onNavigate("dashboard")}
            >
              Área personal
            </Button>
            <Button
              variant="ghost"
              className={`text-white hover:bg-white/10 ${currentView === "mis-cursos" ? "bg-red-600 hover:bg-red-700" : ""}`}
              onClick={() => onNavigate("mis-cursos")}
            >
              Mis cursos
            </Button>
            
            {userRole === "administrador" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Administración <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onNavigate("usuarios")}>
                    <Users className="mr-2 h-4 w-4" />
                    Usuarios
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("facultades")}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Facultades
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("asignacion")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Asignación
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white/20 text-white">
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm max-w-[120px] truncate">{userName}</span>
                  <ChevronDown className="h-4 w-4 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-3 border-b">
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
                </div>
                <DropdownMenuItem onClick={() => onNavigate("perfil")} className="cursor-pointer py-2">
                  <Settings className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate("configuracion")} className="cursor-pointer py-2">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate("notificaciones")} className="cursor-pointer py-2">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </DropdownMenuItem>
                <div className="border-t my-1"></div>
                <DropdownMenuItem onClick={() => onNavigate("login")} className="cursor-pointer py-2 text-red-600 focus:text-red-600">
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Colapsable - Izquierda */}
        <aside
          className={`
            bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto
            ${sidebarOpen ? "w-64" : "w-0"}
            lg:w-64
          `}
        >
          <div className={`p-4 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <div className="mb-4">
              <h3 className="text-gray-500 text-xs uppercase mb-2">Navegación</h3>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onNavigate(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}

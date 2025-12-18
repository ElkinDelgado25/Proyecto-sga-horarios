import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Users, BookOpen, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

interface DashboardProps {
  userRole: "estudiante" | "docente" | "administrador";
  onNavigate: (view: string) => void;
}

export function Dashboard({ userRole, onNavigate }: DashboardProps) {
  const getStudentStats = () => [
    { title: "Clases de Hoy", value: "5", icon: Calendar, color: "text-blue-600" },
    { title: "Próxima Clase", value: "14:00", icon: Clock, color: "text-green-600" },
    { title: "Materias Inscritas", value: "8", icon: BookOpen, color: "text-purple-600" },
    { title: "Notificaciones", value: "3", icon: AlertCircle, color: "text-orange-600" },
  ];

  const getDocenteStats = () => [
    { title: "Clases de Hoy", value: "4", icon: Calendar, color: "text-blue-600" },
    { title: "Materias Asignadas", value: "6", icon: BookOpen, color: "text-purple-600" },
    { title: "Estudiantes Total", value: "145", icon: Users, color: "text-green-600" },
    { title: "Notificaciones", value: "2", icon: AlertCircle, color: "text-orange-600" },
  ];

  const getAdminStats = () => [
    { title: "Usuarios Activos", value: "342", icon: Users, color: "text-blue-600" },
    { title: "Horarios Pendientes", value: "12", icon: Clock, color: "text-orange-600" },
    { title: "Facultades", value: "8", icon: BookOpen, color: "text-purple-600" },
    { title: "Aulas Disponibles", value: "45", icon: CheckCircle, color: "text-green-600" },
  ];

  const stats =
    userRole === "estudiante"
      ? getStudentStats()
      : userRole === "docente"
      ? getDocenteStats()
      : getAdminStats();

  const todayClasses =
    userRole === "estudiante"
      ? [
          { time: "08:00 - 10:00", subject: "Cálculo Diferencial", room: "Aula 301", teacher: "Dr. García" },
          { time: "10:00 - 12:00", subject: "Programación I", room: "Lab 102", teacher: "Ing. Martínez" },
          { time: "14:00 - 16:00", subject: "Física I", room: "Aula 205", teacher: "Dra. López" },
        ]
      : [
          { time: "08:00 - 10:00", subject: "Programación I", room: "Lab 102", students: "32" },
          { time: "10:00 - 12:00", subject: "Programación II", room: "Lab 103", students: "28" },
          { time: "14:00 - 16:00", subject: "Base de Datos", room: "Lab 101", students: "30" },
        ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Panel de inicio</h1>
        <p className="text-gray-600 mt-1">Bienvenido al Aula Virtual</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Clases de Hoy</CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((clase, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{clase.time}</p>
                    <p className="mt-1">{clase.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {clase.room} {userRole === "estudiante" ? `• ${clase.teacher}` : `• ${clase.students} estudiantes`}
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate("horarios")}>
              Ver Horario Completo
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>Acciones frecuentes según tu rol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("horarios")}>
                <Calendar className="mr-2 h-4 w-4" />
                Consultar Horarios
              </Button>
              {userRole === "administrador" && (
                <>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("usuarios")}>
                    <Users className="mr-2 h-4 w-4" />
                    Gestión de Usuarios
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("asignacion")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Asignar Horarios
                  </Button>
                </>
              )}
              {userRole === "docente" && (
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("preferencias")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Configurar Preferencias
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate("notificaciones")}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Ver Notificaciones
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

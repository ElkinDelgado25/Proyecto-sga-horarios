import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bell, CheckCheck, FileText, AlertCircle, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Notificacion {
  id: number;
  tipo: "cambio" | "incidencia" | "sistema" | "reporte";
  titulo: string;
  descripcion: string;
  fecha: string;
  leido: boolean;
}

export function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: 1,
      tipo: "cambio",
      titulo: "Cambio de Aula",
      descripcion: "La clase de Programación I del día Lunes se movió de Lab 102 a Lab 103",
      fecha: "2025-10-09 10:30",
      leido: false,
    },
    {
      id: 2,
      tipo: "sistema",
      titulo: "Mantenimiento Programado",
      descripcion: "El sistema estará en mantenimiento el domingo 13 de octubre de 2:00 AM a 6:00 AM",
      fecha: "2025-10-08 15:00",
      leido: false,
    },
    {
      id: 3,
      tipo: "incidencia",
      titulo: "Conflicto de Horario Detectado",
      descripcion: "Se detectó un conflicto entre dos clases asignadas al Aula 301 el martes a las 10:00",
      fecha: "2025-10-08 09:15",
      leido: false,
    },
    {
      id: 4,
      tipo: "reporte",
      titulo: "Reporte Mensual Disponible",
      descripcion: "El reporte de asistencia de septiembre está listo para descargar",
      fecha: "2025-10-07 14:20",
      leido: true,
    },
    {
      id: 5,
      tipo: "cambio",
      titulo: "Cambio de Docente",
      descripcion: "El Dr. García será reemplazado por la Dra. Fernández en Cálculo Diferencial el viernes",
      fecha: "2025-10-06 11:45",
      leido: true,
    },
  ]);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "cambio":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "incidencia":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "reporte":
        return <FileText className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTipoBadge = (tipo: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      cambio: "default",
      incidencia: "destructive",
      sistema: "secondary",
      reporte: "outline",
    };
    return variants[tipo] || "outline";
  };

  const handleMarkAsRead = (id: number) => {
    setNotificaciones(notificaciones.map((n) => (n.id === id ? { ...n, leido: true } : n)));
    toast.success("Notificación marcada como leída");
  };

  const handleMarkAllAsRead = () => {
    setNotificaciones(notificaciones.map((n) => ({ ...n, leido: true })));
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  const handleGenerateReport = () => {
    toast.success("Generando reporte...");
  };

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leido).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-gray-800">Notificaciones y Reportes</h1>
          <p className="text-gray-600 mt-1">
            {notificacionesNoLeidas} notificaciones sin leer
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generar Reporte
          </Button>
          {notificacionesNoLeidas > 0 && (
            <Button onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Marcar Todo como Leído
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {notificaciones.map((notificacion) => (
          <Card key={notificacion.id} className={notificacion.leido ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getTipoIcon(notificacion.tipo)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base">{notificacion.titulo}</h3>
                        <Badge variant={getTipoBadge(notificacion.tipo)}>{notificacion.tipo}</Badge>
                        {!notificacion.leido && (
                          <Badge variant="destructive" className="text-xs">
                            Nuevo
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{notificacion.descripcion}</p>
                      <p className="text-sm text-gray-500 mt-2">{notificacion.fecha}</p>
                    </div>
                    {!notificacion.leido && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notificacion.id)}>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Marcar como leído
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notificaciones.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3>No hay notificaciones</h3>
            <p className="text-gray-600 mt-2">Todas las notificaciones están al día</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

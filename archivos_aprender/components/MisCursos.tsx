import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MoreVertical, Grid3x3, List } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  carrera: string;
  periodo: string;
  horarios: string[];
  color: string;
  pattern: "squares" | "triangles" | "circles";
  aula: string;
}

const cursosData: Curso[] = [
  {
    id: 1,
    nombre: "ADMINISTRACIÓN DE BASES DE DATOS DISTRIBUIDAS",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Lunes 9:00am - 11:00am", "Miércoles 9:00am - 11:00am"],
    aula: "Lab 301",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    pattern: "squares"
  },
  {
    id: 2,
    nombre: "ADMINISTRACIÓN DE SERVIDORES / SOFTWARE 2024",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Martes 14:00pm - 16:00pm", "Jueves 14:00pm - 16:00pm"],
    aula: "Lab 205",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    pattern: "triangles"
  },
  {
    id: 3,
    nombre: "APLICACIONES PARA EL CLIENTE WEB / SOFTWARE",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Lunes 14:00pm - 17:00pm", "Viernes 9:00am - 12:00pm"],
    aula: "Lab 102",
    color: "bg-gradient-to-br from-purple-500 to-purple-700",
    pattern: "squares"
  },
  {
    id: 4,
    nombre: "ESTADÍSTICA PARA INGENIERÍA / SOFTWARE 2024",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Miércoles 16:00pm - 18:00pm", "Viernes 14:00pm - 16:00pm"],
    aula: "Aula 303",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    pattern: "squares"
  },
];

const PatternOverlay = ({ pattern, color }: { pattern: string; color: string }) => {
  if (pattern === "squares") {
    return (
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-4 gap-2 h-full p-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white/20 rounded-sm"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (pattern === "triangles") {
    return (
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="triangles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,40 0,40" fill="white" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#triangles)" />
        </svg>
      </div>
    );
  }

  return null;
};

export function MisCursos() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-red-600 mb-6">Mis cursos</h1>
        
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-red-600 mb-4">Vista general de curso</h2>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Select defaultValue="todos">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="en-progreso">En progreso</SelectItem>
                <SelectItem value="completados">Completados</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">Buscar</Button>

            <Select defaultValue="nombre">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nombre">Ordenar por nombre de curso</SelectItem>
                <SelectItem value="recientes">Más recientes</SelectItem>
                <SelectItem value="antiguos">Más antiguos</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="tarjeta">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Vista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tarjeta">
                  <div className="flex items-center">
                    <Grid3x3 className="mr-2 h-4 w-4" />
                    Tarjeta
                  </div>
                </SelectItem>
                <SelectItem value="lista">
                  <div className="flex items-center">
                    <List className="mr-2 h-4 w-4" />
                    Lista
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Curso Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursosData.map((curso) => (
          <Card key={curso.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            {/* Header del curso con patrón */}
            <div className={`relative h-32 ${curso.color} p-4 flex items-end`}>
              <PatternOverlay pattern={curso.pattern} color={curso.color} />
              <div className="relative z-10 text-white w-full">
                <h3 className="text-sm line-clamp-2">{curso.nombre}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-white/20 z-10"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver curso</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuItem>Ocultar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contenido del curso */}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                {curso.codigo} {curso.carrera}
              </p>
              
              <div className="space-y-2">
                {curso.horarios.map((horario, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                    <span className="text-gray-700">{horario}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-sm mt-3 pt-2 border-t border-gray-200">
                  <span className="text-gray-500">Aula:</span>
                  <span className="text-gray-700">{curso.aula}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

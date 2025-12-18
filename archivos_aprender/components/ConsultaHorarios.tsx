import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Download, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ConsultaHorariosProps {
  userRole: "estudiante" | "docente" | "administrador";
}

export function ConsultaHorarios({ userRole }: ConsultaHorariosProps) {
  const [selectedSemester, setSelectedSemester] = useState("2025-1");

  const horarios = [
    {
      dia: "Lunes",
      hora: "08:00 - 10:00",
      materia: "Cálculo Diferencial",
      aula: "Aula 301",
      docente: "Dr. García",
      paralelo: "A",
    },
    {
      dia: "Lunes",
      hora: "10:00 - 12:00",
      materia: "Programación I",
      aula: "Lab 102",
      docente: "Ing. Martínez",
      paralelo: "B",
    },
    {
      dia: "Lunes",
      hora: "14:00 - 16:00",
      materia: "Física I",
      aula: "Aula 205",
      docente: "Dra. López",
      paralelo: "A",
    },
    {
      dia: "Martes",
      hora: "08:00 - 10:00",
      materia: "Álgebra Lineal",
      aula: "Aula 302",
      docente: "Dr. Ramírez",
      paralelo: "A",
    },
    {
      dia: "Martes",
      hora: "10:00 - 12:00",
      materia: "Química General",
      aula: "Lab 201",
      docente: "Dra. Mendoza",
      paralelo: "C",
    },
    {
      dia: "Miércoles",
      hora: "08:00 - 10:00",
      materia: "Cálculo Diferencial",
      aula: "Aula 301",
      docente: "Dr. García",
      paralelo: "A",
    },
    {
      dia: "Miércoles",
      hora: "14:00 - 16:00",
      materia: "Inglés I",
      aula: "Aula 105",
      docente: "Prof. Smith",
      paralelo: "B",
    },
    {
      dia: "Jueves",
      hora: "10:00 - 12:00",
      materia: "Programación I",
      aula: "Lab 102",
      docente: "Ing. Martínez",
      paralelo: "B",
    },
    {
      dia: "Viernes",
      hora: "08:00 - 10:00",
      materia: "Física I",
      aula: "Aula 205",
      docente: "Dra. López",
      paralelo: "A",
    },
  ];

  const handleDownloadPDF = () => {
    toast.success("Descargando horario en PDF...");
    // Aquí iría la lógica real de descarga PDF
  };

  const handleGenerateReport = () => {
    toast.success("Generando reporte de incidencias...");
    // Aquí iría la lógica real de generación de reportes
  };

  const handleRefresh = () => {
    toast.success("Horarios actualizados");
    // Aquí iría la lógica real de actualización
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Consulta de Horarios</h1>
        <p className="text-gray-600 mt-1">Visualiza y descarga tu horario académico</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Tabla de Horarios</CardTitle>
              <CardDescription>Semestre {selectedSemester}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Seleccionar periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-1">2025-1</SelectItem>
                  <SelectItem value="2024-2">2024-2</SelectItem>
                  <SelectItem value="2024-1">2024-1</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Día</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Aula</TableHead>
                  <TableHead>Docente</TableHead>
                  <TableHead>Paralelo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horarios.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.dia}</TableCell>
                    <TableCell>{item.hora}</TableCell>
                    <TableCell>{item.materia}</TableCell>
                    <TableCell>{item.aula}</TableCell>
                    <TableCell>{item.docente}</TableCell>
                    <TableCell>{item.paralelo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
            <Button variant="outline" onClick={handleGenerateReport}>
              <FileText className="mr-2 h-4 w-4" />
              Generar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

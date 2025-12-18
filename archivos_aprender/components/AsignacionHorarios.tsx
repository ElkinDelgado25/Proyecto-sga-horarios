import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Clock, Save, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function AsignacionHorarios() {
  const [horariosAsignados, setHorariosAsignados] = useState([
    {
      id: 1,
      materia: "Programación I",
      docente: "Ing. Martínez",
      paralelo: "B",
      aula: "Lab 102",
      dia: "Lunes",
      horaInicio: "10:00",
      horaFin: "12:00",
    },
    {
      id: 2,
      materia: "Cálculo Diferencial",
      docente: "Dr. García",
      paralelo: "A",
      aula: "Aula 301",
      dia: "Lunes",
      horaInicio: "08:00",
      horaFin: "10:00",
    },
  ]);

  const [formData, setFormData] = useState({
    materia: "",
    docente: "",
    paralelo: "",
    aula: "",
    dia: "",
    horaInicio: "",
    horaFin: "",
  });

  const materias = ["Cálculo Diferencial", "Programación I", "Física I", "Álgebra Lineal", "Química General", "Base de Datos"];
  const docentes = ["Dr. García", "Ing. Martínez", "Dra. López", "Dr. Ramírez", "Dra. Mendoza"];
  const aulas = ["Aula 301", "Aula 302", "Lab 101", "Lab 102", "Lab 103", "Aula 205"];
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const horas = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const handleSaveHorario = () => {
    if (!formData.materia || !formData.docente || !formData.dia || !formData.horaInicio || !formData.horaFin) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setHorariosAsignados([
      ...horariosAsignados,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    toast.success("Horario asignado correctamente");
    setFormData({
      materia: "",
      docente: "",
      paralelo: "",
      aula: "",
      dia: "",
      horaInicio: "",
      horaFin: "",
    });
  };

  const handleDeleteHorario = (id: number) => {
    setHorariosAsignados(horariosAsignados.filter((h) => h.id !== id));
    toast.success("Horario eliminado correctamente");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Asignación de Horarios</h1>
        <p className="text-gray-600 mt-1">Asigna materias, docentes y aulas a horarios específicos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de Asignación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Nuevo Horario
            </CardTitle>
            <CardDescription>Completa los datos para asignar un horario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Materia</Label>
              <Select value={formData.materia} onValueChange={(value) => setFormData({ ...formData, materia: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>
                <SelectContent>
                  {materias.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Docente</Label>
              <Select value={formData.docente} onValueChange={(value) => setFormData({ ...formData, docente: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar docente" />
                </SelectTrigger>
                <SelectContent>
                  {docentes.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Paralelo</Label>
                <Select value={formData.paralelo} onValueChange={(value) => setFormData({ ...formData, paralelo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Paralelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Aula</Label>
                <Select value={formData.aula} onValueChange={(value) => setFormData({ ...formData, aula: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Aula" />
                  </SelectTrigger>
                  <SelectContent>
                    {aulas.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Día</Label>
              <Select value={formData.dia} onValueChange={(value) => setFormData({ ...formData, dia: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar día" />
                </SelectTrigger>
                <SelectContent>
                  {dias.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Hora Inicio</Label>
                <Select value={formData.horaInicio} onValueChange={(value) => setFormData({ ...formData, horaInicio: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Inicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {horas.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Hora Fin</Label>
                <Select value={formData.horaFin} onValueChange={(value) => setFormData({ ...formData, horaFin: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Fin" />
                  </SelectTrigger>
                  <SelectContent>
                    {horas.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full" onClick={handleSaveHorario}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Horario
            </Button>
          </CardContent>
        </Card>

        {/* Tabla de Horarios Asignados */}
        <Card>
          <CardHeader>
            <CardTitle>Horarios Asignados</CardTitle>
            <CardDescription>{horariosAsignados.length} horarios configurados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Materia</TableHead>
                    <TableHead>Día/Hora</TableHead>
                    <TableHead>Docente</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {horariosAsignados.map((horario) => (
                    <TableRow key={horario.id}>
                      <TableCell>
                        <div>
                          <p>{horario.materia}</p>
                          <p className="text-sm text-gray-500">
                            {horario.paralelo} - {horario.aula}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{horario.dia}</p>
                          <p className="text-sm text-gray-500">
                            {horario.horaInicio} - {horario.horaFin}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{horario.docente}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteHorario(horario.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

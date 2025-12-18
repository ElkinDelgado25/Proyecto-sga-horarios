import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Save, BookOpen } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function PreferenciasDocente() {
  const materiasDisponibles = [
    { id: 1, nombre: "Programación I", asignada: true },
    { id: 2, nombre: "Programación II", asignada: true },
    { id: 3, nombre: "Base de Datos", asignada: true },
    { id: 4, nombre: "Estructuras de Datos", asignada: false },
    { id: 5, nombre: "Ingeniería de Software", asignada: false },
    { id: 6, nombre: "Desarrollo Web", asignada: false },
  ];

  const [materias, setMaterias] = useState(materiasDisponibles);
  const [horarioPreferencia, setHorarioPreferencia] = useState("manana");
  const [diasPreferidos, setDiasPreferidos] = useState<string[]>(["lunes", "miercoles", "viernes"]);

  const dias = [
    { id: "lunes", label: "Lunes" },
    { id: "martes", label: "Martes" },
    { id: "miercoles", label: "Miércoles" },
    { id: "jueves", label: "Jueves" },
    { id: "viernes", label: "Viernes" },
  ];

  const handleToggleDia = (diaId: string) => {
    setDiasPreferidos((prev) => (prev.includes(diaId) ? prev.filter((d) => d !== diaId) : [...prev, diaId]));
  };

  const handleSavePreferences = () => {
    toast.success("Preferencias guardadas correctamente");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Preferencias del Docente</h1>
        <p className="text-gray-600 mt-1">Configura tus preferencias de materias y horarios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Materias Asignadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Materias Disponibles
            </CardTitle>
            <CardDescription>Selecciona las materias que prefieres dictar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materias.map((materia) => (
                <div key={materia.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>{materia.nombre}</p>
                    {materia.asignada && <p className="text-sm text-green-600 mt-1">Actualmente asignada</p>}
                  </div>
                  <Checkbox
                    checked={materia.asignada}
                    onCheckedChange={(checked) => {
                      setMaterias(materias.map((m) => (m.id === materia.id ? { ...m, asignada: checked as boolean } : m)));
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferencias de Horario */}
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Horario</CardTitle>
            <CardDescription>Indica tu disponibilidad y preferencias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Horario Preferido</Label>
              <RadioGroup value={horarioPreferencia} onValueChange={setHorarioPreferencia}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="manana" id="manana" />
                  <Label htmlFor="manana" className="flex-1 cursor-pointer">
                    <p>Mañana</p>
                    <p className="text-sm text-gray-500">07:00 - 13:00</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="tarde" id="tarde" />
                  <Label htmlFor="tarde" className="flex-1 cursor-pointer">
                    <p>Tarde</p>
                    <p className="text-sm text-gray-500">13:00 - 19:00</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="mixto" id="mixto" />
                  <Label htmlFor="mixto" className="flex-1 cursor-pointer">
                    <p>Mixto</p>
                    <p className="text-sm text-gray-500">Sin preferencia</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Días Preferidos</Label>
              <div className="space-y-2">
                {dias.map((dia) => (
                  <div key={dia.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={dia.id}
                      checked={diasPreferidos.includes(dia.id)}
                      onCheckedChange={() => handleToggleDia(dia.id)}
                    />
                    <Label htmlFor={dia.id} className="flex-1 cursor-pointer">
                      {dia.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={handleSavePreferences}>
              <Save className="mr-2 h-4 w-4" />
              Guardar Preferencias
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resumen de Preferencias */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumen de Preferencias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Materias Seleccionadas</p>
              <p className="text-2xl">{materias.filter((m) => m.asignada).length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Horario Preferido</p>
              <p className="text-2xl capitalize">{horarioPreferencia}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Días Disponibles</p>
              <p className="text-2xl">{diasPreferidos.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

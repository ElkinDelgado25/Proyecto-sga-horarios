import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookOpen, Pencil, Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";

export function GestionFacultades() {
  const [facultades, setFacultades] = useState([
    { id: 1, nombre: "Ingeniería", carreras: ["Sistemas", "Civil", "Industrial"] },
    { id: 2, nombre: "Ciencias", carreras: ["Matemáticas", "Física", "Química"] },
    { id: 3, nombre: "Medicina", carreras: ["Medicina General", "Enfermería"] },
    { id: 4, nombre: "Administración", carreras: ["Administración de Empresas", "Contabilidad"] },
  ]);

  const [materias, setMaterias] = useState([
    { id: 1, nombre: "Cálculo Diferencial", creditos: 4, facultad: "Ingeniería" },
    { id: 2, nombre: "Programación I", creditos: 4, facultad: "Ingeniería" },
    { id: 3, nombre: "Física I", creditos: 4, facultad: "Ciencias" },
    { id: 4, nombre: "Álgebra Lineal", creditos: 3, facultad: "Ingeniería" },
    { id: 5, nombre: "Química General", creditos: 4, facultad: "Ciencias" },
    { id: 6, nombre: "Base de Datos", creditos: 4, facultad: "Ingeniería" },
  ]);

  const [isFacultadDialogOpen, setIsFacultadDialogOpen] = useState(false);
  const [isMateriaDialogOpen, setIsMateriaDialogOpen] = useState(false);

  const [facultadForm, setFacultadForm] = useState({ nombre: "", carreras: "" });
  const [materiaForm, setMateriaForm] = useState({ nombre: "", creditos: "", facultad: "" });

  const handleSaveFacultad = () => {
    const carrerasArray = facultadForm.carreras.split(",").map((c) => c.trim());
    setFacultades([...facultades, { id: Date.now(), nombre: facultadForm.nombre, carreras: carrerasArray }]);
    toast.success("Facultad creada correctamente");
    setIsFacultadDialogOpen(false);
    setFacultadForm({ nombre: "", carreras: "" });
  };

  const handleDeleteFacultad = (id: number) => {
    setFacultades(facultades.filter((f) => f.id !== id));
    toast.success("Facultad eliminada correctamente");
  };

  const handleSaveMateria = () => {
    setMaterias([
      ...materias,
      {
        id: Date.now(),
        nombre: materiaForm.nombre,
        creditos: parseInt(materiaForm.creditos),
        facultad: materiaForm.facultad,
      },
    ]);
    toast.success("Materia creada correctamente");
    setIsMateriaDialogOpen(false);
    setMateriaForm({ nombre: "", creditos: "", facultad: "" });
  };

  const handleDeleteMateria = (id: number) => {
    setMaterias(materias.filter((m) => m.id !== id));
    toast.success("Materia eliminada correctamente");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Gestión de Facultades y Materias</h1>
        <p className="text-gray-600 mt-1">Administra la estructura académica de la universidad</p>
      </div>

      <Tabs defaultValue="facultades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="facultades">Facultades y Carreras</TabsTrigger>
          <TabsTrigger value="materias">Materias</TabsTrigger>
        </TabsList>

        <TabsContent value="facultades">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Facultades</CardTitle>
                  <CardDescription>{facultades.length} facultades registradas</CardDescription>
                </div>
                <Dialog open={isFacultadDialogOpen} onOpenChange={setIsFacultadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva Facultad
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Facultad</DialogTitle>
                      <DialogDescription>Ingresa los datos de la facultad</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre de la Facultad</Label>
                        <Input
                          id="nombre"
                          value={facultadForm.nombre}
                          onChange={(e) => setFacultadForm({ ...facultadForm, nombre: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="carreras">Carreras (separadas por coma)</Label>
                        <Input
                          id="carreras"
                          placeholder="Ej: Sistemas, Civil, Industrial"
                          value={facultadForm.carreras}
                          onChange={(e) => setFacultadForm({ ...facultadForm, carreras: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsFacultadDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveFacultad}>Guardar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Facultad</TableHead>
                      <TableHead>Carreras</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultades.map((facultad) => (
                      <TableRow key={facultad.id}>
                        <TableCell>{facultad.nombre}</TableCell>
                        <TableCell>{facultad.carreras.join(", ")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteFacultad(facultad.id)}>
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
        </TabsContent>

        <TabsContent value="materias">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Materias</CardTitle>
                  <CardDescription>{materias.length} materias registradas</CardDescription>
                </div>
                <Dialog open={isMateriaDialogOpen} onOpenChange={setIsMateriaDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Nueva Materia
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Materia</DialogTitle>
                      <DialogDescription>Ingresa los datos de la materia</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="nombreMateria">Nombre de la Materia</Label>
                        <Input
                          id="nombreMateria"
                          value={materiaForm.nombre}
                          onChange={(e) => setMateriaForm({ ...materiaForm, nombre: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="creditos">Créditos</Label>
                        <Input
                          id="creditos"
                          type="number"
                          value={materiaForm.creditos}
                          onChange={(e) => setMateriaForm({ ...materiaForm, creditos: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="facultadMateria">Facultad</Label>
                        <Select
                          value={materiaForm.facultad}
                          onValueChange={(value) => setMateriaForm({ ...materiaForm, facultad: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar facultad" />
                          </SelectTrigger>
                          <SelectContent>
                            {facultades.map((f) => (
                              <SelectItem key={f.id} value={f.nombre}>
                                {f.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsMateriaDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveMateria}>Guardar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Materia</TableHead>
                      <TableHead>Créditos</TableHead>
                      <TableHead>Facultad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materias.map((materia) => (
                      <TableRow key={materia.id}>
                        <TableCell>{materia.nombre}</TableCell>
                        <TableCell>{materia.creditos}</TableCell>
                        <TableCell>{materia.facultad}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteMateria(materia.id)}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

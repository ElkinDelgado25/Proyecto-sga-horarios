import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { UserPlus, Pencil, Trash2, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

export function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", cedula: "1234567890", rol: "estudiante", facultad: "Ingeniería", carrera: "Sistemas" },
    { id: 2, nombre: "María García", cedula: "0987654321", rol: "docente", facultad: "Ingeniería", carrera: "N/A" },
    { id: 3, nombre: "Carlos López", cedula: "1122334455", rol: "estudiante", facultad: "Ciencias", carrera: "Matemáticas" },
    { id: 4, nombre: "Ana Martínez", cedula: "5544332211", rol: "docente", facultad: "Ciencias", carrera: "N/A" },
    { id: 5, nombre: "Pedro Rodríguez", cedula: "9988776655", rol: "administrador", facultad: "Administración", carrera: "N/A" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    rol: "estudiante",
    facultad: "",
    carrera: "",
  });

  const handleOpenDialog = (user?: any) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        nombre: "",
        cedula: "",
        rol: "estudiante",
        facultad: "",
        carrera: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsuarios(usuarios.map((u) => (u.id === editingUser.id ? { ...formData, id: u.id } : u)));
      toast.success("Usuario actualizado correctamente");
    } else {
      setUsuarios([...usuarios, { ...formData, id: Date.now() }]);
      toast.success("Usuario creado correctamente");
    }
    setIsDialogOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
    toast.success("Usuario eliminado correctamente");
  };

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cedula.includes(searchTerm) ||
      u.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1">Administra estudiantes, docentes y personal</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lista de Usuarios</CardTitle>
              <CardDescription>{filteredUsuarios.length} usuarios registrados</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar usuario..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Nuevo Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
                    <DialogDescription>Completa los datos del usuario</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nombre">Nombre Completo</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cedula">Cédula</Label>
                      <Input
                        id="cedula"
                        value={formData.cedula}
                        onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rol">Rol</Label>
                      <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="estudiante">Estudiante</SelectItem>
                          <SelectItem value="docente">Docente</SelectItem>
                          <SelectItem value="administrador">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="facultad">Facultad</Label>
                      <Select value={formData.facultad} onValueChange={(value) => setFormData({ ...formData, facultad: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                          <SelectItem value="Ciencias">Ciencias</SelectItem>
                          <SelectItem value="Administración">Administración</SelectItem>
                          <SelectItem value="Medicina">Medicina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.rol === "estudiante" && (
                      <div className="grid gap-2">
                        <Label htmlFor="carrera">Carrera</Label>
                        <Input
                          id="carrera"
                          value={formData.carrera}
                          onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveUser}>Guardar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Facultad</TableHead>
                  <TableHead>Carrera</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.cedula}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          usuario.rol === "administrador"
                            ? "default"
                            : usuario.rol === "docente"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {usuario.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>{usuario.facultad}</TableCell>
                    <TableCell>{usuario.carrera}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(usuario)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(usuario.id)}>
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
  );
}

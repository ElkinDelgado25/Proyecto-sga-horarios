import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Mail, Phone, MapPin, Calendar, Save, Upload } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PerfilProps {
  userName: string;
  userRole: "estudiante" | "docente" | "administrador";
}

export function Perfil({ userName, userRole }: PerfilProps) {
  const [formData, setFormData] = useState({
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@universidad.edu",
    telefono: "+593 99 123 4567",
    cedula: "1234567890",
    direccion: "Quito, Ecuador",
    fechaNacimiento: "1995-05-15",
    carrera: userRole === "estudiante" ? "Ingeniería en Software" : "",
    facultad: "Facultad de Ingeniería",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    toast.success("Perfil actualizado correctamente");
  };

  const handleChangePassword = () => {
    toast.success("Se ha enviado un enlace para cambiar la contraseña a tu correo");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-800">Mi Perfil</h1>
        <p className="text-gray-600 mt-1">Administra tu información personal</p>
      </div>

      <Tabs defaultValue="informacion" className="space-y-6">
        <TabsList>
          <TabsTrigger value="informacion">Información Personal</TabsTrigger>
          <TabsTrigger value="academico">Información Académica</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
              <CardDescription>Actualiza tu información de contacto y datos personales</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-blue-600 text-white">
                    {formData.nombre.charAt(0)}{formData.apellido.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="mb-1">{formData.nombre} {formData.apellido}</h3>
                  <Badge variant="outline" className="mb-3">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </Badge>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Cambiar Foto
                    </Button>
                  </div>
                </div>
              </div>

              {/* Personal Info Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">
                    <User className="inline mr-2 h-4 w-4" />
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">
                    <User className="inline mr-2 h-4 w-4" />
                    Apellido
                  </Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula / DNI</Label>
                  <Input
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline mr-2 h-4 w-4" />
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">
                    <Phone className="inline mr-2 h-4 w-4" />
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">
                    <MapPin className="inline mr-2 h-4 w-4" />
                    Dirección
                  </Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academico">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Información Académica</CardTitle>
              <CardDescription>Datos sobre tu carrera y programa académico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userRole === "estudiante" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="carrera">Carrera</Label>
                      <Input
                        id="carrera"
                        name="carrera"
                        value={formData.carrera}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facultad">Facultad</Label>
                      <Input
                        id="facultad"
                        name="facultad"
                        value={formData.facultad}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Número de Matrícula</Label>
                      <Input value="2024-001234" disabled />
                    </div>

                    <div className="space-y-2">
                      <Label>Nivel Académico</Label>
                      <Input value="5to Semestre" disabled />
                    </div>
                  </>
                )}

                {userRole === "docente" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="facultad">Facultad</Label>
                      <Input
                        id="facultad"
                        name="facultad"
                        value={formData.facultad}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Departamento</Label>
                      <Input value="Ciencias de la Computación" disabled />
                    </div>

                    <div className="space-y-2">
                      <Label>Código de Docente</Label>
                      <Input value="DOC-2024-456" disabled />
                    </div>

                    <div className="space-y-2">
                      <Label>Materias Asignadas</Label>
                      <Input value="6 materias" disabled />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Administra tu contraseña y configuración de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="flex items-center gap-2 text-blue-900 mb-2">
                    Cambiar Contraseña
                  </h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Se enviará un enlace a tu correo electrónico ({formData.email}) para restablecer tu contraseña de forma segura.
                  </p>
                  <Button onClick={handleChangePassword} variant="outline">
                    Enviar Enlace de Restablecimiento
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4>Actividad Reciente</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Último inicio de sesión</p>
                        <p className="text-xs text-gray-500">Hoy, 10:30 AM - Chrome en Windows</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Cambio de contraseña</p>
                        <p className="text-xs text-gray-500">Hace 30 días</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

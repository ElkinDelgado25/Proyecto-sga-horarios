import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { LogIn, User, Lock, UserPlus, UserCircle } from "lucide-react";

interface LoginProps {
  onLogin: (role: "estudiante" | "docente" | "administrador", userName: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role: "estudiante" | "docente" | "administrador") => {
    const userName = email.split("@")[0] || "Usuario";
    onLogin(role, userName);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h1 className="text-4xl mb-4">Sistema de Gestión de Horarios</h1>
          <p className="text-xl text-blue-100">
            Plataforma integral para la administración de horarios académicos universitarios
          </p>
          <img
            src="https://images.unsplash.com/photo-1669607960578-f7d7fd363e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMG9ubGluZXxlbnwxfHx8fDE3NTk5NDY0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Education"
            className="rounded-lg mt-8 shadow-2xl"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Accede al sistema de gestión de horarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Usuario o Correo Electrónico</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="text"
                  placeholder="usuario@universidad.edu"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Recordar usuario
                </label>
              </div>
              <Button variant="link" className="px-0 text-sm">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 text-center mb-3">Acceso rápido por rol (Demo):</p>
              <Button className="w-full" onClick={() => handleLogin("estudiante")}>
                <User className="mr-2 h-4 w-4" />
                Entrar como Estudiante
              </Button>
              <Button className="w-full" variant="outline" onClick={() => handleLogin("docente")}>
                <UserCircle className="mr-2 h-4 w-4" />
                Entrar como Docente
              </Button>
              <Button className="w-full" variant="outline" onClick={() => handleLogin("administrador")}>
                <UserPlus className="mr-2 h-4 w-4" />
                Entrar como Administrador
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <Button variant="link" className="px-0">
                  Crear cuenta
                </Button>
              </p>
              <p className="text-center text-sm text-gray-600 mt-2">
                <Button variant="link" className="px-0">
                  Acceder como invitado
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export type UserRole = "estudiante" | "docente" | "administrador";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Curso {
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

export interface Horario {
  id: number;
  materia: string;
  docente: string;
  paralelo: string;
  aula: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export interface DashboardStats {
  title: string;
  value: string;
  icon: any;
  colorClass: string;
}

export interface ClassSchedule {
  time: string;
  subject: string;
  room: string;
  teacher?: string;
  students?: string;
}


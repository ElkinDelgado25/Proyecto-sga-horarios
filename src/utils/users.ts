export type Role = 'admin' | 'docente' | 'estudiante';

export interface User {
  id: string;
  username: string;
  role: Role;
}

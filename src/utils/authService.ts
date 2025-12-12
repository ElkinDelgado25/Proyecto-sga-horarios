import usersData from '../data/users.json';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  fullName: string;
  department?: string;
  career?: string;
  semester?: number;
  active: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
  token?: string;
}

/**
 * Autentica un usuario usando el archivo JSON
 */
export const authenticateUser = (username: string, password: string): LoginResponse => {
  try {
    // Buscar el usuario en el JSON
    const user = usersData.users.find(
      (u) => u.username === username && u.active === true
    );

    if (!user) {
      return {
        success: false,
        message: 'Usuario no encontrado o inactivo',
      };
    }

    // Verificar contraseña
    if (user.password !== password) {
      return {
        success: false,
        message: 'Contraseña incorrecta',
      };
    }

    // Crear token simulado (en producción usar JWT)
    const token = btoa(`${user.username}:${Date.now()}`);

    // Remover password del objeto de respuesta
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login exitoso',
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al procesar la autenticación',
    };
  }
};

/**
 * Obtiene todos los usuarios (sin contraseñas)
 */
export const getAllUsers = (): Omit<User, 'password'>[] => {
  return usersData.users.map(({ password, ...user }) => user);
};

/**
 * Obtiene un usuario por ID
 */
export const getUserById = (id: number): Omit<User, 'password'> | null => {
  const user = usersData.users.find((u) => u.id === id);
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Filtra usuarios por rol
 */
export const getUsersByRole = (role: string): Omit<User, 'password'>[] => {
  return usersData.users
    .filter((u) => u.role === role)
    .map(({ password, ...user }) => user);
};

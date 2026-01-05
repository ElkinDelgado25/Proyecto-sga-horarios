/**
 * Servicio para gestión del contexto de sesión y autenticación
 * Maneja el estado global del usuario autenticado
 */

import type { User } from './authService';

const SESSION_KEY = 'currentUser';
const TOKEN_KEY = 'authToken';

/**
 * Guarda la sesión del usuario
 */
export const saveSession = (user: Omit<User, 'password'>, token: string): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Obtiene el usuario de la sesión actual
 */
export const getCurrentUser = (): Omit<User, 'password'> | null => {
  const userData = localStorage.getItem(SESSION_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Obtiene el token de autenticación
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Verifica si hay una sesión activa
 */
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser() && !!getAuthToken();
};

/**
 * Cierra la sesión del usuario
 */
export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Actualiza la información del usuario en la sesión
 */
export const updateUserInfo = (updates: Partial<Omit<User, 'password'>>): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const updatedUser = { ...currentUser, ...updates };
  localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
  return true;
};

/**
 * Obtiene el rol del usuario actual
 */
export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

/**
 * Verifica si el usuario tiene un rol específico
 */
export const hasRole = (role: string): boolean => {
  return getUserRole() === role;
};

/**
 * Verifica si el usuario es administrador
 */
export const isAdmin = (): boolean => {
  return hasRole('administrador');
};

/**
 * Verifica si el usuario es profesor
 */
export const isProfesor = (): boolean => {
  return hasRole('profesor');
};

/**
 * Verifica si el usuario es estudiante
 */
export const isEstudiante = (): boolean => {
  return hasRole('estudiante');
};

/**
 * Obtiene el ID del usuario actual
 */
export const getCurrentUserId = (): number | null => {
  const user = getCurrentUser();
  return user ? user.id : null;
};

/**
 * Obtiene el nombre completo del usuario actual
 */
export const getCurrentUserName = (): string => {
  const user = getCurrentUser();
  return user ? user.fullName : 'Usuario';
};

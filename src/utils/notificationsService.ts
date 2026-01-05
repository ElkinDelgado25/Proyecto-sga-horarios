/**
 * Servicio para gestión de notificaciones
 * Maneja creación, lectura, actualización y eliminación de notificaciones
 */

export interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  userId?: number;
}

const STORAGE_KEY = 'notifications';

/**
 * Obtiene todas las notificaciones del localStorage
 */
export const getAllNotifications = (): Notification[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Obtiene notificaciones de un usuario específico
 */
export const getNotificationsByUser = (userId: number): Notification[] => {
  const all = getAllNotifications();
  return all.filter(n => !n.userId || n.userId === userId);
};

/**
 * Obtiene notificaciones no leídas
 */
export const getUnreadNotifications = (userId?: number): Notification[] => {
  const notifications = userId 
    ? getNotificationsByUser(userId) 
    : getAllNotifications();
  return notifications.filter(n => !n.read);
};

/**
 * Crea una nueva notificación
 */
export const createNotification = (notification: Omit<Notification, 'id'>): Notification => {
  const all = getAllNotifications();
  const newId = all.length > 0 ? Math.max(...all.map(n => n.id)) + 1 : 1;
  
  const newNotification: Notification = {
    ...notification,
    id: newId,
  };

  all.push(newNotification);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  
  return newNotification;
};

/**
 * Marca una notificación como leída
 */
export const markAsRead = (id: number): boolean => {
  const all = getAllNotifications();
  const notification = all.find(n => n.id === id);
  
  if (!notification) return false;
  
  notification.read = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  
  return true;
};

/**
 * Marca todas las notificaciones como leídas
 */
export const markAllAsRead = (userId?: number): void => {
  const all = getAllNotifications();
  all.forEach(n => {
    if (!userId || n.userId === userId) {
      n.read = true;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

/**
 * Elimina una notificación
 */
export const deleteNotification = (id: number): boolean => {
  const all = getAllNotifications();
  const filtered = all.filter(n => n.id !== id);
  
  if (filtered.length === all.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

/**
 * Elimina todas las notificaciones leídas
 */
export const deleteReadNotifications = (userId?: number): void => {
  const all = getAllNotifications();
  const filtered = all.filter(n => {
    if (userId && n.userId !== userId) return true;
    return !n.read;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

/**
 * Inicializa notificaciones de ejemplo
 */
export const initializeMockNotifications = (): void => {
  const existing = getAllNotifications();
  if (existing.length > 0) return;

  const mockNotifications: Notification[] = [
    {
      id: 1,
      type: 'warning',
      title: 'Cambio de horario',
      message: 'La clase de Programación Web del lunes 10 de febrero ha sido reprogramada para el miércoles 12 a las 14:00.',
      date: new Date().toISOString().split('T')[0],
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Recordatorio de tarea',
      message: 'Tienes una tarea pendiente de Base de Datos II para entregar el 15 de febrero.',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Calificación publicada',
      message: 'Tu calificación del examen de Ingeniería de Software ha sido publicada. Calificación: 9.5/10',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      read: true,
      priority: 'low'
    }
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockNotifications));
};

/**
 * Obtiene el conteo de notificaciones no leídas
 */
export const getUnreadCount = (userId?: number): number => {
  return getUnreadNotifications(userId).length;
};

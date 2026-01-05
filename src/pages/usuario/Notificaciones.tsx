import { useState, useEffect } from "react";
import styles from "../../styles/usuario/usuario.module.css";

interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function Notificaciones_usuario() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Cargar notificaciones de ejemplo (en producción vendría de un API)
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'warning',
        title: 'Cambio de horario',
        message: 'La clase de Programación Web del lunes 10 de febrero ha sido reprogramada para el miércoles 12 a las 14:00.',
        date: '2025-02-08',
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'info',
        title: 'Recordatorio de tarea',
        message: 'Tienes una tarea pendiente de Base de Datos II para entregar el 15 de febrero.',
        date: '2025-02-07',
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'success',
        title: 'Calificación publicada',
        message: 'Tu calificación del examen de Ingeniería de Software ha sido publicada. Calificación: 9.5/10',
        date: '2025-02-06',
        read: true,
        priority: 'low'
      },
      {
        id: 4,
        type: 'info',
        title: 'Nuevo material disponible',
        message: 'El profesor ha publicado nuevo material de estudio en la materia de Redes de Computadoras.',
        date: '2025-02-05',
        read: true,
        priority: 'low'
      },
      {
        id: 5,
        type: 'warning',
        title: 'Periodo de matrícula',
        message: 'El periodo de matrícula para el próximo semestre comienza el 20 de febrero. No olvides matricularte a tiempo.',
        date: '2025-02-04',
        read: false,
        priority: 'high'
      },
      {
        id: 6,
        type: 'error',
        title: 'Aula modificada',
        message: 'La clase de Base de Datos II se ha trasladado del LAB-A102 al LAB-C301 temporalmente.',
        date: '2025-02-03',
        read: true,
        priority: 'medium'
      },
      {
        id: 7,
        type: 'info',
        title: 'Tutoría disponible',
        message: 'El profesor Juan Pérez ofrece tutorías los martes de 16:00 a 18:00 en su oficina.',
        date: '2025-02-02',
        read: true,
        priority: 'low'
      }
    ];

    // Cargar desde localStorage si existen
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem('notifications', JSON.stringify(mockNotifications));
    }
    setLoading(false);
  };

  const markAsRead = (id: number) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: number) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '📢';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return '#0dcaf0';
      case 'warning': return '#ffc107';
      case 'success': return '#198754';
      case 'error': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  }).sort((a, b) => {
    // Ordenar por prioridad y fecha
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Notificaciones</h1>
        <div className={styles.muted}>Cargando notificaciones...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className={styles.title}>Notificaciones</h1>
        {unreadCount > 0 && (
          <span className={styles.badge} style={{ backgroundColor: '#dc3545' }}>
            {unreadCount} sin leer
          </span>
        )}
      </div>

      {/* Controles de filtro */}
      <div className={styles.row} style={{ marginBottom: '1rem' }}>
        <select 
          className={styles.select} 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as typeof filter)}
        >
          <option value="all">Todas ({notifications.length})</option>
          <option value="unread">No leídas ({unreadCount})</option>
          <option value="read">Leídas ({notifications.length - unreadCount})</option>
        </select>

        {unreadCount > 0 && (
          <button 
            className={styles.button} 
            type="button" 
            onClick={markAllAsRead}
          >
            ✓ Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Lista de notificaciones */}
      <div className={styles.stack}>
        {filteredNotifications.length === 0 ? (
          <div className={styles.card}>
            <div className={styles.muted}>
              {filter === 'unread' ? 'No tienes notificaciones sin leer' : 
               filter === 'read' ? 'No tienes notificaciones leídas' : 
               'No tienes notificaciones'}
            </div>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={styles.card}
              style={{ 
                borderLeft: `4px solid ${getTypeColor(notification.type)}`,
                backgroundColor: notification.read ? '#f8f9fa' : 'white',
                opacity: notification.read ? 0.8 : 1
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(notification.type)}</span>
                    <strong>{notification.title}</strong>
                    {!notification.read && (
                      <span className={styles.badge} style={{ backgroundColor: '#0d6efd', fontSize: '0.75rem' }}>
                        Nuevo
                      </span>
                    )}
                    {notification.priority === 'high' && (
                      <span className={styles.badge} style={{ backgroundColor: '#dc3545', fontSize: '0.75rem' }}>
                        Urgente
                      </span>
                    )}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    {notification.message}
                  </div>
                  <div className={styles.muted} style={{ fontSize: '0.875rem' }}>
                    📅 {new Date(notification.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {!notification.read && (
                    <button 
                      className={styles.button}
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                      style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                    >
                      ✓
                    </button>
                  )}
                  <button 
                    className={styles.button}
                    type="button"
                    onClick={() => deleteNotification(notification.id)}
                    style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', backgroundColor: '#dc3545' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
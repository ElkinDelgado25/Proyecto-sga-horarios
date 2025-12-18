import styles from "../../styles/components/dashboard.module.css";

interface DashboardProps {
  userRole: "estudiante" | "docente" | "administrador";
  onNavigate: (view: string) => void;
}

export function Dashboard({ userRole, onNavigate }: DashboardProps) {
  const getStats = () => {
    if (userRole === "estudiante") {
      return [
        { title: "Clases de Hoy", value: "5", icon: "📅" },
        { title: "Próxima Clase", value: "14:00", icon: "🕒" },
        { title: "Materias Inscritas", value: "8", icon: "📖" },
        { title: "Notificaciones", value: "3", icon: "🔔" },
      ];
    } else if (userRole === "docente") {
      return [
        { title: "Clases de Hoy", value: "4", icon: "📅" },
        { title: "Materias Asignadas", value: "6", icon: "📖" },
        { title: "Estudiantes Total", value: "145", icon: "👨‍🎓" },
        { title: "Notificaciones", value: "2", icon: "🔔" },
      ];
    } else {
      return [
        { title: "Usuarios Activos", value: "342", icon: "👥" },
        { title: "Horarios Pendientes", value: "12", icon: "🕒" },
        { title: "Facultades", value: "8", icon: "🏛️" },
        { title: "Aulas Disponibles", value: "45", icon: "✔️" },
      ];
    }
  };

  const getTodayClasses = () => {
    if (userRole === "estudiante") {
      return [
        { time: "08:00 - 10:00", subject: "Cálculo Diferencial", room: "Aula 301", info: "Dr. García" },
        { time: "10:00 - 12:00", subject: "Programación I", room: "Lab 102", info: "Ing. Martínez" },
        { time: "14:00 - 16:00", subject: "Física I", room: "Aula 205", info: "Dra. López" },
      ];
    } else {
      return [
        { time: "08:00 - 10:00", subject: "Programación I", room: "Lab 103", info: "32 estudiantes" },
        { time: "10:00 - 12:00", subject: "Programación II", room: "Lab 103", info: "28 estudiantes" },
        { time: "14:00 - 16:00", subject: "Base de Datos", room: "Lab 101", info: "30 estudiantes" },
      ];
    }
  };

  const stats = getStats();
  const todayClasses = getTodayClasses();
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Panel de inicio</h1>
        <p>Bienvenido al Aula Virtual</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className={styles.dashboardCards}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.dashboardCard}>
            <div className={styles.cardIcon}>{stat.icon}</div>
            <div className={styles.cardTitle}>{stat.title}</div>
            <div className={styles.cardValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Contenido Principal */}
      <div className={styles.dashboardMainContent}>
        {/* Clases de Hoy */}
        <section className={styles.dashboardClasses}>
          <h2>Clases de Hoy</h2>
          <p>{today}</p>
          <div className={styles.classList}>
            {todayClasses.map((clase, index) => (
              <div key={index} className={styles.classItem}>
                <div className={styles.classTime}>{clase.time}</div>
                <div className={styles.className}>{clase.subject}</div>
                <div className={styles.classRoom}>{clase.room} · {clase.info}</div>
                <div className={styles.classStatus}>✔️</div>
              </div>
            ))}
          </div>
          <button className={styles.btnFullSchedule} onClick={() => onNavigate("horarios")}>
            Ver Horario Completo
          </button>
        </section>

        {/* Accesos Rápidos */}
        <section className={styles.dashboardQuickAccess}>
          <h2>Accesos Rápidos</h2>
          <p>Acciones frecuentes según tu rol</p>
          <ul className={styles.quickAccessList}>
            <li onClick={() => onNavigate("horarios")}>
              <span className={styles.quickAccessIcon}>🕒</span>Consultar Horarios
            </li>
            <li onClick={() => onNavigate("preferencias")}>
              <span className={styles.quickAccessIcon}>⚙️</span>Configurar Preferencias
            </li>
            <li onClick={() => onNavigate("notificaciones")}>
              <span className={styles.quickAccessIcon}>🔔</span>Ver Notificaciones
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

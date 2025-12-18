import styles from "../../styles/components/dashboard.module.css";
import cardStyles from "../../styles/components/card.module.css";
import buttonStyles from "../../styles/components/button.module.css";

interface DashboardProps {
  userRole: "estudiante" | "docente" | "administrador";
  onNavigate: (view: string) => void;
}

export function Dashboard({ userRole, onNavigate }: DashboardProps) {
  const getStudentStats = () => [
    { title: "Clases de Hoy", value: "5", icon: "📅", colorClass: styles.iconBlue },
    { title: "Próxima Clase", value: "14:00", icon: "⏰", colorClass: styles.iconGreen },
    { title: "Materias Inscritas", value: "8", icon: "📚", colorClass: styles.iconPurple },
    { title: "Notificaciones", value: "3", icon: "🔔", colorClass: styles.iconOrange },
  ];

  const getDocenteStats = () => [
    { title: "Clases de Hoy", value: "4", icon: "📅", colorClass: styles.iconBlue },
    { title: "Materias Asignadas", value: "6", icon: "📚", colorClass: styles.iconPurple },
    { title: "Estudiantes Total", value: "145", icon: "👥", colorClass: styles.iconGreen },
    { title: "Notificaciones", value: "2", icon: "🔔", colorClass: styles.iconOrange },
  ];

  const getAdminStats = () => [
    { title: "Usuarios Activos", value: "342", icon: "👥", colorClass: styles.iconBlue },
    { title: "Horarios Pendientes", value: "12", icon: "⏰", colorClass: styles.iconOrange },
    { title: "Facultades", value: "8", icon: "📚", colorClass: styles.iconPurple },
    { title: "Aulas Disponibles", value: "45", icon: "✓", colorClass: styles.iconGreen },
  ];

  const stats =
    userRole === "estudiante"
      ? getStudentStats()
      : userRole === "docente"
      ? getDocenteStats()
      : getAdminStats();

  const todayClasses =
    userRole === "estudiante"
      ? [
          { time: "08:00 - 10:00", subject: "Cálculo Diferencial", room: "Aula 301", teacher: "Dr. García" },
          { time: "10:00 - 12:00", subject: "Programación I", room: "Lab 102", teacher: "Ing. Martínez" },
          { time: "14:00 - 16:00", subject: "Física I", room: "Aula 205", teacher: "Dra. López" },
        ]
      : [
          { time: "08:00 - 10:00", subject: "Programación I", room: "Lab 102", students: "32" },
          { time: "10:00 - 12:00", subject: "Programación II", room: "Lab 103", students: "28" },
          { time: "14:00 - 16:00", subject: "Base de Datos", room: "Lab 101", students: "30" },
        ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel de inicio</h1>
        <p className={styles.subtitle}>Bienvenido al Aula Virtual</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statTitle}>{stat.title}</span>
              <span className={`${styles.statIcon} ${stat.colorClass}`}>{stat.icon}</span>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.contentGrid}>
        {/* Today's Classes */}
        <div className={cardStyles.card}>
          <div className={cardStyles.cardHeader}>
            <h3 className={cardStyles.cardTitle}>Clases de Hoy</h3>
            <p className={cardStyles.cardDescription}>
              {new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className={cardStyles.cardContent}>
            <div className={styles.classList}>
              {todayClasses.map((clase, index) => (
                <div key={index} className={styles.classItem}>
                  <div className={styles.classInfo}>
                    <p className={styles.classTime}>{clase.time}</p>
                    <p className={styles.classSubject}>{clase.subject}</p>
                    <p className={styles.classDetails}>
                      {clase.room} {userRole === "estudiante" ? `• ${"teacher" in clase ? clase.teacher : ""}` : `• ${"students" in clase ? clase.students : ""} estudiantes`}
                    </p>
                  </div>
                  <span className={styles.classCheck}>✓</span>
                </div>
              ))}
            </div>
            <button 
              className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.fullWidthButton}`} 
              style={{ marginTop: "1rem" }}
              onClick={() => onNavigate("horarios")}
            >
              Ver Horario Completo
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={cardStyles.card}>
          <div className={cardStyles.cardHeader}>
            <h3 className={cardStyles.cardTitle}>Accesos Rápidos</h3>
            <p className={cardStyles.cardDescription}>Acciones frecuentes según tu rol</p>
          </div>
          <div className={cardStyles.cardContent}>
            <div className={styles.quickActions}>
              <button 
                className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.fullWidthButton}`}
                onClick={() => onNavigate("horarios")}
              >
                📅 Consultar Horarios
              </button>
              {userRole === "administrador" && (
                <>
                  <button 
                    className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.fullWidthButton}`}
                    onClick={() => onNavigate("usuarios")}
                  >
                    👥 Gestión de Usuarios
                  </button>
                  <button 
                    className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.fullWidthButton}`}
                    onClick={() => onNavigate("asignacion")}
                  >
                    ⏰ Asignar Horarios
                  </button>
                </>
              )}
              {userRole === "docente" && (
                <button 
                  className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.fullWidthButton}`}
                  onClick={() => onNavigate("preferencias")}
                >
                  📚 Configurar Preferencias
                </button>
              )}
              <button 
                className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.fullWidthButton}`}
                onClick={() => onNavigate("notificaciones")}
              >
                🔔 Ver Notificaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

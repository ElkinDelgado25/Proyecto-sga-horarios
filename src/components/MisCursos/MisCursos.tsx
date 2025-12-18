import { useState } from "react";
import styles from "../../styles/components/miscursos.module.css";

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  carrera: string;
  horarios: string[];
  aula: string;
  icon: string;
  colorClass: string;
}

export function MisCursos() {
  const [filter, setFilter] = useState("todos");
  const [sort, setSort] = useState("nombre");

  const cursosData: Curso[] = [
    {
      id: 1,
      nombre: "ADMINISTRACIÓN DE BASES DE DATOS DISTRIBUIDAS",
      codigo: "A --",
      carrera: "SOFTWARE 2024 - NS",
      horarios: ["Lunes 9:00am - 11:00am", "Miércoles 9:00am - 11:00am"],
      aula: "Lab 301",
      icon: "📚",
      colorClass: styles.dashboardCardYellow,
    },
    {
      id: 2,
      nombre: "ADMINISTRACIÓN DE SERVIDORES / SOFTWARE 2024",
      codigo: "A --",
      carrera: "SOFTWARE 2024 - NS",
      horarios: ["Martes 14:00pm - 16:00pm", "Jueves 14:00pm - 16:00pm"],
      aula: "Lab 205",
      icon: "🖥️",
      colorClass: styles.dashboardCardRed,
    },
    {
      id: 3,
      nombre: "APLICACIONES PARA EL CLIENTE WEB / SOFTWARE",
      codigo: "A --",
      carrera: "SOFTWARE 2024 - NS",
      horarios: ["Lunes 14:00pm - 17:00pm", "Viernes 9:00am - 12:00pm"],
      aula: "Lab 102",
      icon: "🌐",
      colorClass: styles.dashboardCardOrange,
    },
    {
      id: 4,
      nombre: "ESTADÍSTICA PARA INGENIERÍA / SOFTWARE 2024",
      codigo: "A --",
      carrera: "SOFTWARE 2024 - NS",
      horarios: ["Miércoles 16:00pm - 18:00pm", "Viernes 14:00pm - 16:00pm"],
      aula: "Lab 303",
      icon: "📊",
      colorClass: styles.dashboardCardPurple,
    },
    {
      id: 5,
      nombre: "PERSPECTIVA DE LA IA",
      codigo: "A --",
      carrera: "SOFTWARE 2024 - NS",
      horarios: ["Jueves 10:00am - 12:00pm", "Viernes 16:00pm - 18:00pm"],
      aula: "Lab 307",
      icon: "🤖",
      colorClass: styles.dashboardCardGreen,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Mis cursos</h1>
      </div>

      {/* Filtros */}
      <div className={styles.dashboardCardsFilter}>
        <span className={styles.dashboardCardsFilterTitle}>Vista general de curso</span>
        <div className={styles.dashboardCardsFilterControls}>
          <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="en-progreso">En progreso</option>
            <option value="completados">Completados</option>
          </select>
          <select className={styles.filterSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="nombre">Ordenar por nombre de curso</option>
            <option value="recientes">Más recientes</option>
            <option value="antiguos">Más antiguos</option>
          </select>
          <select className={styles.filterSelect}>
            <option value="tarjeta">Tarjeta</option>
            <option value="lista">Lista</option>
          </select>
          <button className={styles.dashboardCardsFilterBtn}>Buscar</button>
        </div>
      </div>

      {/* Tarjetas de Cursos */}
      <div className={styles.dashboardCards}>
        {cursosData.map((curso) => (
          <div key={curso.id} className={`${styles.dashboardCard} ${curso.colorClass}`}>
            <div className={styles.dashboardCardHeader}>
              <span className={styles.dashboardCardIcon}>{curso.icon}</span>
              <span className={styles.dashboardCardTitle}>{curso.nombre}</span>
            </div>
            <div className={styles.dashboardCardInfo}>{curso.codigo} {curso.carrera}</div>
            <ul className={styles.dashboardCardSchedule}>
              {curso.horarios.map((horario, index) => (
                <li key={index}>{horario}</li>
              ))}
            </ul>
            <div className={styles.dashboardCardRoom}>Aula: {curso.aula}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

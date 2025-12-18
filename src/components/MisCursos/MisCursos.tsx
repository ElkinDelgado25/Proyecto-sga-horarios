import { useState } from "react";
import styles from "../../styles/components/miscursos.module.css";
import buttonStyles from "../../styles/components/button.module.css";

interface Curso {
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

const cursosData: Curso[] = [
  {
    id: 1,
    nombre: "ADMINISTRACIÓN DE BASES DE DATOS DISTRIBUIDAS",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Lunes 9:00am - 11:00am", "Miércoles 9:00am - 11:00am"],
    aula: "Lab 301",
    color: "gradientPurple",
    pattern: "squares",
  },
  {
    id: 2,
    nombre: "ADMINISTRACIÓN DE SERVIDORES / SOFTWARE 2024",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Martes 14:00pm - 16:00pm", "Jueves 14:00pm - 16:00pm"],
    aula: "Lab 205",
    color: "gradientBlue",
    pattern: "triangles",
  },
  {
    id: 3,
    nombre: "APLICACIONES PARA EL CLIENTE WEB / SOFTWARE",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Lunes 14:00pm - 17:00pm", "Viernes 9:00am - 12:00pm"],
    aula: "Lab 102",
    color: "gradientIndigo",
    pattern: "squares",
  },
  {
    id: 4,
    nombre: "ESTADÍSTICA PARA INGENIERÍA / SOFTWARE 2024",
    codigo: "A --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Miércoles 16:00pm - 18:00pm", "Viernes 14:00pm - 16:00pm"],
    aula: "Aula 303",
    color: "gradientGreen",
    pattern: "squares",
  },
  {
    id: 5,
    nombre: "PROGRAMACIÓN AVANZADA",
    codigo: "B --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Martes 9:00am - 11:00am", "Jueves 9:00am - 11:00am"],
    aula: "Lab 101",
    color: "gradientOrange",
    pattern: "squares",
  },
  {
    id: 6,
    nombre: "ARQUITECTURA DE SOFTWARE",
    codigo: "C --",
    carrera: "SOFTWARE 2024 - NS",
    periodo: "2024",
    horarios: ["Lunes 16:00pm - 18:00pm", "Miércoles 14:00pm - 16:00pm"],
    aula: "Aula 205",
    color: "gradientPink",
    pattern: "squares",
  },
];

const PatternOverlay = ({ pattern }: { pattern: string }) => {
  if (pattern === "squares") {
    return (
      <div className={styles.patternOverlay}>
        <div className={styles.squaresPattern}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.square}></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export function MisCursos() {
  const [filter, setFilter] = useState("todos");
  const [sort, setSort] = useState("nombre");
  const [view, setView] = useState("tarjeta");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis cursos</h1>

        <div className={styles.filterCard}>
          <h2 className={styles.filterTitle}>Vista general de curso</h2>

          <div className={styles.filterControls}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                fontSize: "0.875rem",
              }}
            >
              <option value="todos">Todos</option>
              <option value="en-progreso">En progreso</option>
              <option value="completados">Completados</option>
            </select>

            <button className={`${buttonStyles.button} ${buttonStyles.outline}`}>Buscar</button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                fontSize: "0.875rem",
              }}
            >
              <option value="nombre">Ordenar por nombre de curso</option>
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
            </select>

            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                fontSize: "0.875rem",
              }}
            >
              <option value="tarjeta">📦 Tarjeta</option>
              <option value="lista">📋 Lista</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.courseGrid}>
        {cursosData.map((curso) => (
          <div key={curso.id} className={styles.courseCard}>
            <div className={`${styles.courseHeader} ${styles[curso.color]}`}>
              <PatternOverlay pattern={curso.pattern} />
              <div className={styles.courseMenu}>
                <button className={styles.menuButton}>⋮</button>
              </div>
            </div>
            <div className={styles.courseBody}>
              <h3 className={styles.courseName}>{curso.nombre}</h3>
              <p className={styles.courseCode}>{curso.codigo}</p>
              <p className={styles.courseCarrera}>{curso.carrera}</p>
              <div className={styles.courseInfo}>
                {curso.horarios.map((horario, index) => (
                  <div key={index} className={styles.courseSchedule}>
                    <span>⏰</span>
                    <span>{horario}</span>
                  </div>
                ))}
                <div className={styles.courseRoom}>
                  <span>📍</span>
                  <span>{curso.aula}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.root}>
      <ul className={styles.menu}>
        <li>
          <Link className={styles.link} to="/admin">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/admin/cursos">
            Mis cursos (Admin)
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/admin/asignacion">
            Asignación de Horario
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/admin/formulario">
            Formulario
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/usuario">
            Home Usuario
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/usuario/cursos">
            Cursos (Usuario)
          </Link>
        </li>
      </ul>
    </aside>
  );
}

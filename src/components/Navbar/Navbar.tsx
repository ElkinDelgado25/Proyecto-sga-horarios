import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <span className={styles.title}>SGA Horarios</span>
      </div>

      <nav className={styles.nav}>
        <Link className={styles.link} to="/usuario">
          Usuario
        </Link>
        <Link className={styles.link} to="/admin">
          Administrador
        </Link>
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </nav>

      <div className={styles.right}>
        <span className={styles.userBadge} aria-label="Usuario">
          US
        </span>
      </div>
    </header>
  );
}

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.root}>
      <p className={styles.text}>
        © {new Date().getFullYear()} SGA Horarios — Todos los derechos reservados
      </p>
    </footer>
  );
}

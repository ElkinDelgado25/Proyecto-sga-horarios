import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "../../styles/usuario/usuario.module.css";

export default function HomeUsuario() {
  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.page}>
        <h1 className={styles.title}>Home (Usuario)</h1>
        <div className={styles.stack}>
          <div className={styles.card}>Bienvenido al área de usuario.</div>
          <Link className={styles.link} to="/usuario/cursos">
            Ver cursos
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

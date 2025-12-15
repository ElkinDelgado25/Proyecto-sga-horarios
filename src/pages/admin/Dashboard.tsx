import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import styles from "../../styles/admin/admin.module.css";

export default function Dashboard() {
  return (
    <div className={styles.layout}>
      <Navbar />

      <div className={styles.content}>
        <Sidebar />

        <main className={styles.main}>
          <h1 className={styles.title}>Dashboard (Administrador)</h1>
          <div className={styles.stack}>
            <div className={styles.card}>Ruta: /admin</div>
            <div className={styles.card}>Accesos: /admin/formulario, /admin/asignacion, /admin/cursos</div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

import styles from "../../styles/admin/admin.module.css";

export default function Formulario() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Formulario (Admin)</h1>

      <form className={styles.stack}>
        <div className={styles.stack}>
          <label className={styles.label} htmlFor="campo1">
            Campo de ejemplo
          </label>
          <input className={styles.input} id="campo1" type="text" placeholder="Escribe aquí" />
        </div>

        <button className={styles.button} type="button">
          Guardar
        </button>
      </form>
    </div>
  );
}

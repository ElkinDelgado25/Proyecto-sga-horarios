import { useEffect, useState } from "react";
import { parseHorariosXML, type SistemaHorarios } from "../../utils/xmlParser";
import styles from "../../styles/usuario/usuario.module.css";

export default function Cursos() {
  const [data, setData] = useState<SistemaHorarios | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    const parsed = await parseHorariosXML("/data/horarios.xml");
    setData(parsed);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Cursos (Usuario)</h1>
        <div className={styles.muted}>Cargando...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cursos (Usuario)</h1>
      <div className={styles.stack}>
        {(data?.horarios ?? []).map((h) => (
          <div key={h.id} className={styles.card}>
            <div>
              <span className={styles.label}>Materia:</span> {h.materia.nombre}
            </div>
            <div>
              <span className={styles.label}>Profesor:</span> {h.profesor.nombre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

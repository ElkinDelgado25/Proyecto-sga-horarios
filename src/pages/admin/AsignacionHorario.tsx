import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  downloadXML,
  exportToXML,
  parseHorariosXML,
  type SistemaHorarios,
} from "../../utils/xmlParser";
import styles from "../../styles/admin/admin.module.css";

export default function AsignacionHorario() {
  const navigate = useNavigate();
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

  function handleExport() {
    if (!data) return;
    const xml = exportToXML(data);
    downloadXML(xml, `horarios_${data.metadata.periodo}.xml`);
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Asignación de Horarios</h1>
        <div className={styles.muted}>Cargando...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Asignación de Horarios (Admin)</h1>

      <div className={styles.row}>
        <button className={styles.button} type="button" onClick={handleExport} disabled={!data}>
          Exportar XML
        </button>
        <button className={styles.button} type="button" onClick={() => navigate("/admin/cursos")}>
          Ver cursos
        </button>
      </div>

      {data ? (
        <div className={styles.stack}>
          <div className={styles.card}>
            <div className={styles.label}>Periodo</div>
            <div>{data.metadata.periodo}</div>
          </div>
          <div className={styles.card}>
            <div className={styles.label}>Horarios activos</div>
            <div>{data.horarios.length}</div>
          </div>
        </div>
      ) : (
        <div className={styles.card}>No se pudo cargar el XML.</div>
      )}
    </div>
  );
}

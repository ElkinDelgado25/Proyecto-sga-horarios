import { useEffect, useState } from "react";
import { parseHorariosXML, type Horario, type SistemaHorarios } from "../../utils/xmlParser";
import styles from "../../styles/admin/admin.module.css";

export default function Miscursos() {
  const [data, setData] = useState<SistemaHorarios | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Horario | null>(null);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const parsed = await parseHorariosXML("/data/horarios.xml");
      if (!parsed) {
        setError("No se pudo cargar el archivo XML");
      }
      setData(parsed);
    } catch {
      setError("Error al procesar el archivo XML");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mis cursos (Admin)</h1>
        <div className={styles.muted}>Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mis cursos (Admin)</h1>
        <div className={styles.stack}>
          <div className={styles.card}>{error}</div>
          <button className={styles.button} type="button" onClick={load}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Mis cursos (Admin)</h1>

      <div className={styles.stack}>
        <div className={styles.card}>
          <div className={styles.label}>Periodo</div>
          <div>{data?.metadata.periodo}</div>
        </div>

        <div className={styles.card}>
          <div className={styles.label}>Lista de horarios</div>
          <div className={styles.muted}>Selecciona un curso para ver detalle.</div>
        </div>

        <div className={styles.stack}>
          {(data?.horarios ?? []).map((h) => (
            <button
              key={h.id}
              type="button"
              className={styles.button}
              onClick={() => setSelected(h)}
              aria-pressed={selected?.id === h.id}
            >
              {h.materia.nombre} — {h.profesor.nombre}
            </button>
          ))}
        </div>

        {selected && (
          <div className={styles.card}>
            <div className={styles.stack}>
              <div>
                <span className={styles.label}>Materia:</span> {selected.materia.nombre}
              </div>
              <div>
                <span className={styles.label}>Aula:</span> {selected.aula.codigo} ({selected.aula.edificio})
              </div>
              <div>
                <span className={styles.label}>Horario semanal:</span>
              </div>
              <div className={styles.stack}>
                {selected.horarioSemanal.map((s, idx) => (
                  <div key={idx} className={styles.card}>
                    {s.dia} {s.horaInicio} - {s.horaFin} ({s.duracion} min)
                  </div>
                ))}
              </div>
              <button className={styles.button} type="button" onClick={() => setSelected(null)}>
                Cerrar detalle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

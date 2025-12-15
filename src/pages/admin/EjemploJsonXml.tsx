import { useEffect, useMemo, useState } from "react";
import { getUsersByRole } from "../../utils/authService";
import { parseHorariosXML, type Horario } from "../../utils/xmlParser";
import styles from "../../styles/admin/admin.module.css";

export default function EjemploJsonXml() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [selectedProfesorId, setSelectedProfesorId] = useState<number | null>(null);

  const profesores = useMemo(() => getUsersByRole("profesor"), []);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    const parsed = await parseHorariosXML("/data/horarios.xml");
    setHorarios(parsed?.horarios ?? []);
  }

  const horariosDelProfesor = selectedProfesorId
    ? horarios.filter((h) => h.profesor.id === selectedProfesorId)
    : [];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Ejemplo JSON + XML (Admin)</h1>

      <div className={styles.content}>
        <section className={styles.main}>
          <h2 className={styles.subtitle}>Profesores (JSON)</h2>
          <div className={styles.stack}>
            {profesores.map((p) => (
              <button
                key={p.id}
                type="button"
                className={styles.button}
                onClick={() => setSelectedProfesorId(p.id)}
              >
                {p.fullName}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.main}>
          <h2 className={styles.subtitle}>Horarios (XML)</h2>
          {!selectedProfesorId ? (
            <div className={styles.card}>Selecciona un profesor para ver sus horarios.</div>
          ) : horariosDelProfesor.length === 0 ? (
            <div className={styles.card}>No tiene horarios asignados.</div>
          ) : (
            <div className={styles.stack}>
              {horariosDelProfesor.map((h) => (
                <div key={h.id} className={styles.card}>
                  <div>
                    <span className={styles.label}>Materia:</span> {h.materia.nombre}
                  </div>
                  <div>
                    <span className={styles.label}>Aula:</span> {h.aula.codigo}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/*
        Separar /admin y /usuario permite crecer el sistema por rol.
        CSS Modules mantiene el alcance local de las clases y reduce conflictos entre pantallas.
      */}
    </div>
  );
}

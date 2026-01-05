import { useEffect, useState } from "react";
import { parseHorariosXML, type SistemaHorarios } from "../../utils/xmlParser";
import styles from "../../styles/usuario/usuario.module.css";

interface HorarioVisual {
  hora: string;
  lunes?: { materia: string; aula: string; profesor: string };
  martes?: { materia: string; aula: string; profesor: string };
  miercoles?: { materia: string; aula: string; profesor: string };
  jueves?: { materia: string; aula: string; profesor: string };
  viernes?: { materia: string; aula: string; profesor: string };
  sabado?: { materia: string; aula: string; profesor: string };
}

type DiaKey = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado';

export default function Horarios_usuario() {
  const [data, setData] = useState<SistemaHorarios | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("todos");
  const [vistaTabla, setVistaTabla] = useState(true);

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

  // Generar horario visual para vista de tabla
  const generarHorarioVisual = (): HorarioVisual[] => {
    if (!data) return [];

    const horasSet = new Set<string>();
    const horarioMap = new Map<string, HorarioVisual>();

    // Recopilar todas las horas y crear estructura
    data.horarios.forEach((horario) => {
      horario.horarioSemanal.forEach((sesion) => {
        const hora = `${sesion.horaInicio}-${sesion.horaFin}`;
        horasSet.add(hora);

        if (!horarioMap.has(hora)) {
          horarioMap.set(hora, { hora });
        }

        const diaKey = sesion.dia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") as DiaKey;
        const horarioVisual = horarioMap.get(hora)!;
        
        horarioVisual[diaKey] = {
          materia: horario.materia.nombre,
          aula: horario.aula.codigo,
          profesor: horario.profesor.nombre,
        };
      });
    });

    return Array.from(horarioMap.values()).sort((a, b) => {
      const horaA = a.hora.split("-")[0];
      const horaB = b.hora.split("-")[0];
      return horaA.localeCompare(horaB);
    });
  };

  const horariosFiltrados = data?.horarios.filter((h) => {
    if (filtro === "todos") return true;
    return h.horarioSemanal.some((s) => s.dia === filtro);
  }) ?? [];

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mis Horarios</h1>
        <div className={styles.muted}>Cargando horarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mis Horarios</h1>
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
      <h1 className={styles.title}>Mis Horarios</h1>

      {/* Información del periodo */}
      <div className={styles.card}>
        <div>
          <span className={styles.label}>Periodo Académico:</span> {data?.metadata.periodo}
        </div>
        <div>
          <span className={styles.label}>Total de materias:</span> {data?.horarios.length}
        </div>
      </div>

      {/* Controles de filtro y vista */}
      <div className={styles.row}>
        <div className={styles.stack}>
          <label className={styles.label}>Filtrar por día:</label>
          <select 
            className={styles.select} 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos los días</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
          </select>
        </div>

        <button 
          className={styles.button} 
          type="button" 
          onClick={() => setVistaTabla(!vistaTabla)}
        >
          {vistaTabla ? "Vista Lista" : "Vista Tabla"}
        </button>
      </div>

      {/* Vista de tabla (calendario semanal) */}
      {vistaTabla ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
              </tr>
            </thead>
            <tbody>
              {generarHorarioVisual().map((fila, idx) => (
                <tr key={idx}>
                  <td className={styles.horaCell}>{fila.hora}</td>
                  <td>{fila.lunes && (
                    <div className={styles.claseCell}>
                      <strong>{fila.lunes.materia}</strong>
                      <div className={styles.muted}>{fila.lunes.aula}</div>
                    </div>
                  )}</td>
                  <td>{fila.martes && (
                    <div className={styles.claseCell}>
                      <strong>{fila.martes.materia}</strong>
                      <div className={styles.muted}>{fila.martes.aula}</div>
                    </div>
                  )}</td>
                  <td>{fila.miercoles && (
                    <div className={styles.claseCell}>
                      <strong>{fila.miercoles.materia}</strong>
                      <div className={styles.muted}>{fila.miercoles.aula}</div>
                    </div>
                  )}</td>
                  <td>{fila.jueves && (
                    <div className={styles.claseCell}>
                      <strong>{fila.jueves.materia}</strong>
                      <div className={styles.muted}>{fila.jueves.aula}</div>
                    </div>
                  )}</td>
                  <td>{fila.viernes && (
                    <div className={styles.claseCell}>
                      <strong>{fila.viernes.materia}</strong>
                      <div className={styles.muted}>{fila.viernes.aula}</div>
                    </div>
                  )}</td>
                  <td>{fila.sabado && (
                    <div className={styles.claseCell}>
                      <strong>{fila.sabado.materia}</strong>
                      <div className={styles.muted}>{fila.sabado.aula}</div>
                    </div>
                  )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Vista de lista */
        <div className={styles.stack}>
          {horariosFiltrados.length === 0 ? (
            <div className={styles.card}>No hay clases para el filtro seleccionado</div>
          ) : (
            horariosFiltrados.map((h) => (
              <div key={h.id} className={styles.card}>
                <div className={styles.stack}>
                  <div>
                    <strong>{h.materia.nombre}</strong> ({h.materia.codigo})
                  </div>
                  <div>
                    <span className={styles.label}>Profesor:</span> {h.profesor.nombre}
                  </div>
                  <div>
                    <span className={styles.label}>Aula:</span> {h.aula.codigo} - {h.aula.edificio}
                  </div>
                  <div>
                    <span className={styles.label}>Créditos:</span> {h.materia.creditos}
                  </div>
                  <div>
                    <span className={styles.label}>Horario:</span>
                  </div>
                  <div className={styles.stack}>
                    {h.horarioSemanal.map((s, idx) => (
                      <div key={idx} className={styles.muted}>
                        • {s.dia}: {s.horaInicio} - {s.horaFin}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}


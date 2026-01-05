import { useEffect, useState } from "react";
import { parseHorariosXML, type Horario, type SistemaHorarios } from "../../utils/xmlParser";
import styles from "../../styles/usuario/usuario.module.css";

export default function Cursos() {
  const [data, setData] = useState<SistemaHorarios | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Horario | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNivel, setFilterNivel] = useState<string>("todos");

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

  // Obtener niveles únicos para filtro
  const niveles = Array.from(
    new Set(data?.horarios.map((h) => h.materia.nivel) || [])
  ).sort();

  // Filtrar cursos
  const cursosFiltrados = data?.horarios.filter((h) => {
    const matchSearch = 
      h.materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.materia.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchNivel = filterNivel === "todos" || h.materia.nivel === filterNivel;
    
    return matchSearch && matchNivel;
  }) || [];

  // Calcular estadísticas
  const totalCursos = data?.horarios.length || 0;
  const totalCreditos = data?.horarios.reduce((sum, h) => sum + h.materia.creditos, 0) || 0;

  const calcularHorasTotales = () => {
    return data?.horarios.reduce((total, h) => {
      const horasCurso = h.horarioSemanal.reduce((sum, s) => sum + s.duracion, 0);
      return total + horasCurso;
    }, 0) || 0;
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mis Cursos</h1>
        <div className={styles.muted}>Cargando cursos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mis Cursos</h1>
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
      <h1 className={styles.title}>Mis Cursos</h1>

      {/* Estadísticas generales */}
      <div className={styles.row} style={{ gap: '1rem', marginBottom: '1rem' }}>
        <div className={styles.card} style={{ flex: 1 }}>
          <div className={styles.label}>Total Cursos</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalCursos}</div>
        </div>
        <div className={styles.card} style={{ flex: 1 }}>
          <div className={styles.label}>Créditos</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalCreditos}</div>
        </div>
        <div className={styles.card} style={{ flex: 1 }}>
          <div className={styles.label}>Horas/Semana</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{(calcularHorasTotales() / 60).toFixed(1)}h</div>
        </div>
      </div>

      {/* Información del periodo */}
      <div className={styles.card} style={{ marginBottom: '1rem' }}>
        <div>
          <span className={styles.label}>Periodo Académico:</span> {data?.metadata.periodo}
        </div>
        <div>
          <span className={styles.label}>Carrera:</span> {data?.metadata.carrera}
        </div>
        <div>
          <span className={styles.label}>Última actualización:</span> {data?.metadata.fechaActualizacion}
        </div>
      </div>

      {/* Controles de búsqueda y filtro */}
      <div className={styles.stack} style={{ marginBottom: '1rem' }}>
        <div>
          <label className={styles.label}>Buscar curso:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Buscar por nombre, código o profesor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className={styles.label}>Filtrar por nivel:</label>
          <select
            className={styles.select}
            value={filterNivel}
            onChange={(e) => setFilterNivel(e.target.value)}
          >
            <option value="todos">Todos los niveles</option>
            {niveles.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de cursos */}
      <div className={styles.stack}>
        {cursosFiltrados.length === 0 ? (
          <div className={styles.card}>
            <div className={styles.muted}>
              No se encontraron cursos que coincidan con los filtros
            </div>
          </div>
        ) : (
          cursosFiltrados.map((h) => (
            <div 
              key={h.id} 
              className={styles.card}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderLeft: selectedCourse?.id === h.id ? '4px solid #0d6efd' : '4px solid transparent'
              }}
              onClick={() => setSelectedCourse(selectedCourse?.id === h.id ? null : h)}
            >
              <div className={styles.stack}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.125rem' }}>{h.materia.nombre}</strong>
                      <span className={styles.badge}>{h.materia.codigo}</span>
                    </div>
                    <div>
                      <span className={styles.label}>Profesor:</span> 👨‍🏫 {h.profesor.nombre}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.badge} style={{ backgroundColor: '#198754' }}>
                      {h.materia.creditos} créditos
                    </div>
                    <div className={styles.muted} style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                      {h.materia.nivel}
                    </div>
                  </div>
                </div>

                {/* Información básica siempre visible */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <div>
                    <span className={styles.label}>Aula:</span> 🏢 {h.aula.codigo} ({h.aula.edificio})
                  </div>
                  <div>
                    <span className={styles.label}>Estudiantes:</span> 👥 {h.estudiantesInscritos}/{h.aula.capacidad}
                  </div>
                  <div>
                    <span className={styles.label}>Estado:</span> 
                    <span className={styles.badge} style={{ 
                      backgroundColor: h.estado === 'activo' ? '#198754' : '#6c757d',
                      marginLeft: '0.25rem'
                    }}>
                      {h.estado}
                    </span>
                  </div>
                </div>

                {/* Detalles expandibles */}
                {selectedCourse?.id === h.id && (
                  <div className={styles.stack} style={{ 
                    marginTop: '1rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid #dee2e6' 
                  }}>
                    <div>
                      <strong className={styles.label}>Horario Semanal:</strong>
                    </div>
                    <div className={styles.stack}>
                      {h.horarioSemanal.map((s, idx) => (
                        <div 
                          key={idx} 
                          className={styles.card}
                          style={{ backgroundColor: '#f8f9fa' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <strong>{s.dia}</strong>
                            </div>
                            <div>
                              🕐 {s.horaInicio} - {s.horaFin} ({s.duracion} min)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <strong className={styles.label}>Información del Aula:</strong>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div>
                        <span className={styles.label}>Código:</span> {h.aula.codigo}
                      </div>
                      <div>
                        <span className={styles.label}>Edificio:</span> {h.aula.edificio}
                      </div>
                      <div>
                        <span className={styles.label}>Tipo:</span> {h.aula.tipo}
                      </div>
                      <div>
                        <span className={styles.label}>Capacidad:</span> {h.aula.capacidad} estudiantes
                      </div>
                    </div>

                    <div>
                      <strong className={styles.label}>Contacto del Profesor:</strong>
                    </div>
                    <div>
                      📧 {h.profesor.email}
                    </div>

                    <button 
                      className={styles.button}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(null);
                      }}
                    >
                      Cerrar detalles
                    </button>
                  </div>
                )}

                {/* Indicador para expandir */}
                {selectedCourse?.id !== h.id && (
                  <div className={styles.muted} style={{ 
                    textAlign: 'center', 
                    marginTop: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    Click para ver más detalles ▼
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen de filtros */}
      {(searchTerm || filterNivel !== "todos") && (
        <div className={styles.card} style={{ marginTop: '1rem', textAlign: 'center' }}>
          <div className={styles.muted}>
            Mostrando {cursosFiltrados.length} de {totalCursos} cursos
          </div>
          {(searchTerm || filterNivel !== "todos") && (
            <button 
              className={styles.button}
              type="button"
              onClick={() => {
                setSearchTerm("");
                setFilterNivel("todos");
              }}
              style={{ marginTop: '0.5rem' }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}

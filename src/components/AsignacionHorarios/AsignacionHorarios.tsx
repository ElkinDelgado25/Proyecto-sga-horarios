import { useState } from "react";
import styles from "../../styles/components/asignacion.module.css";
import cardStyles from "../../styles/components/card.module.css";
import buttonStyles from "../../styles/components/button.module.css";
import inputStyles from "../../styles/components/input.module.css";

interface Horario {
  id: number;
  materia: string;
  docente: string;
  paralelo: string;
  aula: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export function AsignacionHorarios() {
  const [horariosAsignados, setHorariosAsignados] = useState<Horario[]>([
    {
      id: 1,
      materia: "Programación I",
      docente: "Ing. Martínez",
      paralelo: "B",
      aula: "Lab 102",
      dia: "Lunes",
      horaInicio: "10:00",
      horaFin: "12:00",
    },
    {
      id: 2,
      materia: "Cálculo Diferencial",
      docente: "Dr. García",
      paralelo: "A",
      aula: "Aula 301",
      dia: "Lunes",
      horaInicio: "08:00",
      horaFin: "10:00",
    },
  ]);

  const [formData, setFormData] = useState({
    materia: "",
    docente: "",
    paralelo: "",
    aula: "",
    dia: "",
    horaInicio: "",
    horaFin: "",
  });

  const materias = ["Cálculo Diferencial", "Programación I", "Física I", "Álgebra Lineal", "Química General", "Base de Datos"];
  const docentes = ["Dr. García", "Ing. Martínez", "Dra. López", "Dr. Ramírez", "Dra. Mendoza"];
  const aulas = ["Aula 301", "Aula 302", "Lab 101", "Lab 102", "Lab 103", "Aula 205"];
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const horas = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const handleSaveHorario = () => {
    if (!formData.materia || !formData.docente || !formData.dia || !formData.horaInicio || !formData.horaFin) {
      alert("Por favor completa todos los campos");
      return;
    }

    setHorariosAsignados([
      ...horariosAsignados,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      materia: "",
      docente: "",
      paralelo: "",
      aula: "",
      dia: "",
      horaInicio: "",
      horaFin: "",
    });
  };

  const handleDeleteHorario = (id: number) => {
    setHorariosAsignados(horariosAsignados.filter((h) => h.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Asignación de Horarios</h1>
        <p className={styles.subtitle}>Asigna materias, docentes y aulas a horarios específicos</p>
      </div>

      <div className={styles.contentGrid}>
        {/* Formulario de Asignación */}
        <div className={cardStyles.card}>
          <div className={cardStyles.cardHeader}>
            <h3 className={cardStyles.cardTitle} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "0.5rem" }}>⏰</span>
              Nuevo Horario
            </h3>
            <p className={cardStyles.cardDescription}>Completa los datos para asignar un horario</p>
          </div>
          <div className={cardStyles.cardContent}>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={inputStyles.label}>Materia</label>
                <select
                  value={formData.materia}
                  onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                  className={inputStyles.input}
                >
                  <option value="">Seleccionar materia</option>
                  {materias.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={inputStyles.label}>Docente</label>
                <select
                  value={formData.docente}
                  onChange={(e) => setFormData({ ...formData, docente: e.target.value })}
                  className={inputStyles.input}
                >
                  <option value="">Seleccionar docente</option>
                  {docentes.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={inputStyles.label}>Paralelo</label>
                  <select
                    value={formData.paralelo}
                    onChange={(e) => setFormData({ ...formData, paralelo: e.target.value })}
                    className={inputStyles.input}
                  >
                    <option value="">Paralelo</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={inputStyles.label}>Aula</label>
                  <select
                    value={formData.aula}
                    onChange={(e) => setFormData({ ...formData, aula: e.target.value })}
                    className={inputStyles.input}
                  >
                    <option value="">Aula</option>
                    {aulas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={inputStyles.label}>Día</label>
                <select
                  value={formData.dia}
                  onChange={(e) => setFormData({ ...formData, dia: e.target.value })}
                  className={inputStyles.input}
                >
                  <option value="">Seleccionar día</option>
                  {dias.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={inputStyles.label}>Hora Inicio</label>
                  <select
                    value={formData.horaInicio}
                    onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                    className={inputStyles.input}
                  >
                    <option value="">Hora inicio</option>
                    {horas.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={inputStyles.label}>Hora Fin</label>
                  <select
                    value={formData.horaFin}
                    onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                    className={inputStyles.input}
                  >
                    <option value="">Hora fin</option>
                    {horas.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button className={`${buttonStyles.button} ${buttonStyles.primary}`} onClick={handleSaveHorario}>
                  💾 Guardar Horario
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Horarios */}
        <div className={cardStyles.card}>
          <div className={cardStyles.cardHeader}>
            <h3 className={cardStyles.cardTitle}>Horarios Asignados</h3>
            <p className={cardStyles.cardDescription}>Lista de todos los horarios configurados</p>
          </div>
          <div className={cardStyles.cardContent}>
            {horariosAsignados.length === 0 ? (
              <div className={styles.emptyState}>
                <span style={{ fontSize: "3rem" }} className={styles.emptyStateIcon}>📅</span>
                <p className={styles.emptyStateTitle}>No hay horarios asignados</p>
                <p className={styles.emptyStateText}>Crea tu primer horario usando el formulario</p>
              </div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.tableHeaderCell}>Materia</th>
                      <th className={styles.tableHeaderCell}>Docente</th>
                      <th className={styles.tableHeaderCell}>Día</th>
                      <th className={styles.tableHeaderCell}>Horario</th>
                      <th className={styles.tableHeaderCell}>Aula</th>
                      <th className={styles.tableHeaderCell}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horariosAsignados.map((horario) => (
                      <tr key={horario.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>{horario.materia}</td>
                        <td className={styles.tableCell}>{horario.docente}</td>
                        <td className={styles.tableCell}>{horario.dia}</td>
                        <td className={styles.tableCell}>
                          {horario.horaInicio} - {horario.horaFin}
                        </td>
                        <td className={styles.tableCell}>{horario.aula}</td>
                        <td className={styles.tableCell}>
                          <button className={styles.deleteButton} onClick={() => handleDeleteHorario(horario.id)}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Horario {
  id: number;
  materia: string;
  docente: string;
  paralelo: string;
  aula: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

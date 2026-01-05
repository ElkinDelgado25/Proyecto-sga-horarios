import { useState, useEffect } from "react";
import { getUsersByRole } from "../../utils/authService";
import styles from "../../styles/admin/admin.module.css";

interface HorarioForm {
  materiaId: string;
  materiaNombre: string;
  materiaCodigo: string;
  materiaCreditos: number;
  materiaNivel: string;
  profesorId: number;
  profesorNombre: string;
  profesorEmail: string;
  aula: string;
  edificio: string;
  capacidad: number;
  tipoAula: string;
  sesiones: Sesion[];
  estudiantesInscritos: number;
  estado: 'activo' | 'inactivo';
}

interface Sesion {
  dia: string;
  horaInicio: string;
  horaFin: string;
  duracion: number;
}

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const horasDisponibles = Array.from({ length: 14 }, (_, i) => {
  const hora = 7 + i;
  return `${hora.toString().padStart(2, '0')}:00`;
});

export default function Formulario() {
  const [formData, setFormData] = useState<HorarioForm>({
    materiaId: '',
    materiaNombre: '',
    materiaCodigo: '',
    materiaCreditos: 0,
    materiaNivel: '',
    profesorId: 0,
    profesorNombre: '',
    profesorEmail: '',
    aula: '',
    edificio: '',
    capacidad: 30,
    tipoAula: 'Aula',
    sesiones: [],
    estudiantesInscritos: 0,
    estado: 'activo'
  });

  const [profesores, setProfesores] = useState<any[]>([]);
  const [nuevaSesion, setNuevaSesion] = useState<Sesion>({
    dia: 'Lunes',
    horaInicio: '08:00',
    horaFin: '10:00',
    duracion: 120
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [savedHorarios, setSavedHorarios] = useState<HorarioForm[]>([]);

  useEffect(() => {
    // Cargar profesores
    const profs = getUsersByRole('profesor');
    setProfesores(profs);

    // Cargar horarios guardados
    const saved = localStorage.getItem('horarios_admin');
    if (saved) {
      setSavedHorarios(JSON.parse(saved));
    }
  }, []);

  const calcularDuracion = (inicio: string, fin: string): number => {
    const [hInicio, mInicio] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);
    return (hFin * 60 + mFin) - (hInicio * 60 + mInicio);
  };

  const validarFormulario = (): string[] => {
    const errores: string[] = [];

    if (!formData.materiaNombre) errores.push('El nombre de la materia es requerido');
    if (!formData.materiaCodigo) errores.push('El código de la materia es requerido');
    if (formData.materiaCreditos <= 0) errores.push('Los créditos deben ser mayor a 0');
    if (!formData.materiaNivel) errores.push('El nivel es requerido');
    if (formData.profesorId === 0) errores.push('Debe seleccionar un profesor');
    if (!formData.aula) errores.push('El aula es requerida');
    if (!formData.edificio) errores.push('El edificio es requerido');
    if (formData.capacidad <= 0) errores.push('La capacidad debe ser mayor a 0');
    if (formData.sesiones.length === 0) errores.push('Debe agregar al menos una sesión');

    // Validar conflictos de horario
    formData.sesiones.forEach((sesion, idx) => {
      formData.sesiones.forEach((otraSesion, otroIdx) => {
        if (idx !== otroIdx && sesion.dia === otraSesion.dia) {
          const inicioA = sesion.horaInicio;
          const finA = sesion.horaFin;
          const inicioB = otraSesion.horaInicio;
          const finB = otraSesion.horaFin;

          if (
            (inicioA >= inicioB && inicioA < finB) ||
            (finA > inicioB && finA <= finB) ||
            (inicioA <= inicioB && finA >= finB)
          ) {
            errores.push(`Conflicto de horario en ${sesion.dia}`);
          }
        }
      });
    });

    return Array.from(new Set(errores));
  };

  const handleAddSesion = () => {
    const duracion = calcularDuracion(nuevaSesion.horaInicio, nuevaSesion.horaFin);
    
    if (duracion <= 0) {
      setErrors(['La hora de fin debe ser posterior a la hora de inicio']);
      return;
    }

    const sesionConDuracion = {
      ...nuevaSesion,
      duracion
    };

    setFormData({
      ...formData,
      sesiones: [...formData.sesiones, sesionConDuracion]
    });

    // Reset nueva sesión
    setNuevaSesion({
      dia: 'Lunes',
      horaInicio: '08:00',
      horaFin: '10:00',
      duracion: 120
    });
  };

  const handleRemoveSesion = (index: number) => {
    setFormData({
      ...formData,
      sesiones: formData.sesiones.filter((_, i) => i !== index)
    });
  };

  const handleProfesorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const profesorId = Number(e.target.value);
    const profesor = profesores.find(p => p.id === profesorId);
    
    if (profesor) {
      setFormData({
        ...formData,
        profesorId: profesor.id,
        profesorNombre: profesor.fullName,
        profesorEmail: profesor.email
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    const erroresValidacion = validarFormulario();
    if (erroresValidacion.length > 0) {
      setErrors(erroresValidacion);
      return;
    }

    // Generar ID único
    const nuevoHorario = {
      ...formData,
      materiaId: `H${Date.now()}`
    };

    const nuevosHorarios = [...savedHorarios, nuevoHorario];
    setSavedHorarios(nuevosHorarios);
    localStorage.setItem('horarios_admin', JSON.stringify(nuevosHorarios));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    // Reset form
    setFormData({
      materiaId: '',
      materiaNombre: '',
      materiaCodigo: '',
      materiaCreditos: 0,
      materiaNivel: '',
      profesorId: 0,
      profesorNombre: '',
      profesorEmail: '',
      aula: '',
      edificio: '',
      capacidad: 30,
      tipoAula: 'Aula',
      sesiones: [],
      estudiantesInscritos: 0,
      estado: 'activo'
    });
  };

  const handleDeleteHorario = (index: number) => {
    const nuevosHorarios = savedHorarios.filter((_, i) => i !== index);
    setSavedHorarios(nuevosHorarios);
    localStorage.setItem('horarios_admin', JSON.stringify(nuevosHorarios));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Asignación de Horarios</h1>

      {success && (
        <div className={styles.card} style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb' }}>
          ✓ Horario guardado correctamente
        </div>
      )}

      {errors.length > 0 && (
        <div className={styles.card} style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb' }}>
          <strong>Errores de validación:</strong>
          <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form className={styles.stack} onSubmit={handleSubmit}>
        {/* Información de la materia */}
        <div className={styles.card}>
          <h2 className={styles.label}>Información de la Materia</h2>
          
          <div className={styles.stack}>
            <div>
              <label className={styles.label} htmlFor="materiaNombre">
                Nombre de la materia *
              </label>
              <input
                className={styles.input}
                id="materiaNombre"
                type="text"
                value={formData.materiaNombre}
                onChange={(e) => setFormData({ ...formData, materiaNombre: e.target.value })}
                placeholder="Ej: Programación Web"
              />
            </div>

            <div className={styles.row}>
              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="materiaCodigo">
                  Código *
                </label>
                <input
                  className={styles.input}
                  id="materiaCodigo"
                  type="text"
                  value={formData.materiaCodigo}
                  onChange={(e) => setFormData({ ...formData, materiaCodigo: e.target.value })}
                  placeholder="Ej: IS-401"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="materiaCreditos">
                  Créditos *
                </label>
                <input
                  className={styles.input}
                  id="materiaCreditos"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.materiaCreditos || ''}
                  onChange={(e) => setFormData({ ...formData, materiaCreditos: Number(e.target.value) })}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="materiaNivel">
                  Nivel *
                </label>
                <select
                  className={styles.select}
                  id="materiaNivel"
                  value={formData.materiaNivel}
                  onChange={(e) => setFormData({ ...formData, materiaNivel: e.target.value })}
                >
                  <option value="">Seleccionar</option>
                  <option value="Primero">Primero</option>
                  <option value="Segundo">Segundo</option>
                  <option value="Tercero">Tercero</option>
                  <option value="Cuarto">Cuarto</option>
                  <option value="Quinto">Quinto</option>
                  <option value="Sexto">Sexto</option>
                  <option value="Séptimo">Séptimo</option>
                  <option value="Octavo">Octavo</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Información del profesor */}
        <div className={styles.card}>
          <h2 className={styles.label}>Asignación de Profesor</h2>
          
          <div>
            <label className={styles.label} htmlFor="profesor">
              Profesor *
            </label>
            <select
              className={styles.select}
              id="profesor"
              value={formData.profesorId}
              onChange={handleProfesorChange}
            >
              <option value={0}>Seleccionar profesor</option>
              {profesores.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.fullName} - {prof.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Información del aula */}
        <div className={styles.card}>
          <h2 className={styles.label}>Información del Aula</h2>
          
          <div className={styles.stack}>
            <div className={styles.row}>
              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="aula">
                  Código del aula *
                </label>
                <input
                  className={styles.input}
                  id="aula"
                  type="text"
                  value={formData.aula}
                  onChange={(e) => setFormData({ ...formData, aula: e.target.value })}
                  placeholder="Ej: LAB-A101"
                />
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="edificio">
                  Edificio *
                </label>
                <input
                  className={styles.input}
                  id="edificio"
                  type="text"
                  value={formData.edificio}
                  onChange={(e) => setFormData({ ...formData, edificio: e.target.value })}
                  placeholder="Ej: Bloque A"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="tipoAula">
                  Tipo de aula
                </label>
                <select
                  className={styles.select}
                  id="tipoAula"
                  value={formData.tipoAula}
                  onChange={(e) => setFormData({ ...formData, tipoAula: e.target.value })}
                >
                  <option value="Aula">Aula</option>
                  <option value="Laboratorio">Laboratorio</option>
                  <option value="Auditorio">Auditorio</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="capacidad">
                  Capacidad *
                </label>
                <input
                  className={styles.input}
                  id="capacidad"
                  type="number"
                  min="1"
                  value={formData.capacidad}
                  onChange={(e) => setFormData({ ...formData, capacidad: Number(e.target.value) })}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="estudiantesInscritos">
                  Estudiantes inscritos
                </label>
                <input
                  className={styles.input}
                  id="estudiantesInscritos"
                  type="number"
                  min="0"
                  value={formData.estudiantesInscritos}
                  onChange={(e) => setFormData({ ...formData, estudiantesInscritos: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horario semanal */}
        <div className={styles.card}>
          <h2 className={styles.label}>Horario Semanal</h2>
          
          <div className={styles.stack}>
            <div className={styles.row}>
              <div style={{ flex: 1 }}>
                <label className={styles.label}>Día</label>
                <select
                  className={styles.select}
                  value={nuevaSesion.dia}
                  onChange={(e) => setNuevaSesion({ ...nuevaSesion, dia: e.target.value })}
                >
                  {diasSemana.map(dia => (
                    <option key={dia} value={dia}>{dia}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label}>Hora inicio</label>
                <select
                  className={styles.select}
                  value={nuevaSesion.horaInicio}
                  onChange={(e) => setNuevaSesion({ ...nuevaSesion, horaInicio: e.target.value })}
                >
                  {horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label className={styles.label}>Hora fin</label>
                <select
                  className={styles.select}
                  value={nuevaSesion.horaFin}
                  onChange={(e) => setNuevaSesion({ ...nuevaSesion, horaFin: e.target.value })}
                >
                  {horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>

              <button
                className={styles.button}
                type="button"
                onClick={handleAddSesion}
              >
                + Agregar
              </button>
            </div>

            {/* Lista de sesiones */}
            {formData.sesiones.length > 0 && (
              <div className={styles.stack}>
                <strong>Sesiones agregadas:</strong>
                {formData.sesiones.map((sesion, idx) => (
                  <div key={idx} className={styles.card} style={{ backgroundColor: '#f8f9fa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        {sesion.dia}: {sesion.horaInicio} - {sesion.horaFin} ({sesion.duracion} min)
                      </div>
                      <button
                        className={styles.button}
                        type="button"
                        onClick={() => handleRemoveSesion(idx)}
                        style={{ backgroundColor: '#dc3545' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Estado */}
        <div className={styles.card}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={formData.estado === 'activo'}
              onChange={(e) => setFormData({ ...formData, estado: e.target.checked ? 'activo' : 'inactivo' })}
            />
            {' '}Horario activo
          </label>
        </div>

        <button className={styles.button} type="submit">
          💾 Guardar Horario
        </button>
      </form>

      {/* Lista de horarios guardados */}
      {savedHorarios.length > 0 && (
        <div className={styles.stack} style={{ marginTop: '2rem' }}>
          <h2 className={styles.title}>Horarios Guardados ({savedHorarios.length})</h2>
          
          {savedHorarios.map((horario, idx) => (
            <div key={idx} className={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <strong>{horario.materiaNombre}</strong> ({horario.materiaCodigo})
                  <div className={styles.muted}>
                    Profesor: {horario.profesorNombre} | Aula: {horario.aula}
                  </div>
                  <div className={styles.muted}>
                    {horario.sesiones.length} sesiones | {horario.materiaCreditos} créditos
                  </div>
                </div>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => handleDeleteHorario(idx)}
                  style={{ backgroundColor: '#dc3545' }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

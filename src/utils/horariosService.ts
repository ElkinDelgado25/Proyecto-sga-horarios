/**
 * Servicio para gestión de horarios y cursos
 * Centraliza la lógica de negocio relacionada con horarios académicos
 */

import { parseHorariosXML, type Horario, type SistemaHorarios } from './xmlParser';

export interface CursoDetalle extends Horario {
  horasTotalesSemanales: number;
  porcentajeOcupacion: number;
}

export interface EstadisticasHorarios {
  totalCursos: number;
  totalCreditos: number;
  totalHorasSemanales: number;
  totalEstudiantes: number;
  promedioOcupacion: number;
  cursosPorNivel: Record<string, number>;
  cursosPorProfesor: Record<string, number>;
}

/**
 * Carga los horarios desde el archivo XML
 */
export const loadHorarios = async (): Promise<SistemaHorarios | null> => {
  try {
    return await parseHorariosXML('/data/horarios.xml');
  } catch (error) {
    console.error('Error al cargar horarios:', error);
    return null;
  }
};

/**
 * Calcula las horas totales semanales de un horario
 */
export const calcularHorasTotales = (horario: Horario): number => {
  return horario.horarioSemanal.reduce((total, sesion) => total + sesion.duracion, 0) / 60;
};

/**
 * Calcula el porcentaje de ocupación de un aula
 */
export const calcularOcupacion = (horario: Horario): number => {
  return (horario.estudiantesInscritos / horario.aula.capacidad) * 100;
};

/**
 * Obtiene un curso con detalles calculados
 */
export const getCursoDetalle = (horario: Horario): CursoDetalle => {
  return {
    ...horario,
    horasTotalesSemanales: calcularHorasTotales(horario),
    porcentajeOcupacion: calcularOcupacion(horario),
  };
};

/**
 * Filtra horarios por día de la semana
 */
export const filtrarPorDia = (horarios: Horario[], dia: string): Horario[] => {
  return horarios.filter(h => 
    h.horarioSemanal.some(s => s.dia === dia)
  );
};

/**
 * Filtra horarios por nivel
 */
export const filtrarPorNivel = (horarios: Horario[], nivel: string): Horario[] => {
  return horarios.filter(h => h.materia.nivel === nivel);
};

/**
 * Filtra horarios por profesor
 */
export const filtrarPorProfesor = (horarios: Horario[], profesorId: number): Horario[] => {
  return horarios.filter(h => h.profesor.id === profesorId);
};

/**
 * Busca horarios por término de búsqueda (nombre materia, código, profesor)
 */
export const buscarHorarios = (horarios: Horario[], termino: string): Horario[] => {
  const terminoLower = termino.toLowerCase();
  return horarios.filter(h =>
    h.materia.nombre.toLowerCase().includes(terminoLower) ||
    h.materia.codigo.toLowerCase().includes(terminoLower) ||
    h.profesor.nombre.toLowerCase().includes(terminoLower)
  );
};

/**
 * Obtiene estadísticas generales de los horarios
 */
export const calcularEstadisticas = (horarios: Horario[]): EstadisticasHorarios => {
  const totalCursos = horarios.length;
  const totalCreditos = horarios.reduce((sum, h) => sum + h.materia.creditos, 0);
  const totalHorasSemanales = horarios.reduce((sum, h) => sum + calcularHorasTotales(h), 0);
  const totalEstudiantes = horarios.reduce((sum, h) => sum + h.estudiantesInscritos, 0);
  
  const ocupaciones = horarios.map(h => calcularOcupacion(h));
  const promedioOcupacion = ocupaciones.reduce((sum, o) => sum + o, 0) / ocupaciones.length;

  const cursosPorNivel: Record<string, number> = {};
  const cursosPorProfesor: Record<string, number> = {};

  horarios.forEach(h => {
    cursosPorNivel[h.materia.nivel] = (cursosPorNivel[h.materia.nivel] || 0) + 1;
    cursosPorProfesor[h.profesor.nombre] = (cursosPorProfesor[h.profesor.nombre] || 0) + 1;
  });

  return {
    totalCursos,
    totalCreditos,
    totalHorasSemanales,
    totalEstudiantes,
    promedioOcupacion,
    cursosPorNivel,
    cursosPorProfesor,
  };
};

/**
 * Detecta conflictos de horario para un profesor
 */
export const detectarConflictosProfesor = (horarios: Horario[], profesorId: number): string[] => {
  const horariosProfesor = filtrarPorProfesor(horarios, profesorId);
  const conflictos: string[] = [];

  for (let i = 0; i < horariosProfesor.length; i++) {
    for (let j = i + 1; j < horariosProfesor.length; j++) {
      const h1 = horariosProfesor[i];
      const h2 = horariosProfesor[j];

      h1.horarioSemanal.forEach(s1 => {
        h2.horarioSemanal.forEach(s2 => {
          if (s1.dia === s2.dia) {
            if (hayConflictoHorario(s1.horaInicio, s1.horaFin, s2.horaInicio, s2.horaFin)) {
              conflictos.push(
                `Conflicto el ${s1.dia}: ${h1.materia.nombre} (${s1.horaInicio}-${s1.horaFin}) y ${h2.materia.nombre} (${s2.horaInicio}-${s2.horaFin})`
              );
            }
          }
        });
      });
    }
  }

  return conflictos;
};

/**
 * Detecta conflictos de horario para un aula
 */
export const detectarConflictosAula = (horarios: Horario[], aulaId: string): string[] => {
  const horariosAula = horarios.filter(h => h.aula.codigo === aulaId);
  const conflictos: string[] = [];

  for (let i = 0; i < horariosAula.length; i++) {
    for (let j = i + 1; j < horariosAula.length; j++) {
      const h1 = horariosAula[i];
      const h2 = horariosAula[j];

      h1.horarioSemanal.forEach(s1 => {
        h2.horarioSemanal.forEach(s2 => {
          if (s1.dia === s2.dia) {
            if (hayConflictoHorario(s1.horaInicio, s1.horaFin, s2.horaInicio, s2.horaFin)) {
              conflictos.push(
                `Conflicto el ${s1.dia} en ${h1.aula.codigo}: ${h1.materia.nombre} (${s1.horaInicio}-${s1.horaFin}) y ${h2.materia.nombre} (${s2.horaInicio}-${s2.horaFin})`
              );
            }
          }
        });
      });
    }
  }

  return conflictos;
};

/**
 * Verifica si hay conflicto entre dos rangos horarios
 */
const hayConflictoHorario = (
  inicio1: string,
  fin1: string,
  inicio2: string,
  fin2: string
): boolean => {
  return (
    (inicio1 >= inicio2 && inicio1 < fin2) ||
    (fin1 > inicio2 && fin1 <= fin2) ||
    (inicio1 <= inicio2 && fin1 >= fin2)
  );
};

/**
 * Obtiene los niveles únicos de los horarios
 */
export const getNivelesUnicos = (horarios: Horario[]): string[] => {
  return Array.from(new Set(horarios.map(h => h.materia.nivel))).sort();
};

/**
 * Obtiene los profesores únicos de los horarios
 */
export const getProfesoresUnicos = (horarios: Horario[]): Array<{ id: number; nombre: string; email: string }> => {
  const profesoresMap = new Map<number, { id: number; nombre: string; email: string }>();
  
  horarios.forEach(h => {
    if (!profesoresMap.has(h.profesor.id)) {
      profesoresMap.set(h.profesor.id, {
        id: h.profesor.id,
        nombre: h.profesor.nombre,
        email: h.profesor.email,
      });
    }
  });

  return Array.from(profesoresMap.values()).sort((a, b) => a.nombre.localeCompare(b.nombre));
};

/**
 * Obtiene las aulas únicas de los horarios
 */
export const getAulasUnicas = (horarios: Horario[]): Array<{ codigo: string; edificio: string; tipo: string }> => {
  const aulasMap = new Map<string, { codigo: string; edificio: string; tipo: string }>();
  
  horarios.forEach(h => {
    if (!aulasMap.has(h.aula.codigo)) {
      aulasMap.set(h.aula.codigo, {
        codigo: h.aula.codigo,
        edificio: h.aula.edificio,
        tipo: h.aula.tipo,
      });
    }
  });

  return Array.from(aulasMap.values()).sort((a, b) => a.codigo.localeCompare(b.codigo));
};

/**
 * Genera un horario semanal visual organizado por días y horas
 */
export const generarMatrizHorario = (horarios: Horario[]) => {
  const matriz: Record<string, Record<string, Horario[]>> = {};
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  dias.forEach(dia => {
    matriz[dia] = {};
  });

  horarios.forEach(horario => {
    horario.horarioSemanal.forEach(sesion => {
      const clave = `${sesion.horaInicio}-${sesion.horaFin}`;
      if (!matriz[sesion.dia][clave]) {
        matriz[sesion.dia][clave] = [];
      }
      matriz[sesion.dia][clave].push(horario);
    });
  });

  return matriz;
};

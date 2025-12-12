// Utilidad para parsear XML de horarios

export interface Sesion {
  dia: string;
  horaInicio: string;
  horaFin: string;
  duracion: number;
}

export interface Materia {
  codigo: string;
  nombre: string;
  creditos: number;
  nivel: string;
}

export interface Profesor {
  id: number;
  nombre: string;
  email: string;
}

export interface Aula {
  codigo: string;
  edificio: string;
  capacidad: number;
  tipo: string;
}

export interface Horario {
  id: string;
  materia: Materia;
  profesor: Profesor;
  aula: Aula;
  horarioSemanal: Sesion[];
  estudiantesInscritos: number;
  estado: string;
}

export interface SistemaHorarios {
  metadata: {
    institucion: string;
    facultad: string;
    carrera: string;
    periodo: string;
    fechaActualizacion: string;
  };
  horarios: Horario[];
}

/**
 * Parsea el archivo XML de horarios
 */
export const parseHorariosXML = async (xmlPath: string): Promise<SistemaHorarios | null> => {
  try {
    const response = await fetch(xmlPath);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Verificar si hay errores de parseo
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      console.error('Error parsing XML:', parserError.textContent);
      return null;
    }

    // Extraer metadata
    const metadata = {
      institucion: xmlDoc.querySelector('metadata > institucion')?.textContent || '',
      facultad: xmlDoc.querySelector('metadata > facultad')?.textContent || '',
      carrera: xmlDoc.querySelector('metadata > carrera')?.textContent || '',
      periodo: xmlDoc.querySelector('metadata > periodo')?.textContent || '',
      fechaActualizacion: xmlDoc.querySelector('metadata > fecha_actualizacion')?.textContent || '',
    };

    // Extraer horarios
    const horariosNodes = xmlDoc.querySelectorAll('horarios > horario');
    const horarios: Horario[] = [];

    horariosNodes.forEach((horarioNode) => {
      const id = horarioNode.getAttribute('id') || '';

      // Materia
      const materia: Materia = {
        codigo: horarioNode.querySelector('materia > codigo')?.textContent || '',
        nombre: horarioNode.querySelector('materia > nombre')?.textContent || '',
        creditos: parseInt(horarioNode.querySelector('materia > creditos')?.textContent || '0'),
        nivel: horarioNode.querySelector('materia > nivel')?.textContent || '',
      };

      // Profesor
      const profesor: Profesor = {
        id: parseInt(horarioNode.querySelector('profesor > id')?.textContent || '0'),
        nombre: horarioNode.querySelector('profesor > nombre')?.textContent || '',
        email: horarioNode.querySelector('profesor > email')?.textContent || '',
      };

      // Aula
      const aula: Aula = {
        codigo: horarioNode.querySelector('aula > codigo')?.textContent || '',
        edificio: horarioNode.querySelector('aula > edificio')?.textContent || '',
        capacidad: parseInt(horarioNode.querySelector('aula > capacidad')?.textContent || '0'),
        tipo: horarioNode.querySelector('aula > tipo')?.textContent || '',
      };

      // Sesiones
      const sesionesNodes = horarioNode.querySelectorAll('horario_semanal > sesion');
      const horarioSemanal: Sesion[] = [];

      sesionesNodes.forEach((sesionNode) => {
        horarioSemanal.push({
          dia: sesionNode.querySelector('dia')?.textContent || '',
          horaInicio: sesionNode.querySelector('hora_inicio')?.textContent || '',
          horaFin: sesionNode.querySelector('hora_fin')?.textContent || '',
          duracion: parseInt(sesionNode.querySelector('duracion')?.textContent || '0'),
        });
      });

      horarios.push({
        id,
        materia,
        profesor,
        aula,
        horarioSemanal,
        estudiantesInscritos: parseInt(
          horarioNode.querySelector('estudiantes_inscritos')?.textContent || '0'
        ),
        estado: horarioNode.querySelector('estado')?.textContent || '',
      });
    });

    return {
      metadata,
      horarios,
    };
  } catch (error) {
    console.error('Error loading XML:', error);
    return null;
  }
};

/**
 * Exporta horarios a formato XML
 */
export const exportToXML = (data: SistemaHorarios): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sistema_horarios>\n';
  
  // Metadatax|
  xml += '  <metadata>\n';
  xml += `    <institucion>${data.metadata.institucion}</institucion>\n`;
  xml += `    <facultad>${data.metadata.facultad}</facultad>\n`;
  xml += `    <carrera>${data.metadata.carrera}</carrera>\n`;
  xml += `    <periodo>${data.metadata.periodo}</periodo>\n`;
  xml += `    <fecha_actualizacion>${data.metadata.fechaActualizacion}</fecha_actualizacion>\n`;
  xml += '  </metadata>\n\n';
  
  // Horarios
  xml += '  <horarios>\n';
  data.horarios.forEach((horario) => {
    xml += `    <horario id="${horario.id}">\n`;
    xml += '      <materia>\n';
    xml += `        <codigo>${horario.materia.codigo}</codigo>\n`;
    xml += `        <nombre>${horario.materia.nombre}</nombre>\n`;
    xml += `        <creditos>${horario.materia.creditos}</creditos>\n`;
    xml += `        <nivel>${horario.materia.nivel}</nivel>\n`;
    xml += '      </materia>\n';
    xml += '      <profesor>\n';
    xml += `        <id>${horario.profesor.id}</id>\n`;
    xml += `        <nombre>${horario.profesor.nombre}</nombre>\n`;
    xml += `        <email>${horario.profesor.email}</email>\n`;
    xml += '      </profesor>\n';
    xml += '      <aula>\n';
    xml += `        <codigo>${horario.aula.codigo}</codigo>\n`;
    xml += `        <edificio>${horario.aula.edificio}</edificio>\n`;
    xml += `        <capacidad>${horario.aula.capacidad}</capacidad>\n`;
    xml += `        <tipo>${horario.aula.tipo}</tipo>\n`;
    xml += '      </aula>\n';
    xml += '      <horario_semanal>\n';
    horario.horarioSemanal.forEach((sesion) => {
      xml += '        <sesion>\n';
      xml += `          <dia>${sesion.dia}</dia>\n`;
      xml += `          <hora_inicio>${sesion.horaInicio}</hora_inicio>\n`;
      xml += `          <hora_fin>${sesion.horaFin}</hora_fin>\n`;
      xml += `          <duracion>${sesion.duracion}</duracion>\n`;
      xml += '        </sesion>\n';
    });
    xml += '      </horario_semanal>\n';
    xml += `      <estudiantes_inscritos>${horario.estudiantesInscritos}</estudiantes_inscritos>\n`;
    xml += `      <estado>${horario.estado}</estado>\n`;
    xml += '    </horario>\n';
  });
  xml += '  </horarios>\n';
  xml += '</sistema_horarios>';
  
  return xml;
};

/**
 * Descarga el XML generado
 */

export const downloadXML = (xmlContent: string, filename: string = 'horarios.xml') => {
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

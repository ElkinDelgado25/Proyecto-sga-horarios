import { useState, useEffect } from 'react';
import { parseHorariosXML, type Horario } from '../../utils/xmlParser';
import type { SistemaHorarios } from '../../utils/xmlParser';

export default function Mis_cursos() {
    const [horariosData, setHorariosData] = useState<SistemaHorarios | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedHorario, setSelectedHorario] = useState<Horario | null>(null);

    useEffect(() => {
        loadHorarios();
    }, []);

    const loadHorarios = async () => {
        try {
            setLoading(true);
            const data = await parseHorariosXML('/data/horarios.xml');
            if (data) {
                setHorariosData(data);
            } else {
                setError('Error al cargar los horarios');
            }
        } catch (err) {
            setError('Error al procesar el archivo XML');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Cargando horarios desde XML...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error: {error}</h2>
                <button onClick={loadHorarios}>Reintentar</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1>📚 Gestión de Horarios Académicos</h1>
            
            {/* Metadata */}
            {horariosData && (
                <div style={{ 
                    background: '#f0f0f0', 
                    padding: '15px', 
                    borderRadius: '8px', 
                    marginBottom: '20px' 
                }}>
                    <h3>🎓 {horariosData.metadata.institucion}</h3>
                    <p><strong>Facultad:</strong> {horariosData.metadata.facultad}</p>
                    <p><strong>Carrera:</strong> {horariosData.metadata.carrera}</p>
                    <p><strong>Periodo:</strong> {horariosData.metadata.periodo}</p>
                    <p><strong>Última actualización:</strong> {horariosData.metadata.fechaActualizacion}</p>
                </div>
            )}

            {/* Lista de horarios */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {horariosData?.horarios.map((horario) => (
                    <div 
                        key={horario.id}
                        style={{
                            border: '2px solid #007bff',
                            borderRadius: '10px',
                            padding: '15px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            background: selectedHorario?.id === horario.id ? '#e3f2fd' : 'white'
                        }}
                        onClick={() => setSelectedHorario(horario)}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h3 style={{ color: '#007bff', marginTop: 0 }}>
                            {horario.materia.nombre}
                        </h3>
                        <p><strong>Código:</strong> {horario.materia.codigo}</p>
                        <p><strong>Nivel:</strong> {horario.materia.nivel}</p>
                        <p><strong>Créditos:</strong> {horario.materia.creditos}</p>
                        <p><strong>Profesor:</strong> {horario.profesor.nombre}</p>
                        <p><strong>Aula:</strong> {horario.aula.codigo} - {horario.aula.edificio}</p>
                        <p><strong>Inscritos:</strong> {horario.estudiantesInscritos}/{horario.aula.capacidad}</p>
                        <span style={{
                            background: horario.estado === 'activo' ? '#4caf50' : '#ff9800',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px'
                        }}>
                            {horario.estado.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>

            {/* Detalle del horario seleccionado */}
            {selectedHorario && (
                <div style={{
                    marginTop: '30px',
                    border: '3px solid #007bff',
                    borderRadius: '10px',
                    padding: '20px',
                    background: '#f8f9fa'
                }}>
                    <h2>📅 Horario Detallado: {selectedHorario.materia.nombre}</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                        <div>
                            <h3>📖 Información de la Materia</h3>
                            <p><strong>Código:</strong> {selectedHorario.materia.codigo}</p>
                            <p><strong>Nivel:</strong> {selectedHorario.materia.nivel}</p>
                            <p><strong>Créditos:</strong> {selectedHorario.materia.creditos}</p>
                        </div>
                        
                        <div>
                            <h3>👨‍🏫 Profesor</h3>
                            <p><strong>Nombre:</strong> {selectedHorario.profesor.nombre}</p>
                            <p><strong>Email:</strong> {selectedHorario.profesor.email}</p>
                        </div>
                        
                        <div>
                            <h3>🏢 Aula</h3>
                            <p><strong>Código:</strong> {selectedHorario.aula.codigo}</p>
                            <p><strong>Edificio:</strong> {selectedHorario.aula.edificio}</p>
                            <p><strong>Tipo:</strong> {selectedHorario.aula.tipo}</p>
                            <p><strong>Capacidad:</strong> {selectedHorario.aula.capacidad} estudiantes</p>
                        </div>
                        
                        <div>
                            <h3>📊 Estadísticas</h3>
                            <p><strong>Inscritos:</strong> {selectedHorario.estudiantesInscritos}</p>
                            <p><strong>Disponibles:</strong> {selectedHorario.aula.capacidad - selectedHorario.estudiantesInscritos}</p>
                            <p><strong>Ocupación:</strong> {Math.round((selectedHorario.estudiantesInscritos / selectedHorario.aula.capacidad) * 100)}%</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h3>🕐 Horario Semanal</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <thead>
                                <tr style={{ background: '#007bff', color: 'white' }}>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Día</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hora Inicio</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hora Fin</th>
                                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Duración (min)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedHorario.horarioSemanal.map((sesion, index) => (
                                    <tr key={index} style={{ background: index % 2 === 0 ? 'white' : '#f0f0f0' }}>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sesion.dia}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sesion.horaInicio}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sesion.horaFin}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sesion.duracion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button 
                        onClick={() => setSelectedHorario(null)}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Detalle
                    </button>
                </div>
            )}
        </div>
    );
}
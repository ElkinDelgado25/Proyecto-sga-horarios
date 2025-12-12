import { useState, useEffect } from 'react';
import { getUsersByRole } from '../../utils/authService';
import { parseHorariosXML } from '../../utils/xmlParser';
import type { Horario } from '../../utils/xmlParser';

/**
 * Componente de ejemplo que integra JSON y XML
 * - JSON: Lista de profesores
 * - XML: Horarios asignados
 */
export default function EjemploJsonXml() {
    const [profesores, setProfesores] = useState<any[]>([]);
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [selectedProfesor, setSelectedProfesor] = useState<number | null>(null);  

    useEffect(() => {
        // Cargar profesores desde JSON
        const profs = getUsersByRole('profesor');
        setProfesores(profs);

        // Cargar horarios desde XML
        loadHorarios();
    }, []);

    const loadHorarios = async () => {
        const data = await parseHorariosXML('/data/horarios.xml');
        if (data) {
            setHorarios(data.horarios);
        }
    };

    // Filtrar horarios por profesor seleccionado
    const horariosDelProfesor = selectedProfesor
        ? horarios.filter(h => h.profesor.id === selectedProfesor)
        : [];

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>🔄 Ejemplo: Integración JSON + XML</h1>
            
            <div style={{ 
                background: '#e3f2fd', 
                padding: '15px', 
                borderRadius: '8px',
                marginBottom: '20px' 
            }}>
                <h3>📚 ¿Qué hace este ejemplo?</h3>
                <p>
                    ✅ Lee <strong>profesores</strong> desde <code>users.json</code> (JSON)<br/>
                    ✅ Lee <strong>horarios</strong> desde <code>horarios.xml</code> (XML)<br/>
                    ✅ Relaciona ambos formatos por <code>profesor.id</code><br/>
                    ✅ Muestra la carga horaria de cada profesor
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                {/* PANEL IZQUIERDO: Profesores (JSON) */}
                <div>
                    <h2>👨‍🏫 Profesores (JSON)</h2>
                    <div style={{ 
                        border: '2px solid #007bff',
                        borderRadius: '8px',
                        padding: '10px',
                        background: 'white'
                    }}>
                        {profesores.map((profesor) => (
                            <div
                                key={profesor.id}
                                onClick={() => setSelectedProfesor(profesor.id)}
                                style={{
                                    padding: '15px',
                                    margin: '8px 0',
                                    background: selectedProfesor === profesor.id ? '#007bff' : '#f0f0f0',
                                    color: selectedProfesor === profesor.id ? 'white' : 'black',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <strong>{profesor.fullName}</strong><br/>
                                <small>{profesor.email}</small><br/>
                                <small>Dpto: {profesor.department}</small>
                            </div>
                        ))}
                    </div>

                    <div style={{ 
                        marginTop: '15px', 
                        padding: '10px', 
                        background: '#fff3cd',
                        borderRadius: '5px',
                        fontSize: '13px'
                    }}>
                        <strong>💡 Fuente:</strong> <code>src/data/users.json</code><br/>
                        <strong>📦 Total:</strong> {profesores.length} profesores
                    </div>
                </div>

                {/* PANEL DERECHO: Horarios del Profesor (XML) */}
                <div>
                    <h2>📅 Horarios Asignados (XML)</h2>
                    
                    {!selectedProfesor ? (
                        <div style={{ 
                            padding: '40px', 
                            textAlign: 'center',
                            background: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            <h3>👈 Selecciona un profesor</h3>
                            <p>para ver sus horarios desde XML</p>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                background: '#28a745',
                                color: 'white',
                                padding: '15px',
                                borderRadius: '8px',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{ margin: 0 }}>
                                    {profesores.find(p => p.id === selectedProfesor)?.fullName}
                                </h3>
                                <p style={{ margin: '5px 0' }}>
                                    📚 Total de materias: {horariosDelProfesor.length}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    ⏱️ Horas semanales: {
                                        horariosDelProfesor.reduce((total, h) => 
                                            total + h.horarioSemanal.reduce((sum, s) => 
                                                sum + s.duracion, 0
                                            ), 0
                                        ) / 60
                                    } horas
                                </p>
                            </div>

                            {horariosDelProfesor.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', background: '#f0f0f0', borderRadius: '8px' }}>
                                    No tiene horarios asignados
                                </div>
                            ) : (
                                horariosDelProfesor.map((horario) => (
                                    <div 
                                        key={horario.id}
                                        style={{
                                            border: '2px solid #28a745',
                                            borderRadius: '8px',
                                            padding: '15px',
                                            marginBottom: '15px',
                                            background: 'white'
                                        }}
                                    >
                                        <h3 style={{ color: '#28a745', marginTop: 0 }}>
                                            {horario.materia.nombre}
                                        </h3>
                                        <p><strong>Código:</strong> {horario.materia.codigo}</p>
                                        <p><strong>Aula:</strong> {horario.aula.codigo} - {horario.aula.edificio}</p>
                                        
                                        <div style={{ marginTop: '10px' }}>
                                            <strong>📅 Horario:</strong>
                                            {horario.horarioSemanal.map((sesion, index) => (
                                                <div 
                                                    key={index}
                                                    style={{
                                                        background: '#f8f9fa',
                                                        padding: '8px',
                                                        margin: '5px 0',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    {sesion.dia}: {sesion.horaInicio} - {sesion.horaFin} 
                                                    ({sesion.duracion} min)
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}

                            <div style={{ 
                                marginTop: '15px', 
                                padding: '10px', 
                                background: '#fff3cd',
                                borderRadius: '5px',
                                fontSize: '13px'
                            }}>
                                <strong>💡 Fuente:</strong> <code>public/data/horarios.xml</code><br/>
                                <strong>🔗 Relación:</strong> Por <code>profesor.id</code>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ESTADÍSTICAS GENERALES */}
            <div style={{
                marginTop: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <h2>📊 Estadísticas del Sistema</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '15px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', margin: '0' }}>{profesores.length}</h3>
                        <p>Profesores (JSON)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', margin: '0' }}>{horarios.length}</h3>
                        <p>Horarios (XML)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', margin: '0' }}>
                            {horarios.reduce((sum, h) => sum + h.estudiantesInscritos, 0)}
                        </h3>
                        <p>Estudiantes Inscritos</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', margin: '0' }}>
                            {new Set(horarios.map(h => h.aula.codigo)).size}
                        </h3>
                        <p>Aulas en Uso</p>
                    </div>
                </div>
            </div>

            {/* CÓDIGO DE EJEMPLO */}
            <div style={{
                marginTop: '30px',
                background: '#282c34',
                color: '#abb2bf',
                padding: '20px',
                borderRadius: '10px',
                fontFamily: 'monospace'
            }}>
                <h3 style={{ color: '#61dafb' }}>💻 Código de este ejemplo:</h3>
                <pre style={{ overflow: 'auto' }}>{`// 1. Obtener profesores desde JSON
import { getUsersByRole } from './utils/authService';
const profesores = getUsersByRole('profesor');

// 2. Obtener horarios desde XML
import { parseHorariosXML } from './utils/xmlParser';
const data = await parseHorariosXML('/data/horarios.xml');

// 3. Relacionar por ID
const horariosDelProfesor = data.horarios.filter(
  h => h.profesor.id === profesorSeleccionado
);`}</pre>
            </div>
        </div>
    );
}

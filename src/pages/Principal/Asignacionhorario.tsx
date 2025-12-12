import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseHorariosXML, exportToXML, downloadXML, type SistemaHorarios } from '../../utils/xmlParser';

export default function Asignacionhorario() {
    const navigate = useNavigate();
    const [horariosData, setHorariosData] = useState<SistemaHorarios | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHorarios();
    }, []);

    const loadHorarios = async () => {
        setLoading(true);
        const data = await parseHorariosXML('/data/horarios.xml');
        if (data) {
            setHorariosData(data);
        }
        setLoading(false);
    };

    const handleExportXML = () => {
        if (horariosData) {
            const xmlContent = exportToXML(horariosData);
            downloadXML(xmlContent, `horarios_${horariosData.metadata.periodo}.xml`);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Cargando...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>⚙️ Asignación de Horarios</h1>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    onClick={handleExportXML}
                    style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    📥 Exportar Horarios a XML
                </button>

                <button 
                    onClick={() => navigate('/principal/miscursos')}
                    style={{
                        padding: '10px 20px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    📚 Ver Mis Cursos
                </button>
            </div>

            {horariosData && (
                <div>
                    <h2>Total de horarios activos: {horariosData.horarios.length}</h2>
                    <p>Periodo: {horariosData.metadata.periodo}</p>
                </div>
            )}
        </div>
    );
}

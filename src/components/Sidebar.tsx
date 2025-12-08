function Sidebar(){
//estructura de javascript o funciones dentro


//html
return(
    <aside className="sidebar">
            <div className="sidebar-title">
            </div>
            <ul className="sidebar-menu">
                <li><a href="Home.html"><span className="sidebar-icon">🏠</span>Inicio</a></li>
                <li className="active"><a href="Mis_cursos.html"><span className="sidebar-icon">📚</span>Mis cursos</a></li>
                <li><a href="Horarios.html"><span className="sidebar-icon">🕒</span>Horarios</a></li>
                <li><a href="Notificaciones.html"><span className="sidebar-icon">🔔</span>Notificaciones</a></li>
                <li><a href="Preferencias.html"><span className="sidebar-icon">⚙️</span>Preferencias</a></li>
                <li><a href="Usuarios.html"><span className="sidebar-icon">👤</span>Usuarios</a></li>
                <li><a href="Facultades.html"><span className="sidebar-icon">🏛️</span>Facultades</a></li>
                <li><a href="Asignacion_horario.html"><span className="sidebar-icon">🗓️</span>Asignación de Horario</a></li>
            </ul>
        </aside>


    );
}

export default Sidebar;
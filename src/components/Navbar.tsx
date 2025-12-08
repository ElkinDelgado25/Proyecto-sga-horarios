function Navbar(){
    return (
        <header className="navbar-superior">
        <nav className="navbar-superior">
        <div className="navbar-left">
            <img src="../Src/Foto_uleam_pequeño.png" alt="ULEAM Logo" className="navbar-uleam-logo" />
            <span className="navbar-logo">&#9776;</span>
            <span className="navbar-title">
                Aula Virtual
                <span className="navbar-birrete"> 
                    {/* <!-- Icono de birrete estilo sólido --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{width: "28px", height: "28px", verticalAlign: "Middle"}}>
                        <path d="M256 32L0 160l256 128 208-104v112h48V160L256 32zM88 256v80c0 35.3 78.8 64 168 64s168-28.7 168-64v-80l-168 84L88 256z"/>
                    </svg>
                </span>
            </span>
        </div>
        <ul className="navbar-list">
            <li className="navbar-item"><a href="Home.html">Página Principal</a></li>
            <li className="navbar-item"><a href="Preferencias.html">Área personal</a></li>
            <li className="navbar-item"><a href="Mis_cursos.html">Mis cursos</a></li>
        </ul>
        <div className="navbar-right">
            <div className="navbar-user-dropdown">
                <span className="navbar-user-icon">US</span>
                <span className="navbar-username">Usuario</span>
                <div className="navbar-user-dropdown-content">
                    <a href="Perfil.html">Perfil</a>
                    <a href="Login.html" id="btnLogoutDropdown">Cerrar sesión</a>
                </div>
            </div>
        </div>
    </nav>
        </header>
    );

}

export default Navbar;
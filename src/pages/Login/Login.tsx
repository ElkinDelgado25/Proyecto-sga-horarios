import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authenticateUser } from "../../utils/authService";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent, _role: string) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simular delay de red (opcional)
    setTimeout(() => {
      // 🔒 Autenticación usando JSON
      const response = authenticateUser(user, password);

      if (response.success && response.user && response.token) {
        // Guardar información del usuario
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        
        // Recordar contraseña si está marcado
        if (remember) {
          localStorage.setItem("rememberedUser", user);
        }

        alert(`¡Bienvenido ${response.user.fullName}!\nRol: ${response.user.role}`);
        navigate("/principal");
      } else {
        setError(response.message);
        alert(response.message);
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "100px", background: "url('../Src/Foto_uleam_fondo.jpg') center/cover no-repeat, rgba(255,255,255,0.7)", backgroundBlendMode: "lighten" }}>
      {/* Izquierda */}
      <div className="Menu-izquierdo">
        <div className="Texto-central">
          <div className="texto">
            <h1>Sistema de Gestión de Horarios</h1>
            <p>Plataforma Integral para la Administracion de Horarios Academicos Universitarios</p>
          </div>
          <div className="Imagen">
            <img src="https://aulavirtualmoodle.uleam.edu.ec/pluginfile.php/1/theme_academi/logo/1763565310/favicon_ULEAM_2.png" alt="Logo ULEAM" />
          </div>
        </div>
      </div>
      {/* Derecha */}
      <div className="Menu-derecho">
        <div className="Encabezado-Login">
          <h2>Iniciar sesión</h2>
          <img src="/default-user.png" alt="Imagen fondo" style={{ width: 80, height: 80 }} />
          <p><strong>Bienvenido al Sistema de gestion de Horario</strong></p>
        </div>
        <div className="Formulario-Login">
          <form id="loginForm">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              required
              placeholder="Ex: Usuario@uleam.edu.ec"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              required
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <input
                type="checkbox"
                name="RecordarContraseña"
                value="SI"
                id="recordar"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="recordar" style={{ margin: 0 }}>Recordar contraseña</label>
            </div>
            {error && (
              <div style={{ color: 'red', fontSize: '14px', marginBottom: '8px' }}>
                {error}
              </div>
            )}
            <a href="#"><strong>¿Olvidaste tu contraseña?</strong></a>
            <div className="Botones-login">
              <button 
                type="button" 
                onClick={(e) => handleLogin(e, "estudiante")}
                disabled={loading}
              >
                {loading ? 'Verificando...' : 'Iniciar Sesión'}
              </button>
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              <strong>Usuarios de prueba:</strong><br/>
              admin / admin123 (Administrador)<br/>
              profesor1 / prof123 (Profesor)<br/>
              estudiante1 / est123 (Estudiante)
            </div>
          </form>
        </div>
        <div className="Footer-Login">
          <p>¿No tienes una cuenta? <a href="#">Crear Cuenta</a></p>
          <a href="#">Accede como Invitado</a>
        </div>
      </div>
    </div>
  );
}

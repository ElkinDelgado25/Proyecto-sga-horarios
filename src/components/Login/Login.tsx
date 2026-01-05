import { useState, useEffect } from "react";
import styles from "../../styles/components/login.module.css";
import userIcon from "../../assets/11284777.png";
import uleamLogo from "../../assets/Foto_uleam_pequeño.png";

interface LoginProps {
  onLogin: (role: "estudiante" | "docente" | "administrador", userName: string) => void;
}

// Simulación de base de datos de usuarios
const usersDatabase = {
  estudiantes: [
    { email: "estudiante@uleam.edu.ec", password: "123456", name: "Juan Pérez" },
    { email: "maria@uleam.edu.ec", password: "123456", name: "María García" },
  ],
  docentes: [
    { email: "docente@uleam.edu.ec", password: "123456", name: "Dr. García" },
    { email: "prof@uleam.edu.ec", password: "123456", name: "Prof. Martínez" },
  ],
  administradores: [
    { email: "admin@uleam.edu.ec", password: "123456", name: "Administrador" },
    { email: "root@uleam.edu.ec", password: "123456", name: "Root Admin" },
  ],
};

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  // Cargar credenciales guardadas al montar el componente
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedRememberMe === "true" && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const detectUserRole = (email: string, password: string): { role: "estudiante" | "docente" | "administrador" | null, userName: string } => {
    // Buscar en estudiantes
    const estudiante = usersDatabase.estudiantes.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    if (estudiante) {
      return { role: "estudiante", userName: estudiante.name };
    }

    // Buscar en docentes
    const docente = usersDatabase.docentes.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    if (docente) {
      return { role: "docente", userName: docente.name };
    }

    // Buscar en administradores
    const admin = usersDatabase.administradores.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    if (admin) {
      return { role: "administrador", userName: admin.name };
    }

    return { role: null, userName: "" };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor ingresa tu usuario y contraseña");
      return;
    }

    const { role, userName } = detectUserRole(email, password);

    if (!role) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    // Guardar o eliminar credenciales según "Recordar contraseña"
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberMe");
    }

    onLogin(role, userName);
  };

  return (
    <div className={styles.container}>
      {/* Panel Izquierdo */}
      <div className={styles.leftPanel}>
        <div className={styles.textContent}>
          <div className={styles.textColumn}>
            <h1 className={styles.title}>Sistema de Gestión de Horarios</h1>
            <p className={styles.subtitle}>Plataforma Integral para la Administración de Horarios Académicos Universitarios</p>
          </div>
          <div className={styles.imageColumn}>
            <img src={uleamLogo} alt="ULEAM Logo" className={styles.logo} />
          </div>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className={styles.rightPanel}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Iniciar sesión</h2>
          <img src={userIcon} alt="Usuario" className={styles.headerImage} />
          <p className={styles.headerText}><strong>Bienvenido al Sistema de gestión de Horario</strong></p>
        </div>

        <div className={styles.form}>
          <form onSubmit={handleLogin}>
            <label htmlFor="usuario" className={styles.label}>Usuario:</label>
            <input
              type="text"
              id="usuario"
              className={styles.input}
              placeholder="Ex: estudiante@uleam.edu.ec"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className={styles.label}>Contraseña:</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.input}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={`${styles.togglePassword} ${showPassword ? styles.visible : styles.hidden}`}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>

            {error && (
              <div style={{ color: "#dc2626", fontSize: "0.9rem", marginBottom: "10px", fontWeight: "500" }}>
                {error}
              </div>
            )}

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="recordar"
                className={styles.checkbox}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="recordar" className={styles.checkboxLabel}>Recordar contraseña</label>
            </div>

            <a href="#" className={styles.link}><strong>¿Olvidaste tu contraseña?</strong></a>

            <div className={styles.buttons}>
              <button type="submit" className={styles.button}>
                Iniciar Sesión
              </button>
            </div>

            {/* Información de usuarios de prueba */}
            <div style={{ marginTop: "20px", fontSize: "0.85rem", color: "#666", lineHeight: "1.5" }}>
              <strong>Usuarios de prueba:</strong>
              <br />📚 Estudiante: <code>estudiante@uleam.edu.ec</code>
              <br />👨‍🏫 Docente: <code>docente@uleam.edu.ec</code>
              <br />⚙️ Admin: <code>admin@uleam.edu.ec</code>
              <br />🔑 Contraseña: <code>123456</code>
            </div>
          </form>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            ¿No tienes una cuenta?
            <a href="#" className={styles.footerLink}>Crear Cuenta</a>
          </p>
          <a href="#" className={styles.footerLink}>Accede como Invitado</a>
        </div>
      </div>
    </div>
  );
}

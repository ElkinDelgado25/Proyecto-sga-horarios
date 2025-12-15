import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../utils/authService";
import styles from "../../styles/usuario/usuario.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rememberedUser = useMemo(() => localStorage.getItem("rememberedUser") ?? "", []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = authenticateUser(username, password);

    if (response.success && response.user && response.token) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      if (remember) {
        localStorage.setItem("rememberedUser", username);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      const role = (response.user.role ?? "").toLowerCase();
      // En un sistema con roles, la navegación depende del rol autenticado.
      navigate(role === "admin" ? "/admin" : "/usuario");
    } else {
      setError(response.message);
    }

    setLoading(false);
  }

  return (
    <div className={styles.center}>
      <div className={styles.loginGrid}>
        <section className={styles.panel}>
          <h1 className={styles.title}>Sistema de Gestión de Horarios</h1>
          <p className={styles.muted}>
            Accede con tus credenciales para entrar como Administrador o Usuario.
          </p>
          <p className={styles.muted}>
            Usuario recordado: <strong>{rememberedUser || "(ninguno)"}</strong>
          </p>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.subtitle}>Iniciar sesión</h2>

          <form className={styles.stack} onSubmit={handleLogin}>
            <div className={styles.stack}>
              <label className={styles.label} htmlFor="username">
                Usuario
              </label>
              <input
                className={styles.input}
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Ej: estudiante1"
                required
              />
            </div>

            <div className={styles.stack}>
              <label className={styles.label} htmlFor="password">
                Contraseña
              </label>
              <input
                className={styles.input}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="********"
                required
              />
            </div>

            <div className={styles.row}>
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
              />
              <label className={styles.label} htmlFor="remember">
                Recordar usuario
              </label>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Verificando..." : "Ingresar"}
            </button>

            <div className={styles.muted}>
              <div>
                <strong>Usuarios de prueba:</strong>
              </div>
              <div>admin / admin123 (Administrador)</div>
              <div>estudiante1 / est123 (Usuario)</div>
            </div>
          </form>
        </section>
      </div>

      {/*
        Esta estructura separa "pages/admin" y "pages/usuario" para aislar UI por rol.
        Además, CSS Modules evita colisiones porque cada clase se compila con un nombre único.
      */}
    </div>
  );
}

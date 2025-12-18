import { useState } from "react";
import styles from "../../styles/components/login.module.css";
import userIcon from "../../assets/11284777.png";
import uleamLogo from "../../assets/Foto_uleam_pequeño.png";

interface LoginProps {
  onLogin: (role: "estudiante" | "docente" | "administrador", userName: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role: "estudiante" | "docente" | "administrador") => {
    const userName = email.split("@")[0] || "Usuario";
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
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="usuario" className={styles.label}>Usuario:</label>
            <input
              type="text"
              id="usuario"
              className={styles.input}
              placeholder="Ex: Usuario@uleam.edu.ec"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className={styles.label}>Contraseña:</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="recordar" className={styles.checkbox} />
              <label htmlFor="recordar" className={styles.checkboxLabel}>Recordar contraseña</label>
            </div>

            <a href="#" className={styles.link}><strong>¿Olvidaste tu contraseña?</strong></a>

            <div className={styles.buttons}>
              <button type="button" className={styles.button} onClick={() => handleLogin("estudiante")}>
                Entrar Como Estudiante
              </button>
              <button type="button" className={styles.button} onClick={() => handleLogin("docente")}>
                Entrar Como Docente
              </button>
              <button type="button" className={styles.button} onClick={() => handleLogin("administrador")}>
                Entrar como Administrador
              </button>
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

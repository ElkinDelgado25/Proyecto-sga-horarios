import { useState } from "react";
import styles from "../../styles/components/login.module.css";
import cardStyles from "../../styles/components/card.module.css";
import buttonStyles from "../../styles/components/button.module.css";
import inputStyles from "../../styles/components/input.module.css";

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
    <div className={styles.loginContainer}>
      {/* Left Side - Image */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <h1 className={styles.leftTitle}>Sistema de Gestión de Horarios</h1>
          <p className={styles.leftDescription}>
            Plataforma integral para la administración de horarios académicos universitarios
          </p>
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop"
            alt="Education"
            className={styles.leftImage}
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={cardStyles.card}>
            <div className={cardStyles.cardHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.iconWhite}>🔐</span>
              </div>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Iniciar Sesión</h2>
                <p className={styles.formDescription}>Accede al sistema de gestión de horarios</p>
              </div>
            </div>
            <div className={cardStyles.cardContent}>
              <div className={styles.formContent}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={inputStyles.label}>
                    Usuario o Correo Electrónico
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>👤</span>
                    <input
                      id="email"
                      type="text"
                      placeholder="usuario@universidad.edu"
                      className={`${inputStyles.input} ${styles.inputWithIcon}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="password" className={inputStyles.label}>
                    Contraseña
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>🔒</span>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className={`${inputStyles.input} ${styles.inputWithIcon}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.rememberRow}>
                  <div className={styles.checkboxGroup}>
                    <input id="remember" type="checkbox" className={inputStyles.checkbox} />
                    <label htmlFor="remember" className={styles.checkboxLabel}>
                      Recordar usuario
                    </label>
                  </div>
                  <button className={`${buttonStyles.button} ${buttonStyles.link}`}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <div className={styles.fieldGroup}>
                  <p className={styles.quickAccessText}>Acceso rápido por rol (Demo):</p>
                  <div className={styles.buttonGroup}>
                    <button 
                      className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.roleButton}`}
                      onClick={() => handleLogin("estudiante")}
                    >
                      👤 Entrar como Estudiante
                    </button>
                    <button 
                      className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.roleButton}`}
                      onClick={() => handleLogin("docente")}
                    >
                      👨‍🏫 Entrar como Docente
                    </button>
                    <button 
                      className={`${buttonStyles.button} ${buttonStyles.outline} ${styles.roleButton}`}
                      onClick={() => handleLogin("administrador")}
                    >
                      👨‍💼 Entrar como Administrador
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

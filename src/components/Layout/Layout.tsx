import { useState } from "react";
import type { ReactNode } from "react";
import styles from "../../styles/components/layout.module.css";

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: "estudiante" | "docente" | "administrador";
  userName: string;
}

export function Layout({ children, currentView, onNavigate, userRole, userName }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { id: "dashboard", label: "Inicio", icon: "🏠" },
      { id: "mis-cursos", label: "Mis cursos", icon: "📚" },
      { id: "horarios", label: "Horarios", icon: "📅" },
      { id: "notificaciones", label: "Notificaciones", icon: "🔔" },
    ];

    if (userRole === "administrador") {
      return [
        ...commonItems,
        { id: "usuarios", label: "Usuarios", icon: "👥" },
        { id: "facultades", label: "Facultades y Materias", icon: "🎓" },
        { id: "asignacion", label: "Asignación de Horarios", icon: "⏰" },
      ];
    }

    if (userRole === "docente") {
      return [
        ...commonItems,
        { id: "preferencias", label: "Preferencias", icon: "⚙️" },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <button className={styles.mobileMenuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? "✕" : "☰"}
            </button>

            <div className={styles.logo}>
              <span className={styles.logoIcon}>🎓</span>
              <span className={styles.logoText}>Aula Virtual</span>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className={styles.nav}>
            <button
              className={`${styles.navButton} ${currentView === "dashboard" ? styles.navButtonActive : ""}`}
              onClick={() => onNavigate("dashboard")}
            >
              Página Principal
            </button>
            <button
              className={`${styles.navButton} ${currentView === "mis-cursos" ? styles.navButtonActive : ""}`}
              onClick={() => onNavigate("mis-cursos")}
            >
              Mis cursos
            </button>
            {userRole === "administrador" && (
              <button className={styles.navButton}>
                Administración ▼
              </button>
            )}
          </nav>

          {/* User Menu */}
          <div className={styles.userMenu}>
            <span className={styles.userName}>{userName}</span>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.875rem", fontWeight: 600 }}>
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className={`${styles.overlay} ${styles.overlayVisible}`} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarMenu}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.sidebarItem} ${currentView === item.id ? styles.sidebarItemActive : ""}`}
              onClick={() => {
                onNavigate(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className={styles.sidebarIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainWrapper}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

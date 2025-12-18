import type { ReactNode } from "react";
import styles from "../../styles/components/layout.module.css";
import uleamLogo from "../../assets/Foto_uleam_pequeño.png";

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: "estudiante" | "docente" | "administrador";
  userName: string;
  onLogout: () => void;
}

export function Layout({ children, currentView, onNavigate, userRole, userName, onLogout }: LayoutProps) {
  const getMenuItems = () => {
    const commonItems = [
      { id: "dashboard", label: "Inicio", icon: "🏠" },
      { id: "mis-cursos", label: "Mis cursos", icon: "📚" },
      { id: "horarios", label: "Horarios", icon: "🕒" },
      { id: "notificaciones", label: "Notificaciones", icon: "🔔" },
    ];

    if (userRole === "administrador") {
      return [
        ...commonItems,
        { id: "preferencias", label: "Preferencias", icon: "⚙️" },
        { id: "usuarios", label: "Usuarios", icon: "👤" },
        { id: "facultades", label: "Facultades", icon: "🏛️" },
        { id: "asignacion", label: "Asignación de Horario", icon: "🗓️" },
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
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <div style={{ background: "#f5f6fa" }}>
      {/* Navbar Superior */}
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <img src={uleamLogo} alt="ULEAM Logo" className={styles.uleamLogo} />
          <span className={styles.navbarLogo}>&#9776;</span>
          <span className={styles.navbarTitle}>
            Aula Virtual
            <span className={styles.navbarBirrete}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" style={{ width: "28px", height: "28px", verticalAlign: "middle" }}>
                <path d="M256 32L0 160l256 128 208-104v112h48V160L256 32zM88 256v80c0 35.3 78.8 64 168 64s168-28.7 168-64v-80l-168 84L88 256z"/>
              </svg>
            </span>
          </span>
        </div>
        
        <ul className={styles.navbarList}>
          <li className={currentView === "dashboard" ? styles.navbarItemActive : styles.navbarItem} onClick={() => onNavigate("dashboard")}>
            Página Principal
          </li>
          <li className={styles.navbarItem} onClick={() => onNavigate("dashboard")}>
            Área personal
          </li>
          <li className={currentView === "mis-cursos" ? styles.navbarItemActive : styles.navbarItem} onClick={() => onNavigate("mis-cursos")}>
            Mis cursos
          </li>
        </ul>

        <div className={styles.navbarRight}>
          <div className={styles.userDropdown}>
            <span className={styles.userIcon}>{userInitials}</span>
            <span className={styles.username}>{userName}</span>
            <div className={styles.userDropdownContent}>
              <a className={styles.userDropdownLink} onClick={() => onNavigate("perfil")}>Perfil</a>
              <a className={styles.userDropdownLink} onClick={onLogout}>Cerrar sesión</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <ul className={styles.sidebarMenu}>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={currentView === item.id ? styles.sidebarMenuItemActive : styles.sidebarMenuItem}
                onClick={() => onNavigate(item.id)}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

# Componentes Reutilizables - Sistema de Gestión de Horarios

## 📁 Estructura de Componentes Implementados

### 🎨 Componentes UI (src/styles/components/)
Todos los componentes usan **CSS Modules** para evitar conflictos de estilos:

- ✅ **button.module.css** - Botones con variantes (primary, outline, ghost, destructive)
- ✅ **card.module.css** - Tarjetas para contenedores
- ✅ **input.module.css** - Inputs, labels, checkboxes, textareas
- ✅ **select.module.css** - Selectores desplegables
- ✅ **badge.module.css** - Etiquetas de estado
- ✅ **table.module.css** - Tablas responsivas
- ✅ **layout.module.css** - Layout principal con navbar y sidebar

### 🧩 Componentes React (src/components/)

#### **Layout/** - Sistema de navegación completo
- Navbar superior con logo y menú de usuario
- Sidebar lateral con navegación por rol
- Responsivo con menú móvil
- Usado por: Todos los roles

#### **Login/** - Autenticación
- Diseño de dos columnas
- Login rápido por rol (demo)
- Integrado con AuthContext
- Usado por: Acceso inicial

#### **Dashboard/** - Panel principal
- Estadísticas personalizadas por rol
- Clases del día
- Accesos rápidos
- Usado por: Todos los roles (contenido diferente)

#### **MisCursos/** - Vista de cursos
- Grid de tarjetas con patrones
- Filtros y ordenamiento
- Colores distintivos por curso
- Usado por: Estudiantes y Docentes

#### **AsignacionHorarios/** - Gestión de horarios
- Formulario de asignación
- Tabla de horarios
- CRUD completo
- Usado por: Administradores

## 📋 Clasificación por Rol

### 👨‍🎓 Estudiante
- Dashboard (vista estudiante)
- MisCursos
- Horarios
- Notificaciones
- Mi Perfil

### 👨‍🏫 Docente
- Dashboard (vista docente)
- MisCursos
- Horarios
- Preferencias
- Notificaciones

### 👨‍💼 Administrador
- Dashboard (vista admin)
- AsignacionHorarios
- Gestión de Usuarios
- Facultades y Materias
- MisCursos (vista completa)

## 🚀 Rutas Implementadas

```
/demo              - Aplicación completa integrada (RECOMENDADO)
/admin/dashboard-new - Dashboard con layout nuevo
/login             - Login anterior (mantiene compatibilidad)
/admin             - Rutas admin anteriores
/usuario           - Rutas usuario anteriores
```

## 💻 Cómo Usar

### Opción 1: App Demo Completa (Recomendado)
Accede a `/demo` para ver toda la aplicación integrada con:
- Login funcional por rol
- Navegación completa
- Todos los componentes

### Opción 2: Integración Manual
Usa los componentes en tus páginas existentes:

```tsx
import { Layout } from "../../components/Layout/Layout";
import { Dashboard } from "../../components/Dashboard/Dashboard";

function MiPagina() {
  return (
    <Layout currentView="dashboard" onNavigate={handleNav} userRole="estudiante" userName="Juan">
      <Dashboard userRole="estudiante" onNavigate={handleNav} />
    </Layout>
  );
}
```

## 🎯 Características

- ✅ **CSS Modules** - Sin conflictos de estilos
- ✅ **Responsive** - Funciona en móvil, tablet y desktop
- ✅ **TypeScript** - Tipado completo
- ✅ **Roles dinámicos** - Contenido según rol de usuario
- ✅ **Navegación SPA** - Sin recargas de página
- ✅ **Componentes reutilizables** - Fácil de mantener

## 🔧 Próximos Pasos

Componentes pendientes de implementar:
- Gestión de Usuarios
- Facultades y Materias
- Preferencias Docente
- Vista de Horarios completa
- Notificaciones
- Perfil de usuario

## 📝 Notas Técnicas

- AuthContext actualizado con `loginWithRole` para demos
- Tipos centralizados en `src/types/index.ts`
- Iconos de Lucide React
- Sin dependencias de UI libraries externas

# 📚 Sistema de Gestión Académica - Horarios

Sistema completo de gestión de horarios académicos desarrollado con React + TypeScript + Vite.

## 🚀 Características Principales

### ✅ Autenticación y Roles
- Sistema de login con JSON
- 3 roles de usuario: Administrador, Profesor, Estudiante
- Gestión de sesiones con localStorage
- Protección de rutas por rol

### 📋 Funcionalidades por Rol

#### 👨‍💼 Administrador
- **Dashboard**: Vista general con estadísticas
- **Asignación de Horarios**: Formulario completo CRUD con validaciones
- **Gestión de Cursos**: Vista completa de todas las materias
- **Exportación XML**: Descarga de horarios en formato XML
- **Detección de Conflictos**: Validación de horarios duplicados

#### 👨‍🏫 Profesor / 👨‍🎓 Estudiante
- **Mis Cursos**: Vista detallada con filtros y búsqueda
- **Horarios**: Visualización semanal en tabla y lista
- **Mi Perfil**: Edición de información personal
- **Notificaciones**: Sistema de alertas académicas
- **Estadísticas**: Créditos, horas semanales, ocupación

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **CSS Modules** - Estilos con scope local
- **XML Parser** - Lectura/escritura de XML
- **JSON** - Almacenamiento de usuarios

## 📁 Estructura del Proyecto

```
sga_horarios_react123/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── AsignacionHorarios/
│   │   ├── Dashboard/
│   │   ├── Layout/
│   │   ├── Login/
│   │   └── MisCursos/
│   ├── pages/               # Páginas principales
│   │   ├── admin/          # Páginas de administrador
│   │   │   ├── AsignacionHorario.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Formulario.tsx (CRUD completo)
│   │   │   └── Miscursos.tsx
│   │   └── usuario/        # Páginas de usuario
│   │       ├── Cursos.tsx (con filtros y búsqueda)
│   │       ├── Horarios.tsx (vista tabla/lista)
│   │       ├── Miperfil.tsx (edición completa)
│   │       └── Notificaciones.tsx (sistema completo)
│   ├── utils/              # Servicios y utilidades
│   │   ├── authService.ts          # Autenticación JSON
│   │   ├── sessionService.ts       # Gestión de sesiones
│   │   ├── horariosService.ts      # Lógica de horarios
│   │   ├── notificationsService.ts # Sistema de notificaciones
│   │   ├── xmlParser.ts            # Parser XML
│   │   └── users.ts
│   ├── styles/             # CSS Modules
│   │   ├── admin/
│   │   │   └── admin.module.css
│   │   └── usuario/
│   │       └── usuario.module.css
│   ├── types/              # Definiciones TypeScript
│   │   └── index.ts
│   ├── data/               # Datos de prueba
│   │   └── users.json
│   └── routes/
│       └── AppRoutes.tsx
├── public/
│   └── data/
│       └── horarios.xml    # Datos de horarios
└── package.json
```

## 🎯 Servicios Implementados

### authService.ts
- `authenticateUser()` - Validación de credenciales
- `getAllUsers()` - Obtener todos los usuarios
- `getUsersByRole()` - Filtrar por rol
- `getUserById()` - Buscar por ID

### sessionService.ts
- `saveSession()` - Guardar sesión activa
- `getCurrentUser()` - Usuario actual
- `isAuthenticated()` - Verificar autenticación
- `logout()` - Cerrar sesión
- `updateUserInfo()` - Actualizar perfil

### horariosService.ts
- `loadHorarios()` - Cargar desde XML
- `calcularEstadisticas()` - Estadísticas generales
- `detectarConflictosProfesor()` - Validar conflictos
- `filtrarPorDia()` - Filtrar por día
- `buscarHorarios()` - Búsqueda por término
- `generarMatrizHorario()` - Vista semanal

### notificationsService.ts
- `getAllNotifications()` - Obtener todas
- `createNotification()` - Crear nueva
- `markAsRead()` - Marcar como leída
- `deleteNotification()` - Eliminar
- `getUnreadCount()` - Contar no leídas

## 👤 Usuarios de Prueba

```json
{
  "Administrador": {
    "usuario": "admin",
    "contraseña": "admin123"
  },
  "Profesor": {
    "usuario": "profesor1",
    "contraseña": "prof123"
  },
  "Estudiante": {
    "usuario": "estudiante1",
    "contraseña": "est123"
  }
}
```

## 🚀 Instalación y Uso

### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

### Acceso
1. Abrir `http://localhost:5173`
2. Usar credenciales de prueba
3. Navegar según el rol asignado

## 📊 Características Técnicas Implementadas

### JSON
- ✅ Autenticación de usuarios
- ✅ Gestión de roles
- ✅ Almacenamiento de perfiles
- ✅ Validación de credenciales

### XML
- ✅ Parser XML a TypeScript
- ✅ Lectura de horarios académicos
- ✅ Exportación a XML
- ✅ Descarga de archivos
- ✅ Visualización estructurada

### TypeScript
- ✅ Interfaces y tipos definidos
- ✅ Type safety en todo el código
- ✅ Autocompletado inteligente
- ✅ Prevención de errores en tiempo de compilación

### React
- ✅ Hooks (useState, useEffect)
- ✅ Componentes funcionales
- ✅ Props tipadas
- ✅ Event handlers
- ✅ Conditional rendering
- ✅ Lists y keys

### CSS Modules
- ✅ Estilos con scope local
- ✅ Sin conflictos de clases
- ✅ Responsive design
- ✅ Transiciones y animaciones
- ✅ Grid y Flexbox

## 🎨 Páginas Implementadas

### Usuario
1. **Cursos** - Vista completa con:
   - Grid de tarjetas
   - Búsqueda en tiempo real
   - Filtros por nivel
   - Detalles expandibles
   - Estadísticas (créditos, horas)
   - Vista de horario semanal

2. **Horarios** - Visualización con:
   - Tabla semanal (calendario)
   - Vista de lista
   - Filtros por día
   - Información de aulas
   - Datos de profesores

3. **Mi Perfil** - Gestión de:
   - Información personal
   - Datos académicos
   - Edición en línea
   - Validaciones
   - Guardado en localStorage

4. **Notificaciones** - Sistema con:
   - Tipos: info, warning, success, error
   - Prioridades: high, medium, low
   - Filtros: todas, leídas, no leídas
   - Marcar como leída
   - Eliminar notificaciones
   - Contador de no leídas

### Administrador
1. **Formulario de Asignación** - CRUD completo:
   - Información de materia
   - Asignación de profesor
   - Configuración de aula
   - Horario semanal dinámico
   - Validación de conflictos
   - Lista de horarios guardados
   - Eliminar horarios

2. **Mis Cursos (Admin)** - Vista completa:
   - Todos los horarios del sistema
   - Detalles de cada curso
   - Información de profesores
   - Sesiones semanales

3. **Asignación de Horarios** - Gestión:
   - Exportación a XML
   - Estadísticas del periodo
   - Lista de horarios activos

## 📝 Validaciones Implementadas

### Formulario de Asignación
- ✅ Campos requeridos
- ✅ Validación de créditos (1-10)
- ✅ Validación de capacidad
- ✅ Al menos una sesión requerida
- ✅ Hora fin > hora inicio
- ✅ Detección de conflictos en mismo día
- ✅ Selección de profesor obligatoria

### Perfil de Usuario
- ✅ Email válido
- ✅ Teléfono opcional
- ✅ Fecha de nacimiento
- ✅ Dirección opcional

### Notificaciones
- ✅ Filtrado por estado
- ✅ Ordenamiento por prioridad
- ✅ Persistencia en localStorage

## 🔄 Estado y Persistencia

### LocalStorage
- `currentUser` - Usuario autenticado
- `authToken` - Token de sesión
- `notifications` - Notificaciones del usuario
- `horarios_admin` - Horarios creados por admin

### Estado en Componentes
- `useState` para estado local
- `useEffect` para efectos secundarios
- Props para comunicación entre componentes

## 🎯 Próximas Mejoras (Diseño)

1. Agregar animaciones entre transiciones
2. Mejorar paleta de colores
3. Agregar modo oscuro
4. Mejorar responsive en móviles
5. Agregar iconos más modernos
6. Implementar skeleton loaders
7. Mejorar feedback visual

## 📄 Licencia

Este proyecto es académico y fue desarrollado para el curso de Aplicaciones Web.

## 👥 Autor

Desarrollado como proyecto autónomo del segundo parcial.

---

**Nota**: La lógica de todas las páginas está completamente implementada y funcional. El diseño visual puede mejorarse según las necesidades del proyecto.


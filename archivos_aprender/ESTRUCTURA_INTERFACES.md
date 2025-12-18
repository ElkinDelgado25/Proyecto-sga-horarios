# Estructura de Interfaces - Sistema de Gestión de Horarios Universitarios

## Interfaz 1: Inicio de Sesión (Login)
**Archivo:** `/components/Login.tsx`

**Descripción:**
Permite al usuario (docente, estudiante o administrador) ingresar al sistema mediante sus credenciales del Aula Virtual Moodle.

**Componentes visuales:**
- Diseño de dos columnas (izquierda: ilustración, derecha: formulario)
- Logo y branding institucional

**Campos:**
- Usuario / Correo institucional (Input text)
- Contraseña (Input password)
- Selector de rol: Estudiante / Docente / Administrador (Dropdown)
- Checkbox "Recordar mis datos"
- Botón "Iniciar sesión"
- Enlace "¿Olvidaste tu contraseña?"

**Funcionalidades:**
- Validación de credenciales
- Navegación según rol del usuario
- Diseño responsive

---

## Interfaz 2: Panel de Inicio (Dashboard)
**Archivo:** `/components/Dashboard.tsx`

**Descripción:**
Vista principal después del inicio de sesión. Muestra un resumen personalizado según el rol del usuario con estadísticas, clases del día y accesos rápidos.

**Componentes visuales:**
- 4 tarjetas de estadísticas (métricas clave)
- Tarjeta "Clases de Hoy" con lista de horarios
- Tarjeta "Accesos Rápidos" con botones de navegación

**Estadísticas mostradas por rol:**

**Estudiante:**
- Clases de Hoy
- Próxima Clase
- Materias Inscritas
- Notificaciones

**Docente:**
- Clases de Hoy
- Materias Asignadas
- Estudiantes Total
- Notificaciones

**Administrador:**
- Usuarios Activos
- Horarios Pendientes
- Facultades
- Aulas Disponibles

**Funcionalidades:**
- Vista personalizada por rol
- Acceso rápido a módulos principales
- Visualización de horarios del día actual
- Fecha actual en formato largo

---

## Interfaz 3: Mis Cursos
**Archivo:** `/components/MisCursos.tsx`

**Descripción:**
Muestra todos los cursos matriculados del estudiante o asignados al docente en formato de tarjetas visuales, similar a la interfaz de Moodle.

**Componentes visuales:**
- Panel de filtros y ordenamiento
- Grid de tarjetas de cursos con fondos coloridos y patrones geométricos
- Cada tarjeta incluye header decorativo con patrones

**Campos de búsqueda y filtros:**
- Selector de filtro: "Todos" / "En progreso" / "Completados"
- Botón "Buscar"
- Selector de ordenamiento: Por nombre / Más recientes / Más antiguos
- Selector de vista: Tarjeta / Lista

**Información por curso:**
- Nombre completo de la materia
- Código del curso
- Carrera y período
- Horarios (ejemplo: "Lunes 9:00am - 11:00am")
- Aula asignada
- Menú de opciones (Ver curso, Configuración, Ocultar)

**Funcionalidades:**
- Vista en tarjetas con colores distintivos
- Patrones decorativos (cuadrados, triángulos)
- Menú contextual por curso
- Responsive design

---

## Interfaz 4: Consulta de Horarios
**Archivo:** `/components/ConsultaHorarios.tsx`

**Descripción:**
Permite visualizar y descargar el horario académico completo en formato de tabla, con opción de filtrar por período académico.

**Componentes visuales:**
- Selector de período académico
- Tabla de horarios semanal
- Botones de acción

**Campos del selector:**
- Período: 2025-1, 2024-2, 2024-1 (Dropdown)
- Botón de actualización/refresh

**Tabla de horarios - Columnas:**
- Día (Lunes - Viernes)
- Hora (formato: 08:00 - 10:00)
- Materia
- Aula
- Docente
- Paralelo

**Botones de acción:**
- "Descargar PDF" (con ícono de descarga)
- "Generar Reporte" (con ícono de documento)

**Funcionalidades:**
- Visualización tabular de horarios
- Descarga en formato PDF
- Generación de reportes de incidencias
- Actualización en tiempo real
- Filtrado por semestre

---

## Interfaz 5: Gestión de Usuarios
**Archivo:** `/components/GestionUsuarios.tsx`

**Descripción:**
Interfaz administrativa para crear, editar y eliminar usuarios del sistema (estudiantes, docentes y personal administrativo).

**Componentes visuales:**
- Barra de búsqueda
- Tabla de usuarios
- Modal de creación/edición
- Contador de usuarios registrados

**Barra de herramientas:**
- Campo de búsqueda (busca por nombre, cédula, rol)
- Botón "Nuevo Usuario"

**Tabla de usuarios - Columnas:**
- Nombre completo
- Cédula/DNI
- Rol (Badge con color según rol)
- Facultad
- Carrera
- Acciones (Editar / Eliminar)

**Modal de creación/edición - Campos:**
- Nombre completo (Input text)
- Cédula (Input text)
- Rol (Select: Estudiante / Docente / Administrador)
- Facultad (Select)
- Carrera (Select, solo para estudiantes)
- Botón "Guardar"
- Botón "Cancelar"

**Funcionalidades:**
- Búsqueda en tiempo real
- CRUD completo de usuarios
- Validación de campos
- Confirmación de eliminación
- Filtrado por múltiples criterios
- Badges de rol con colores distintivos

---

## Interfaz 6: Gestión de Facultades y Materias
**Archivo:** `/components/GestionFacultades.tsx`

**Descripción:**
Administración de la estructura académica: facultades, carreras y materias ofrecidas por la institución.

**Componentes visuales:**
- Pestañas (Tabs): "Facultades y Carreras" / "Materias"
- Tablas con acciones CRUD
- Modales de creación/edición

**Pestaña 1: Facultades y Carreras**

**Tabla de facultades - Columnas:**
- Nombre de la Facultad
- Carreras asociadas (lista)
- Acciones (Editar / Eliminar)

**Modal de facultad - Campos:**
- Nombre de la Facultad (Input)
- Carreras (Input, separadas por coma)
- Botones: Guardar / Cancelar

**Pestaña 2: Materias**

**Tabla de materias - Columnas:**
- Código de materia
- Nombre de la materia
- Créditos
- Facultad
- Nivel/Semestre
- Acciones (Editar / Eliminar)

**Modal de materia - Campos:**
- Código de materia (Input)
- Nombre de la materia (Input)
- Créditos (Input number)
- Facultad (Select)
- Nivel/Semestre (Input)
- Botones: Guardar / Cancelar

**Funcionalidades:**
- Gestión jerárquica (Facultad → Carrera → Materia)
- CRUD completo
- Validación de campos
- Vista organizada por pestañas

---

## Interfaz 7: Asignación de Horarios
**Archivo:** `/components/AsignacionHorarios.tsx`

**Descripción:**
Permite al administrador asignar materias a docentes y definir horarios, aulas y paralelos.

**Componentes visuales:**
- Dos columnas: Formulario de asignación + Horarios asignados
- Tabla de horarios existentes

**Formulario "Nuevo Horario" - Campos:**
- Facultad (Select)
- Carrera (Select)
- Materia (Select)
- Docente (Select)
- Día de la semana (Select: Lunes - Viernes)
- Hora inicio (Time picker)
- Hora fin (Time picker)
- Aula (Input text)
- Paralelo (Input text: A, B, C...)
- Botón "Asignar Horario"

**Tabla "Horarios Asignados" - Columnas:**
- Materia
- Docente
- Horario (Día + Hora)
- Aula
- Paralelo
- Acciones (Eliminar)

**Funcionalidades:**
- Asignación de múltiples horarios
- Validación de conflictos (mismo docente, misma aula)
- Eliminación de asignaciones
- Selectores dinámicos (cascada)
- Notificaciones de éxito/error

---

## Interfaz 8: Preferencias del Docente
**Archivo:** `/components/PreferenciasDocente.tsx`

**Descripción:**
Permite a los docentes indicar sus preferencias de materias y horarios para la planificación académica.

**Componentes visuales:**
- Dos columnas
- Checkboxes para selección de materias
- Switches para disponibilidad horaria

**Columna 1: "Materias Disponibles"**

**Lista de materias seleccionables:**
- Checkbox por cada materia
- Nombre de la materia
- Facultad asociada
- Estado de selección

**Materias ejemplo:**
- Programación I
- Programación II
- Base de Datos I
- Estructuras de Datos
- Arquitectura de Computadoras
- Redes de Computadoras

**Columna 2: "Disponibilidad Horaria"**

**Bloques horarios con switches:**
- Lunes a Viernes
- Mañana (08:00 - 12:00) - Switch
- Tarde (14:00 - 18:00) - Switch
- Noche (18:00 - 22:00) - Switch

**Botones de acción:**
- "Guardar Preferencias"
- "Cancelar"

**Funcionalidades:**
- Selección múltiple de materias
- Configuración de disponibilidad por bloques
- Guardado de preferencias
- Notificaciones de confirmación

---

## Interfaz 9: Notificaciones y Reportes
**Archivo:** `/components/Notificaciones.tsx`

**Descripción:**
Centro de notificaciones del sistema y generación de reportes. Muestra cambios de horario, incidencias y actualizaciones del sistema.

**Componentes visuales:**
- Contador de notificaciones no leídas
- Lista de notificaciones con iconos
- Filtros por tipo
- Botones de acción

**Barra superior:**
- Contador: "X notificaciones sin leer"
- Botón "Generar Reporte"
- Botón "Marcar todas como leídas"

**Filtros de notificaciones:**
- Todas
- Cambios de horario
- Incidencias
- Sistema
- Reportes

**Tarjeta de notificación - Elementos:**
- Ícono según tipo (AlertCircle, AlertTriangle, Bell, FileText)
- Título de la notificación
- Descripción detallada
- Fecha y hora
- Badge con tipo de notificación
- Estado: leído/no leído (fondo diferenciado)

**Tipos de notificaciones:**
- **Cambio**: Modificaciones en horarios o aulas (azul)
- **Incidencia**: Problemas o conflictos (rojo)
- **Sistema**: Mantenimiento y actualizaciones (gris)
- **Reporte**: Informes generados (verde)

**Funcionalidades:**
- Marcar como leída individualmente
- Marcar todas como leídas
- Filtrado por tipo
- Generación de reportes
- Orden cronológico (más recientes primero)

---

## Interfaz 10: Mi Perfil
**Archivo:** `/components/Perfil.tsx`

**Descripción:**
Permite al usuario gestionar su información personal, académica y de seguridad de la cuenta.

**Componentes visuales:**
- Pestañas de navegación
- Avatar con iniciales
- Formularios de edición
- Badge de rol

**Pestañas principales:**
1. Información Personal
2. Información Académica
3. Seguridad

### Pestaña 1: "Información Personal"

**Sección Avatar:**
- Avatar circular grande (iniciales)
- Nombre completo
- Badge de rol
- Botón "Cambiar Foto"

**Campos del formulario:**
- Nombre (Input text)
- Apellido (Input text)
- Cédula/DNI (Input text)
- Fecha de Nacimiento (Date picker)
- Correo Electrónico (Input email)
- Teléfono (Input tel)
- Dirección (Input text, campo completo)

**Botones:**
- "Guardar Cambios"
- "Cancelar"

### Pestaña 2: "Información Académica"

**Para Estudiantes:**
- Carrera (Input)
- Facultad (Input)
- Número de Matrícula (Input, read-only)
- Nivel Académico (Input, read-only)

**Para Docentes:**
- Facultad (Input)
- Departamento (Input, read-only)
- Código de Docente (Input, read-only)
- Materias Asignadas (Input, read-only)

**Botones:**
- "Guardar Cambios"
- "Cancelar"

### Pestaña 3: "Seguridad"

**Sección cambio de contraseña:**
- Panel informativo (fondo azul claro)
- Texto explicativo del proceso
- Botón "Enviar Enlace de Restablecimiento"

**Sección "Actividad Reciente":**
- Lista de eventos de seguridad:
  - Último inicio de sesión (fecha, hora, dispositivo, navegador)
  - Cambio de contraseña (fecha)
  - Otros eventos de seguridad

**Funcionalidades:**
- Edición de datos personales
- Actualización de información académica
- Cambio de contraseña por email
- Visualización de actividad de cuenta
- Validación de campos
- Notificaciones de confirmación

---

## Componente Transversal: Layout
**Archivo:** `/components/Layout.tsx`

**Descripción:**
Estructura común que envuelve todas las interfaces (excepto Login). Proporciona navegación consistente.

**Componentes:**

### Navbar Superior (Header):
- Logo "Aula Virtual"
- Menú hamburguesa (móvil)
- Navegación horizontal:
  - Página Principal
  - Área personal
  - Mis cursos (resaltado en rojo cuando activo)
  - Administración (dropdown, solo admin)
- Icono de notificaciones (con indicador)
- Avatar + menú de usuario

### Menú desplegable de usuario:
- Nombre y rol del usuario
- Mi Perfil
- Configuración
- Notificaciones
- Cerrar Sesión (en rojo)

### Sidebar Izquierdo (Colapsable):
- Sección "Navegación"
- Botones de navegación según rol:

**Menú común (todos los roles):**
- Inicio
- Mis cursos
- Horarios
- Notificaciones

**Menú adicional para Administrador:**
- Usuarios
- Facultades y Materias
- Asignación de Horarios

**Menú adicional para Docente:**
- Preferencias

### Área de contenido:
- Fondo gris claro (#f7f7f9)
- Padding consistente
- Máximo ancho: 1280px (7xl)
- Centrado automático

**Funcionalidades:**
- Sidebar colapsable con overlay en móvil
- Navegación dinámica según rol
- Responsive design (hamburger en móvil)
- Estado activo visual en botones
- Sistema de enrutamiento interno

---

## Resumen de Tecnologías Utilizadas

**Componentes UI:**
- shadcn/ui (Button, Card, Table, Dialog, Select, Input, Tabs, Badge, Avatar, etc.)
- Lucide React (iconografía)
- Sonner (notificaciones toast)

**Estilos:**
- Tailwind CSS v4.0
- Colores personalizados estilo Moodle
- Sistema de tokens CSS variables
- Responsive design mobile-first

**Estructura de datos:**
- TypeScript interfaces
- Props tipadas
- Estado local con useState
- Validaciones inline

**Roles de usuario:**
1. **Estudiante**: Acceso a cursos, horarios, perfil
2. **Docente**: Acceso a cursos, horarios, preferencias, perfil
3. **Administrador**: Acceso completo (usuarios, facultades, asignación)

**Flujo de navegación:**
Login → Dashboard → [Módulos según rol] → Perfil/Configuración → Cerrar Sesión

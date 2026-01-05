# 🚀 Guía Rápida de Uso - Sistema de Gestión de Horarios

## ⚡ Inicio Rápido

### 1. Instalación
```bash
npm install
npm run dev
```

### 2. Acceso
Abrir: `http://localhost:5173`

---

## 👤 Usuarios de Prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| 👨‍💼 Administrador | `admin` | `admin123` |
| 👨‍🏫 Profesor | `profesor1` | `prof123` |
| 👨‍🎓 Estudiante | `estudiante1` | `est123` |

---

## 📱 Funcionalidades por Página

### 🏠 Para Estudiantes/Profesores

#### 📚 Mis Cursos
- **Buscar**: Escribe en el campo de búsqueda
- **Filtrar**: Selecciona un nivel del dropdown
- **Ver detalles**: Click en cualquier tarjeta de curso
- **Estadísticas**: Se muestran arriba (cursos, créditos, horas)

#### 📅 Horarios
- **Vista Tabla**: Calendario semanal completo
- **Vista Lista**: Detalles por curso
- **Cambiar vista**: Click en botón "Vista Tabla/Lista"
- **Filtrar día**: Selecciona día del dropdown

#### 👤 Mi Perfil
- **Ver información**: Datos personales y académicos
- **Editar**: Click en "✏️ Editar Perfil"
- **Guardar**: Click en "💾 Guardar Cambios"
- **Cancelar**: Click en "❌ Cancelar"

#### 🔔 Notificaciones
- **Filtrar**: Selecciona "Todas/No leídas/Leídas"
- **Marcar leída**: Click en botón "✓"
- **Eliminar**: Click en botón "🗑️"
- **Marcar todas**: Click en "Marcar todas como leídas"

---

### 🔧 Para Administradores

#### 📝 Formulario de Asignación
1. **Llenar datos de materia**
   - Nombre, código, créditos, nivel
   
2. **Seleccionar profesor**
   - Elegir del dropdown
   
3. **Configurar aula**
   - Código, edificio, capacidad, tipo
   
4. **Agregar horarios**
   - Día, hora inicio, hora fin
   - Click en "+ Agregar"
   - Repetir para cada sesión
   
5. **Guardar**
   - Click en "💾 Guardar Horario"
   - Ver en lista de horarios guardados
   
6. **Eliminar horario**
   - Click en "🗑️ Eliminar" en lista

#### 📊 Asignación de Horarios
- **Exportar XML**: Click en "Exportar XML"
- **Ver estadísticas**: Periodo y horarios activos

---

## 🎨 Atajos de Teclado

| Acción | Atajo |
|--------|-------|
| Buscar en cursos | Click en campo de búsqueda |
| Navegar con Tab | `Tab` |
| Enviar formulario | `Enter` |
| Cancelar modal | `Esc` |

---

## 💾 Datos Guardados

### LocalStorage
El sistema guarda automáticamente:
- ✅ Sesión del usuario
- ✅ Notificaciones
- ✅ Horarios creados (admin)
- ✅ Cambios de perfil

### Para limpiar datos:
```javascript
// Abrir consola del navegador (F12)
localStorage.clear()
// Recargar página
```

---

## ⚠️ Validaciones del Formulario

El formulario valida automáticamente:
- ❌ Campos requeridos vacíos
- ❌ Créditos fuera de rango (1-10)
- ❌ Capacidad inválida
- ❌ Hora fin antes de hora inicio
- ❌ Conflictos de horario en mismo día
- ❌ Sin profesor seleccionado
- ❌ Sin sesiones agregadas

---

## 🔍 Filtros y Búsqueda

### Cursos
- **Busca en**: Nombre materia, código, profesor
- **Filtra por**: Nivel académico
- **Tiempo real**: Resultados instantáneos

### Horarios
- **Filtra por**: Día de la semana
- **Vista**: Tabla o Lista

### Notificaciones
- **Filtra por**: Estado (todas, leídas, no leídas)
- **Ordena por**: Prioridad y fecha

---

## 🎯 Tips de Uso

### Para Estudiantes
1. Revisa "Mis Cursos" para ver todas tus materias
2. Usa "Horarios" para ver tu calendario semanal
3. Actualiza tu perfil con información correcta
4. Revisa notificaciones diariamente

### Para Profesores
1. Consulta tus materias asignadas
2. Verifica tu horario de clases
3. Mantén tu perfil actualizado
4. Atiende las notificaciones importantes

### Para Administradores
1. Usa el formulario para crear horarios nuevos
2. Valida que no haya conflictos
3. Exporta XML cuando sea necesario
4. Revisa la lista de horarios guardados

---

## 🐛 Solución de Problemas

### No carga los horarios
- Verifica que existe `public/data/horarios.xml`
- Recarga la página (F5)

### No guarda cambios
- Verifica que el localStorage esté habilitado
- No uses modo incógnito

### Formulario no valida
- Completa todos los campos requeridos (*)
- Verifica que las horas sean correctas
- Agrega al menos una sesión

### Notificaciones no aparecen
- Inicializa con "Crear notificaciones de prueba"
- O agrega manualmente desde el código

---

## 📞 Información Adicional

### Archivos Importantes
- **Horarios XML**: `public/data/horarios.xml`
- **Usuarios JSON**: `src/data/users.json`
- **Servicios**: `src/utils/`
- **Páginas**: `src/pages/`
- **Estilos**: `src/styles/`

### Documentación
- `README.md` - Documentación completa
- `RESUMEN_IMPLEMENTACIONES.md` - Detalles técnicos
- `COMPONENTES_IMPLEMENTADOS.md` - Componentes disponibles
- `IMPLEMENTACION_JSON_XML.md` - Uso de JSON y XML

---

## ✨ Características Destacadas

✅ **Sin servidor**: Todo funciona en el navegador  
✅ **Persistencia**: Datos guardados automáticamente  
✅ **Validaciones**: Formularios inteligentes  
✅ **Búsqueda**: Resultados instantáneos  
✅ **Responsive**: Funciona en móvil y desktop  
✅ **TypeScript**: Código tipado y seguro  
✅ **Sin dependencias pesadas**: Carga rápida  

---

## 🎉 ¡Disfruta del Sistema!

Si encuentras algún problema o tienes sugerencias, consulta la documentación completa en el README.md

**Versión**: 1.0.0  
**Última actualización**: 2 de enero de 2026

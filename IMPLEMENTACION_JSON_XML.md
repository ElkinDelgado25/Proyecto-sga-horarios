# 📋 Guía de Implementación: JSON y XML en Sistema de Horarios

## 🎯 Implementaciones Realizadas

### 1. **JSON - Sistema de Autenticación**
- **Ubicación:** `src/data/users.json`
- **Servicio:** `src/utils/authService.ts`
- **Uso:** Login de usuarios con diferentes roles

#### Usuarios de Prueba:
```json
admin / admin123      (Administrador)
profesor1 / prof123   (Profesor)
estudiante1 / est123  (Estudiante)
```

#### Funcionalidades JSON:
- ✅ Autenticación de usuarios
- ✅ Validación de credenciales
- ✅ Gestión de roles (admin, profesor, estudiante)
- ✅ Almacenamiento de información de usuario
- ✅ Token de sesión

---

### 2. **XML - Gestión de Horarios Académicos**
- **Ubicación:** `public/data/horarios.xml`
- **Servicio:** `src/utils/xmlParser.ts`
- **Uso:** Almacenamiento y consulta de horarios

#### Funcionalidades XML:
- ✅ Parser de XML a objetos TypeScript
- ✅ Visualización de horarios por materia
- ✅ Detalles de profesores, aulas y sesiones
- ✅ Exportación de horarios a XML
- ✅ Descarga de archivos XML generados

---

## 🚀 Cómo Usar

### Login con JSON

1. **Abrir la aplicación**
2. **Ingresar credenciales** (ver usuarios de prueba arriba)
3. **El sistema validará** contra `users.json`
4. **Almacena información** en localStorage

```typescript
// Ejemplo de uso del servicio
import { authenticateUser } from './utils/authService';

const response = authenticateUser('admin', 'admin123');
if (response.success) {
  console.log('Usuario:', response.user);
  console.log('Token:', response.token);
}
```

---

### Horarios con XML

#### Ver Horarios (Miscursos.tsx)
1. **Ir a "Mis Cursos"**
2. **El sistema carga** `horarios.xml` automáticamente
3. **Muestra tarjetas** de cada materia
4. **Click en una tarjeta** para ver detalles completos
5. **Visualiza** horario semanal en tabla

#### Exportar Horarios (Asignacionhorario.tsx)
1. **Ir a "Asignación de Horarios"**
2. **Click en "Exportar Horarios a XML"**
3. **Se descarga** un archivo XML con todos los horarios

```typescript
// Ejemplo de uso del parser XML
import { parseHorariosXML, exportToXML, downloadXML } from './utils/xmlParser';

// Cargar XML
const data = await parseHorariosXML('/data/horarios.xml');

// Exportar
const xmlContent = exportToXML(data);
downloadXML(xmlContent, 'mi_horario.xml');
```

---

## 📁 Estructura de Archivos

```
sga_horarios_react123/
├── src/
│   ├── data/
│   │   └── users.json              ← JSON usuarios
│   ├── utils/
│   │   ├── authService.ts          ← Servicio JSON
│   │   └── xmlParser.ts            ← Servicio XML
│   └── pages/
│       ├── Login/
│       │   └── Login.tsx           ← Usa JSON
│       └── Principal/
│           ├── Miscursos.tsx       ← Lee XML
│           └── Asignacionhorario.tsx ← Exporta XML
└── public/
    └── data/
        └── horarios.xml            ← XML horarios
```

---

## 🔧 Estructura de Datos

### JSON - Usuario
```json
{
  "id": 1,
  "username": "admin",
  "password": "admin123",
  "email": "admin@uleam.edu.ec",
  "role": "administrador",
  "fullName": "Administrador del Sistema",
  "active": true
}
```

### XML - Horario
```xml
<horario id="H001">
  <materia>
    <codigo>IS-401</codigo>
    <nombre>Programación Web</nombre>
    <creditos>4</creditos>
    <nivel>Cuarto</nivel>
  </materia>
  <profesor>
    <id>2</id>
    <nombre>Dr. Juan Pérez</nombre>
    <email>profesor1@uleam.edu.ec</email>
  </profesor>
  <aula>
    <codigo>LAB-A101</codigo>
    <edificio>Bloque A</edificio>
    <capacidad>30</capacidad>
    <tipo>Laboratorio</tipo>
  </aula>
  <horario_semanal>
    <sesion>
      <dia>Lunes</dia>
      <hora_inicio>08:00</hora_inicio>
      <hora_fin>10:00</hora_fin>
      <duracion>120</duracion>
    </sesion>
  </horario_semanal>
  <estudiantes_inscritos>28</estudiantes_inscritos>
  <estado>activo</estado>
</horario>
```

---

## 💡 Ventajas de la Implementación

### JSON:
✅ Fácil de leer y escribir  
✅ Nativo en JavaScript/TypeScript  
✅ Perfecto para APIs REST  
✅ Menor tamaño de archivo  
✅ Ideal para configuración

### XML:
✅ Estructura jerárquica clara  
✅ Validación con schemas (XSD)  
✅ Compatible con sistemas legacy  
✅ Estándar en instituciones académicas  
✅ Metadatos descriptivos

---

## 🔒 Seguridad

**⚠️ IMPORTANTE:** Esta implementación es **solo para demostración educativa**.

En producción deberías:
- ❌ NO almacenar contraseñas en texto plano
- ✅ Usar hashing (bcrypt, argon2)
- ✅ Implementar JWT real
- ✅ Validar en el backend
- ✅ Usar HTTPS
- ✅ Implementar rate limiting

---

## 🎓 Casos de Uso Académicos

1. **Exportar horarios** para impresión o respaldo
2. **Importar horarios** desde sistemas administrativos
3. **Compartir información** entre departamentos
4. **Análisis de carga horaria** docente
5. **Reportes institucionales** en formato estándar
6. **Integración con calendarios** (iCal/Google Calendar)

---

## 📝 Próximas Mejoras Sugeridas

- [ ] Validación de XML con XSD Schema
- [ ] Importar usuarios desde JSON/CSV
- [ ] Generador de reportes PDF desde XML
- [ ] API REST para CRUD de horarios
- [ ] Sincronización con base de datos
- [ ] Búsqueda avanzada en horarios
- [ ] Filtros por profesor/nivel/día
- [ ] Exportar a otros formatos (iCal, PDF)

---

## 📞 Soporte

Para más información sobre esta implementación:
- 📧 Email: soporte@uleam.edu.ec
- 📚 Documentación: Ver archivos en `src/utils/`
- 🐛 Issues: Reportar en el repositorio

---

**Desarrollado para:** Universidad Laica Eloy Alfaro de Manabí  
**Proyecto:** Sistema de Gestión de Horarios Académicos  
**Periodo:** 2025-02

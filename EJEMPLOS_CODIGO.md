# 💻 Ejemplos de Código - Sistema de Gestión de Horarios

## 📚 Tabla de Contenidos
1. [Uso de Servicios](#uso-de-servicios)
2. [Componentes React](#componentes-react)
3. [Manejo de Estado](#manejo-de-estado)
4. [TypeScript](#typescript)
5. [Validaciones](#validaciones)

---

## 🔧 Uso de Servicios

### authService - Autenticación

```typescript
import { authenticateUser, getUsersByRole } from './utils/authService';

// Autenticar usuario
const response = authenticateUser('admin', 'admin123');

if (response.success) {
  console.log('Usuario:', response.user);
  console.log('Token:', response.token);
} else {
  console.error('Error:', response.message);
}

// Obtener todos los profesores
const profesores = getUsersByRole('profesor');
console.log('Profesores:', profesores);
```

### sessionService - Gestión de Sesión

```typescript
import { 
  saveSession, 
  getCurrentUser, 
  isAuthenticated,
  logout 
} from './utils/sessionService';

// Guardar sesión después de login
saveSession(user, token);

// Verificar si hay sesión activa
if (isAuthenticated()) {
  const currentUser = getCurrentUser();
  console.log('Usuario actual:', currentUser);
}

// Cerrar sesión
logout();
```

### horariosService - Gestión de Horarios

```typescript
import { 
  loadHorarios,
  buscarHorarios,
  calcularEstadisticas,
  detectarConflictosProfesor
} from './utils/horariosService';

// Cargar horarios desde XML
const data = await loadHorarios();

// Buscar horarios
const resultados = buscarHorarios(data.horarios, 'Programación');

// Calcular estadísticas
const stats = calcularEstadisticas(data.horarios);
console.log('Total cursos:', stats.totalCursos);
console.log('Total créditos:', stats.totalCreditos);

// Detectar conflictos de un profesor
const conflictos = detectarConflictosProfesor(data.horarios, 2);
if (conflictos.length > 0) {
  console.error('Conflictos detectados:', conflictos);
}
```

### notificationsService - Sistema de Notificaciones

```typescript
import { 
  createNotification,
  getUnreadNotifications,
  markAsRead,
  deleteNotification
} from './utils/notificationsService';

// Crear notificación
const nuevaNotif = createNotification({
  type: 'warning',
  title: 'Cambio de horario',
  message: 'La clase ha sido reprogramada',
  date: new Date().toISOString().split('T')[0],
  read: false,
  priority: 'high'
});

// Obtener no leídas
const noLeidas = getUnreadNotifications();
console.log('Tienes', noLeidas.length, 'notificaciones sin leer');

// Marcar como leída
markAsRead(1);

// Eliminar notificación
deleteNotification(1);
```

---

## ⚛️ Componentes React

### Componente con Estado

```typescript
import { useState, useEffect } from 'react';

function MiComponente() {
  const [datos, setDatos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);
        // Cargar datos aquí
        const resultado = await fetchData();
        setDatos(resultado);
      } catch (err) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []); // [] = ejecutar solo una vez

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {datos.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </div>
  );
}
```

### Formulario Controlado

```typescript
import { useState } from 'react';

function FormularioEjemplo() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: 0
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Procesar datos aquí
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.nombre}
        onChange={(e) => handleChange('nombre', e.target.value)}
        placeholder="Nombre"
      />
      
      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      
      <input
        type="number"
        value={formData.edad || ''}
        onChange={(e) => handleChange('edad', Number(e.target.value))}
        placeholder="Edad"
      />
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Componente con Búsqueda y Filtros

```typescript
import { useState } from 'react';

interface Item {
  id: number;
  nombre: string;
  categoria: string;
}

function ListaConFiltros({ items }: { items: Item[] }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todas');

  // Filtrar items
  const itemsFiltrados = items.filter(item => {
    const matchBusqueda = item.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    
    const matchCategoria = 
      categoria === 'todas' || item.categoria === categoria;
    
    return matchBusqueda && matchCategoria;
  });

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar..."
      />
      
      <select 
        value={categoria} 
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="todas">Todas</option>
        <option value="cat1">Categoría 1</option>
        <option value="cat2">Categoría 2</option>
      </select>

      <div>
        {itemsFiltrados.map(item => (
          <div key={item.id}>{item.nombre}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📊 Manejo de Estado

### Estado Simple

```typescript
const [contador, setContador] = useState(0);

// Incrementar
setContador(contador + 1);

// O usando función (recomendado)
setContador(prev => prev + 1);
```

### Estado de Objeto

```typescript
const [usuario, setUsuario] = useState({
  nombre: '',
  email: '',
  edad: 0
});

// Actualizar campo específico
setUsuario({
  ...usuario,
  email: 'nuevo@email.com'
});

// O usando función
setUsuario(prev => ({
  ...prev,
  email: 'nuevo@email.com'
}));
```

### Estado de Array

```typescript
const [lista, setLista] = useState<string[]>([]);

// Agregar elemento
setLista([...lista, 'nuevo elemento']);

// Eliminar elemento por índice
setLista(lista.filter((_, idx) => idx !== indexToRemove));

// Actualizar elemento
setLista(lista.map((item, idx) => 
  idx === indexToUpdate ? 'valor actualizado' : item
));
```

### LocalStorage Persistencia

```typescript
// Guardar en localStorage
const guardarDatos = (datos: any) => {
  localStorage.setItem('misDatos', JSON.stringify(datos));
};

// Leer de localStorage
const cargarDatos = () => {
  const datos = localStorage.getItem('misDatos');
  return datos ? JSON.parse(datos) : null;
};

// Ejemplo en componente
function ComponenteConPersistencia() {
  const [datos, setDatos] = useState(() => {
    // Cargar datos iniciales desde localStorage
    const saved = localStorage.getItem('misDatos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Guardar cuando cambien los datos
    localStorage.setItem('misDatos', JSON.stringify(datos));
  }, [datos]);

  return <div>{/* Tu componente */}</div>;
}
```

---

## 🔷 TypeScript

### Interfaces

```typescript
// Interface básica
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

// Interface con propiedades opcionales
interface Perfil {
  nombre: string;
  telefono?: string;  // Opcional
  direccion?: string; // Opcional
}

// Interface que extiende otra
interface Estudiante extends Usuario {
  carrera: string;
  semestre: number;
}

// Usar interfaces
const usuario: Usuario = {
  id: 1,
  nombre: 'Juan',
  email: 'juan@email.com',
  activo: true
};
```

### Tipos Union

```typescript
// Tipo puede ser uno de varios valores
type Estado = 'activo' | 'inactivo' | 'pendiente';

// Tipo puede ser de diferentes tipos
type ID = number | string;

// Union de interfaces
type Persona = Estudiante | Profesor | Admin;
```

### Tipos Genéricos

```typescript
// Función genérica
function obtenerPrimero<T>(array: T[]): T | undefined {
  return array[0];
}

const primerNumero = obtenerPrimero([1, 2, 3]); // number
const primeraLetra = obtenerPrimero(['a', 'b', 'c']); // string

// Interface genérica
interface Respuesta<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const respuesta: Respuesta<Usuario> = {
  success: true,
  data: {
    id: 1,
    nombre: 'Juan',
    email: 'juan@email.com',
    activo: true
  }
};
```

### Props de Componentes

```typescript
// Props con interface
interface MiComponenteProps {
  titulo: string;
  datos: string[];
  onClic?: () => void; // Opcional
}

function MiComponente({ titulo, datos, onClic }: MiComponenteProps) {
  return (
    <div onClick={onClic}>
      <h1>{titulo}</h1>
      {datos.map(d => <div key={d}>{d}</div>)}
    </div>
  );
}

// Uso
<MiComponente 
  titulo="Hola" 
  datos={['a', 'b', 'c']} 
  onClic={() => console.log('Click')} 
/>
```

---

## ✅ Validaciones

### Validación de Formulario

```typescript
interface Errores {
  nombre?: string;
  email?: string;
  edad?: string;
}

function validarFormulario(datos: FormData): Errores {
  const errores: Errores = {};

  // Validar nombre
  if (!datos.nombre.trim()) {
    errores.nombre = 'El nombre es requerido';
  } else if (datos.nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!datos.email) {
    errores.email = 'El email es requerido';
  } else if (!emailRegex.test(datos.email)) {
    errores.email = 'Email inválido';
  }

  // Validar edad
  if (datos.edad < 18 || datos.edad > 100) {
    errores.edad = 'La edad debe estar entre 18 y 100';
  }

  return errores;
}

// Uso en componente
function FormularioConValidacion() {
  const [errores, setErrores] = useState<Errores>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const erroresValidacion = validarFormulario(formData);
    
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    // Procesar formulario válido
    console.log('Formulario válido');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      {errores.nombre && <span>{errores.nombre}</span>}
      {errores.email && <span>{errores.email}</span>}
    </form>
  );
}
```

### Validación de Conflictos Horarios

```typescript
function hayConflictoHorario(
  hora1Inicio: string,
  hora1Fin: string,
  hora2Inicio: string,
  hora2Fin: string
): boolean {
  // Convertir horas a minutos desde medianoche
  const convertir = (hora: string): number => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  };

  const inicio1 = convertir(hora1Inicio);
  const fin1 = convertir(hora1Fin);
  const inicio2 = convertir(hora2Inicio);
  const fin2 = convertir(hora2Fin);

  // Verificar si hay solapamiento
  return (
    (inicio1 >= inicio2 && inicio1 < fin2) ||
    (fin1 > inicio2 && fin1 <= fin2) ||
    (inicio1 <= inicio2 && fin1 >= fin2)
  );
}

// Uso
const conflicto = hayConflictoHorario(
  '08:00', '10:00',  // Clase 1
  '09:00', '11:00'   // Clase 2
);

if (conflicto) {
  console.error('¡Hay conflicto de horario!');
}
```

### Validación de Rango de Números

```typescript
function validarRango(
  valor: number,
  min: number,
  max: number,
  nombreCampo: string
): string | null {
  if (valor < min || valor > max) {
    return `${nombreCampo} debe estar entre ${min} y ${max}`;
  }
  return null;
}

// Uso
const errorCreditos = validarRango(creditos, 1, 10, 'Créditos');
const errorCapacidad = validarRango(capacidad, 1, 100, 'Capacidad');

if (errorCreditos) console.error(errorCreditos);
if (errorCapacidad) console.error(errorCapacidad);
```

---

## 🎨 Estilos con CSS Modules

```typescript
// Importar estilos
import styles from './MiComponente.module.css';

function MiComponente() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Título</h1>
      <button className={styles.button}>Botón</button>
      
      {/* Clases condicionales */}
      <div className={activo ? styles.activo : styles.inactivo}>
        Contenido
      </div>
      
      {/* Múltiples clases */}
      <div className={`${styles.card} ${styles.destacado}`}>
        Tarjeta destacada
      </div>
    </div>
  );
}
```

---

## 🔄 Efectos Secundarios

```typescript
import { useEffect } from 'react';

function ComponenteConEfectos() {
  // Ejecutar una vez al montar
  useEffect(() => {
    console.log('Componente montado');
    
    // Cleanup al desmontar
    return () => {
      console.log('Componente desmontado');
    };
  }, []);

  // Ejecutar cuando cambie una dependencia
  useEffect(() => {
    console.log('Usuario cambió:', usuario);
  }, [usuario]);

  // Ejecutar en cada render (evitar)
  useEffect(() => {
    console.log('Cada render');
  });

  // Cargar datos asíncronos
  useEffect(() => {
    async function cargar() {
      const datos = await fetchDatos();
      setDatos(datos);
    }
    
    cargar();
  }, []);

  return <div>{/* Contenido */}</div>;
}
```

---

## 🎯 Patrones Comunes

### Loading States

```typescript
function ComponenteConLoading() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No hay datos</div>;

  return <div>{/* Renderizar datos */}</div>;
}
```

### Modal/Dialog

```typescript
function Modal({ children, open, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

// Uso
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Contenido del Modal</h2>
</Modal>
```

---

**¡Estos ejemplos cubren los patrones más usados en el proyecto!**

Para más detalles, revisa el código fuente de cada componente.

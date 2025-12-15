import AppRoutes from "./routes/AppRoutes";

function App() {
  // Rutas centralizadas: separa flujos Admin/Usuario y facilita control por rol.
  // Con CSS Modules por carpeta (admin/usuario/components) se evitan choques de estilos.
  return <AppRoutes />;
}

export default App;

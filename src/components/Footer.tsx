function Footer() {
  return (
    <footer style={
      {
      background: "#f1f1f1",
      padding: "15px",
      textAlign: "center",
      marginTop: "20px"
    }
    }>
      <p>© {new Date().getFullYear()} Mi Página Web — Todos los derechos reservados</p>
    </footer>
  );
}

export default Footer;

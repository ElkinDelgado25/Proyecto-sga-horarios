import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";




export default function Principal() {
  function handleLogout() {
    localStorage.removeItem("auth");
    window.location.href = "/";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <Navbar/>
      <h1>Bienvenido al panel principal</h1>

      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <Footer />
    </div>
  );
}
  
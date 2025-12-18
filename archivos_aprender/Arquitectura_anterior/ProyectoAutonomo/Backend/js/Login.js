//Ejecucion primaria de varificador de inicion de sesion usado locastorage
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Simula login exitoso
        localStorage.setItem("usuarioActivo", "true");
        window.location.href = "Home.html"; // redirige a Home
    });
});

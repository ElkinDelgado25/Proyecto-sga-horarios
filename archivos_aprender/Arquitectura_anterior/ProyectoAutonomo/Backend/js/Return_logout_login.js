document.addEventListener("DOMContentLoaded", () => {
    // Si no hay usuario activo, ir a Login
    if (!localStorage.getItem("usuarioActivo")) {
        window.location.href = "Login.html";
    }

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "Login.html";
    });
});


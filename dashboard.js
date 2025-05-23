function showSection(sectionId) {
  // Ocultar todas las secciones
  document.querySelectorAll("main section").forEach((section) => {
    section.classList.remove("active");
  });

  // Mostrar la sección activa
  document.getElementById(sectionId).classList.add("active");

  // Actualizar menú activo
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
  });

  event.target.classList.add("active");
}

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Aquí puedes limpiar localStorage, cookies, etc.
  window.location.href = "index.html"; // volver al login
});

// Utilidades
function guardarEnStorage(nombre, datos) {
  localStorage.setItem(nombre, JSON.stringify(datos));
}

function obtenerDeStorage(nombre) {
  return JSON.parse(localStorage.getItem(nombre)) || [];
}

// Mostrar usuarios en el DOM
function mostrarUsuarios() {
  const usuarios = obtenerDeStorage("usuarios");
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  usuarios.forEach((u) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `Nombre: ${u.nombre}<br>Correo: ${u.correo}`;
    lista.appendChild(div);
  });
}

// Mostrar libros en el DOM
function mostrarLibros() {
  const libros = obtenerDeStorage("libros");
  const lista = document.getElementById("listaLibros");
  lista.innerHTML = "";

  libros.forEach((l) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `Título: ${l.titulo}<br>Autor: ${l.autor}<br>Estado: ${l.estado}`;
    lista.appendChild(div);
  });
}

// Registrar usuario
document.getElementById("formUsuario").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreUsuario").value;
  const correo = document.getElementById("correoUsuario").value;

  const usuarios = obtenerDeStorage("usuarios");
  usuarios.push({ nombre, correo });
  guardarEnStorage("usuarios", usuarios);

  mostrarUsuarios();
  this.reset();
  document.getElementById("mensajeUsuario").textContent = `Usuario "${nombre}" registrado con éxito.`;
});

// Registrar libro
document.getElementById("formLibro").addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("tituloLibro").value;
  const autor = document.getElementById("autorLibro").value;
  const estado = document.getElementById("estadoLibro").value;

  const libros = obtenerDeStorage("libros");
  libros.push({ titulo, autor, estado });
  guardarEnStorage("libros", libros);

  mostrarLibros();
  actualizarResumenLibros();
  this.reset();
  document.getElementById("mensajeLibro").textContent = `Libro "${titulo}" registrado correctamente.`;
});

// Mostrar las secciones
function showSection(sectionId) {
  document.querySelectorAll("main section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
  });

  event.target.classList.add("active");
}

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Inicialización
mostrarUsuarios();
mostrarLibros();
actualizarResumenLibros();

function actualizarResumenLibros() {
  const libros = obtenerDeStorage("libros") || [];

  const total = libros.length;
  const alquilados = libros.filter((l) => l.estado === "Alquilado").length;
  const disponibles = libros.filter((l) => l.estado === "Disponible").length;

  document.getElementById("resumenTotal").textContent = total;
  document.getElementById("resumenAlquilados").textContent = alquilados;
  document.getElementById("resumenDisponibles").textContent = disponibles;
}



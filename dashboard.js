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
async function mostrarUsuarios() {
  //const token = localStorage.getItem("jwtToken");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ";
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  try {
    const response = await fetch("https://localhost:44352/api/Users/ObtenerTodos", {
      headers: {
        "accept":"*/*",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const data = await response.json();

    // Filtrar solo usuarios NO administradores
    const usuariosNoAdmin = data.filter(u => !u.admin);

    usuariosNoAdmin.forEach((u) => {
      const div = document.createElement("div");
      div.className = "card-usuario";
      div.innerHTML = `
        <h3 class="nombre-usuario">${u.nombre}</h3>
        <p><strong>Usuario:</strong> ${u.usuario}</p>
        <p><strong>Cédula:</strong> ${u.cedula}</p>
        <p><strong>Última actualización:</strong> ${new Date(u.fecha_Actualizacion).toLocaleDateString()}</p>
      `;
      lista.appendChild(div);
    });

  } catch (error) {
    console.error("Error al mostrar usuarios:", error);
    lista.innerHTML = `<p style="color: red;">No se pudieron cargar los usuarios</p>`;
  }
}

// Mostrar libros en el DOM
async function mostrarLibros() {
  const lista = document.getElementById("listaLibros");
  lista.innerHTML = "";

  //const token = localStorage.getItem("token"); // Asegúrate de haber guardado el token después del login
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ";
console.log(token) 
try {
    const response = await fetch("https://localhost:44352/api/Books", {
      headers: {
        "accept":"*/*",
        "Authorization": "Bearer " + token
      }
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los libros");
    }

    const libros = await response.json();

    // Mostrar solo libros activos
    const librosActivos = libros.filter(libro => libro.activo);

    if (librosActivos.length === 0) {
      lista.innerHTML = "<p>No hay libros disponibles.</p>";
      return;
    }

    librosActivos.forEach((l) => {
      const div = document.createElement("div");
      div.className = "card-libro";
      div.innerHTML = `
        <h3 class="titulo-libro">${l.titulo}</h3>
        <p><strong>Autor:</strong> ${l.autor}</p>
        <p><strong>Año:</strong> ${l.ano_Publicacion}</p>
        <p><strong>Disponibles:</strong> ${l.cantidad_Disponible} / ${l.cantidad_total}</p>
      `;
      lista.appendChild(div);
    });
  } catch (error) {
    lista.innerHTML = "<p>Error al cargar libros.</p>";
    console.error(error);
  }
}

// Registrar usuario
document.getElementById("formUsuario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreUsuario").value.trim();
  const cedula = parseInt(document.getElementById("cedulaUsuario").value);
  const usuario = document.getElementById("usuarioUsuario").value.trim();
  const contrasena = document.getElementById("contrasenaUsuario").value.trim();
  const activo = true;  // Puedes ajustar si quieres poner un checkbox para activarlo

  //const token = localStorage.getItem("jwtToken");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ";
  const mensaje = document.getElementById("mensajeUsuario");

  if (!token) {
    mensaje.textContent = "No estás autenticado.";
    mensaje.style.color = "red";
    return;
  }

  try {
    const response = await fetch("https://localhost:44352/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre,
        cedula,
        usuario,
        contrasena,
        activo
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    mensaje.textContent = `Usuario "${nombre}" registrado con éxito.`;
    mensaje.style.color = "green";
    this.reset();

    // Opcional: refrescar la lista de usuarios si la tienes visible
    mostrarUsuarios();

  } catch (error) {
    mensaje.textContent = error.message;
    mensaje.style.color = "red";
  }
});

// Registrar libro
document.getElementById("formLibro").addEventListener("submit", async function (e) {
  e.preventDefault();

  const titulo = document.getElementById("tituloLibro").value.trim();
  const autor = document.getElementById("autorLibro").value.trim();
  const ano_Publicacion = parseInt(document.getElementById("anoLibro").value);
  const cantidad_total = parseInt(document.getElementById("cantidadTotalLibro").value);
  const cantidad_Disponible = parseInt(document.getElementById("cantidadDisponibleLibro").value);
  const activo = document.getElementById("activoLibro").value === "true";

  //const token = localStorage.getItem("jwtToken");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ"

  if (!token) {
    mensaje.textContent = "No estás autenticado.";
    mensaje.style.color = "red";
    return;
  }

  try {
    const response = await fetch("https://localhost:44352/api/Books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        titulo,
        autor,
        ano_Publicacion,
        cantidad_total,
        cantidad_Disponible,
        activo
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar libro");
    }

    mensaje.textContent = `Libro "${titulo}" registrado con éxito.`;
    mensaje.style.color = "green";
    this.reset();

    mostrarLibros();

  } catch (error) {
    mensaje.textContent = error.message;
    mensaje.style.color = "red";
  }
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

async function cargarLibros() {
  const select = document.getElementById("libroSelect");
  select.innerHTML = "<option value=''>Seleccionar libro</option>";

  try {
   // const token = localStorage.getItem("token");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ"

    const response = await fetch("https://localhost:44352/api/Books", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("No se pudo cargar libros");

    const libros = await response.json();
    libros.forEach(libro => {
      const option = document.createElement("option");
      option.value = libro.id;
      option.textContent = libro.titulo;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar libros:", error);
    select.innerHTML = "<option value=''>Error al cargar libros</option>";
  }
}

// Registrar préstamo
document.getElementById("formPrestamo").addEventListener("submit",async function (event) {
  event.preventDefault(); // ← esto evita que el formulario recargue la página


  var idLibro = parseInt(document.getElementById("libroSelect").value);
  var cedulaValor = parseInt(document.getElementById("cedulaUsuarioPrestamo").value);
  var mensaje = document.getElementById("mensajePrestamo");
  try {
   // const token = localStorage.getItem("token");
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ"

    const response = await fetch("https://localhost:44352/api/Loans", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idLibro: idLibro,
        cedulaUsuario: cedulaValor
      })
    });

    if (!response.ok) throw new Error("Error al registrar préstamo");

    mensaje.textContent = "Préstamo registrado con éxito.";
    mensaje.style.color = "green";
    document.getElementById("formPrestamo").reset();

  } catch (error) {
    mensaje.textContent = "Error: No se pudo registrar el préstamo.";
    mensaje.style.color = "red";
    console.error(error);
  }
});



// Inicialización
mostrarUsuarios();
mostrarLibros();
obtenerYMostrarPrestamos();
cargarLibros();

async function obtenerYMostrarPrestamos() {
  const lista = document.getElementById("listaPrestamos");
  lista.innerHTML = "Cargando préstamos...";

  try {
    //const token = localStorage.getItem("jwtToken");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJBZG1pbiI6InRydWUiLCJleHAiOjE3NDgwNTAwMjV9.W9bRi5DY9DOCUmIVpKqYHGaGdfUnd-ZkLuk80ttFMmQ";
  
    const response = await fetch("https://localhost:44352/api/Loans", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener los préstamos: " + response.status);
    }

    const prestamos = await response.json();

    // Ahora mostramos los préstamos con la función que definimos antes
    mostrarPrestamos(prestamos);

  } catch (error) {
    lista.innerHTML = "No se pudieron obtener los préstamos";
    console.error(error);
  }
}

function mostrarPrestamos(prestamos) {
  const lista = document.getElementById("listaPrestamos");
  lista.innerHTML = "";


  // Mostrar solo libros activos
  const prest = prestamos.filter(prestam => !prestam.finalizado);

  prest.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card";

    const fechaPrestamo = new Date(p.fecha_Prestamo).toLocaleString();
    const fechaDevolucion = p.fecha_Devolucion
      ? new Date(p.fecha_Devolucion).toLocaleString()
      : "No devuelto";

    div.innerHTML = `
      <strong>Libro:</strong> ${p.libro.titulo} <br>
      <strong>Autor:</strong> ${p.libro.autor} <br>
      <strong>Usuario:</strong> ${p.usuario.nombre} <br>
      <strong>Cédula:</strong> ${p.usuario.cedula} <br>
      <strong>Fecha de Préstamo:</strong> ${fechaPrestamo} <br>
      <strong>Fecha de Devolución:</strong> ${fechaDevolucion} <br>
      <strong>Estado:</strong> ${p.finalizado ? "Finalizado" : "Activo"}
    `;

    lista.appendChild(div);
  });
}
  


document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Simulación de validación (reemplazar con llamada real a backend)
    if (username === 'admin' && password === '1234') {
      window.location.href = 'dashboard.html'; // Página principal luego del login
    } else {
      document.getElementById('message').textContent = 'Credenciales incorrectas';
    }
  });
  
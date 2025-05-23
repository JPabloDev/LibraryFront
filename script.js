document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('https://localhost:44352/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
  
      const data = await response.json();
      const token = data.token; // Asegúrate de que tu API devuelve un campo llamado `token`
  
      localStorage.setItem('jwt', token); // Guardamos el token en localStorage
  
      window.location.href = 'dashboard.html'; // Redirigimos al dashboard
    } catch (error) {
      document.getElementById('message').textContent = error.message;
    }
  });
  
// source/js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const content = document.getElementById('content');
    const albumsContainer = document.getElementById('albums');
  
    loginButton.addEventListener('click', async function() {
      const username = prompt('Username:');
      const password = prompt('Password:');
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        updateUI(data.token);
      } else {
        alert('Login failed: ' + data.error);
      }
    });
  
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('token');
      location.reload();
    });
  
    async function updateUI(token) {
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
      content.style.display = 'block';
  
      const response = await fetch('http://localhost:3000/albums', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      albumsContainer.innerHTML = data.albums.map(album => `<a href="/album/${album}/" class="album">${album}</a>`).join('');
    }
  
    const token = localStorage.getItem('token');
    if (token) {
      updateUI(token);
    }
  });
  
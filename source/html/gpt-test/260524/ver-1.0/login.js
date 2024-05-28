document.getElementById('login-button').addEventListener('click', login);
document.getElementById('to-register').addEventListener('click', () => {
    window.location.href = '/html/gpt-test/260524/ver-1.0/register';
});

function login() {
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = '/html/gpt-test/260524/ver-1.0/game';
        } else {
            alert('登入失敗，請重試。');
            console.error('Login error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('登入失敗，請重試。');
    });
}

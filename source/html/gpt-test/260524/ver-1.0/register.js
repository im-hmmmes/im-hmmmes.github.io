document.getElementById('register-button').addEventListener('click', register);
document.getElementById('to-login').addEventListener('click', () => {
    window.location.href = '/html/gpt-test/260524/ver-1.0/';
});

function register() {
    const regUsername = document.getElementById('reg-username').value;
    const regPassword = document.getElementById('reg-password').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: regUsername, password: regPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('註冊成功，請登入。');
            window.location.href = '/html/gpt-test/260524/ver-1.0/';
        } else {
            alert('註冊失敗，請重試。');
            console.error('Register error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('註冊失敗，請重試。');
    });
}

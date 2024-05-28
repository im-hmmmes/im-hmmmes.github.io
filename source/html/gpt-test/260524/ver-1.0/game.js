document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('upload-score').addEventListener('click', uploadScore);

let username = ""; // 在实际应用中，应该从登录会话中获取用户名
let timeLeft = 30;
let score = 0;
let timerInterval;
let gameStarted = false;

const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('points');
const leaderboard = document.getElementById('leaderboard');

options.forEach(option => {
    option.addEventListener('click', function() {
        if (!gameStarted) {
            feedback.textContent = '請先開始遊戲！';
            feedback.style.backgroundColor = '#f7e0e0';
            feedback.style.display = 'block';
            return;
        }

        const answer = option.getAttribute('data-answer');
        if (answer === 'correct') {
            feedback.textContent = '正確！標籤 <p> 用於建立段落。';
            feedback.style.backgroundColor = '#e0f7e0';
            score += 10;
        } else {
            feedback.textContent = '錯誤。請再試一次。';
            feedback.style.backgroundColor = '#f7e0e0';
            score -= 5;
        }
        feedback.style.display = 'block';
        scoreDisplay.textContent = score;
    });
});

function startGame() {
    gameStarted = true;
    timeLeft = 30;
    score = 0;
    feedback.style.display = 'none';
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    document.getElementById('start-game').disabled = true;
    document.getElementById('upload-score').style.display = 'none';

    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('時間到！你的最終分數是：' + score);
            gameStarted = false;
            document.getElementById('start-game').disabled = false;
            document.getElementById('upload-score').style.display = 'block';
            fetchLeaderboard();
        }
    }, 1000);
}

function uploadScore() {
    fetch('/upload-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, score: score })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('分數上傳成功！');
            fetchLeaderboard();
        } else {
            alert('分數上傳失敗，請重試。');
            console.error('Upload score error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('分數上傳失敗，請重試。');
    });
}

function fetchLeaderboard() {
    fetch('/leaderboard')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            leaderboard.innerHTML = '<h2>排行榜</h2>';
            const list = document.createElement('ol');
            data.leaderboard.forEach(record => {
                const item = document.createElement('li');
                item.textContent = `${record.username}: ${record.score}`;
                list.appendChild(item);
            });
            leaderboard.appendChild(list);
        } else {
            leaderboard.innerHTML = '無法獲取排行榜。';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        leaderboard.innerHTML = '無法獲取排行榜。';
    });
}

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 4000;

const pool = new Pool({
    user: 'default',
    host: 'ep-withered-fire-a41mq5f2-pooler.us-east-1.aws.neon.tech',
    database: 'verceldb',
    password: 'AhmDSKWRJ62k',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Connected to database:', result.rows);
    });
});

app.use(bodyParser.json());

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'source', 'html', 'gpt-test', '260524', 'ver-1.0')));

// Routes for serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'source', 'html', 'gpt-test', '260524', 'ver-1.0', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'source', 'html', 'gpt-test', '260524', 'ver-1.0', 'register.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'source', 'html', 'gpt-test', '260524', 'ver-1.0', 'game.html'));
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        console.log('User registered:', result);
        res.json({ success: true });
    } catch (error) {
        console.error('Error registering user:', error);
        res.json({ success: false, message: 'Failed to register user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Invalid password' });
            }
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.json({ success: false, message: 'Failed to login' });
    }
});

app.post('/upload-score', async (req, res) => {
    const { username, score } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO scores (username, score) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET score = EXCLUDED.score',
            [username, score]
        );
        console.log('Score uploaded:', result);
        res.json({ success: true });
    } catch (error) {
        console.error('Error uploading score:', error);
        res.json({ success: false, message: 'Failed to upload score' });
    }
});

app.get('/leaderboard', async (req, res) => {
    try {
        const result = await pool.query('SELECT username, score FROM scores ORDER BY score DESC LIMIT 10');
        res.json({ success: true, leaderboard: result.rows });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.json({ success: false, message: 'Failed to fetch leaderboard' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

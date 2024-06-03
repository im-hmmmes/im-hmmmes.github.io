// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const pool = new Pool({
  user: 'default',
  host: 'ep-withered-fire-a41mq5f2-pooler.us-east-1.aws.neon.tech',
  database: 'verceldb',
  password: 'AhmDSKWRJ62k',
  port: 5432,
});

const secretKey = 'Ken63065692';

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query('SELECT * FROM user WHERE username = $1', [username]);

  if (user.rows.length > 0) {
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (validPassword) {
      const token = jwt.sign({ username: user.rows[0].username, role: user.rows[0].role }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    res.status(401).json({ error: 'User not found' });
  }
});

app.get('/albums', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    let albums = [];
    if (decoded.role === 'admin') {
      albums = ['2324秋季旅行', '2324英文話劇'];
    } else {
      albums = ['2324秋季旅行'];
    }
    res.json({ albums });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

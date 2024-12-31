import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import crypto from 'crypto-js';
import path from 'path';
import { fileURLToPath } from 'url';
import modelsRouter from './routes/models.js';
import chatRouter from './routes/chat.js';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Express instance
const port = process.env.PORT || 3333; // Listening port

app.use(express.json());

// We serve the public folder statically, which contains our index.html
app.use(express.static('public'));

// Use the modular routers
app.use('/models', modelsRouter);
app.use('/chat', chatRouter);

// Utiliser le router pour la discussion
app.use('/', chatRouter);

// Database setup
const dbPromise = open({
  filename: path.join(__dirname, '.database.sqlite'),
  driver: sqlite3.Database
});

async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS discussions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES questions(id)
    );
  `);
}

initializeDatabase();

// Endpoint to get history
app.get('/history', async (req, res) => {
  const db = await dbPromise;
  const questions = await db.all('SELECT * FROM questions ORDER BY created_at DESC');
  const decryptedQuestions = questions.map(q => ({
    ...q,
    question: crypto.AES.decrypt(q.question, 'secret-key').toString(crypto.enc.Utf8)
  }));
  res.json(decryptedQuestions);
});

// Endpoint to add a question to history
app.post('/history', async (req, res) => {
  const db = await dbPromise;
  const question = req.body.question;
  if (question) {
    const encryptedQuestion = crypto.AES.encrypt(question, 'secret-key').toString();
    await db.run('INSERT INTO questions (question) VALUES (?)', encryptedQuestion);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid question' });
  }
});

// Endpoint to delete a question from history
app.delete('/history/:id', async (req, res) => {
  const db = await dbPromise;
  const id = req.params.id;
  try {
    await db.run('DELETE FROM questions WHERE id = ?', id);
    await db.run('DELETE FROM discussions WHERE question_id = ?', id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting history item:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// Endpoint to get discussion for a question
app.get('/discussion/:questionId', async (req, res) => {
  const db = await dbPromise;
  const questionId = req.params.questionId;
  const messages = await db.all('SELECT * FROM discussions WHERE question_id = ? ORDER BY created_at', questionId);
  res.json(messages);
});

// Endpoint to add a message to a discussion
app.post('/discussion', async (req, res) => {
  const db = await dbPromise;
  const { questionId, message, role } = req.body;
  if (questionId && message && role) {
    const encryptedMessage = crypto.AES.encrypt(message, 'secret-key').toString();
    await db.run('INSERT INTO discussions (question_id, message, role) VALUES (?, ?, ?)', questionId, encryptedMessage, role);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Listening on the configured port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
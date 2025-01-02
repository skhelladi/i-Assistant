import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import crypto from 'crypto-js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import modelsRouter from './routes/models.js';
import chatRouter from './routes/chat.js';
import { cacheMiddleware, invalidateCache } from './cache.js';
import ollama from 'ollama';
import ip from 'ip'; // Import the ip module
import chalk from 'chalk'; // Import chalk for colored console output

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Express instance

const defaultPort = 3333;

// Load settings from a JSON file
const settingsPath = path.join(__dirname, 'settings.json');
let settings = { port: defaultPort };

if (fs.existsSync(settingsPath)) {
    try {
        const settingsData = fs.readFileSync(settingsPath, 'utf-8');
        settings = JSON.parse(settingsData);
    } catch (error) {
        console.error('Error reading settings file:', error);
    }
}

const port = process.env.PORT || settings.port || defaultPort;

app.use(express.json());

// We serve the public folder statically, which contains our index.html
app.use(express.static('public'));

// Use the modular routers
app.use('/models', modelsRouter);
app.use('/chat', chatRouter);

// Database setup
let db = null;

async function initializeDatabase() {
    try {
        db = await open({
            filename: path.join(__dirname, '.database.sqlite'),
            driver: sqlite3.Database
        });

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

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

// Initialiser la base de données avant de démarrer le serveur
await initializeDatabase();

// Endpoint to get history
app.get('/history', async (req, res) => {
    try {
        console.log('Fetching history...');
        const questions = await db.all('SELECT * FROM questions ORDER BY created_at DESC');
        console.log('Found questions:', questions);
        const decryptedQuestions = questions.map(q => ({
            ...q,
            question: crypto.AES.decrypt(q.question, 'secret-key').toString(crypto.enc.Utf8)
        }));
        console.log('Decrypted questions:', decryptedQuestions);
        res.json(decryptedQuestions);
    } catch (error) {
        console.error('Error getting history:', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Endpoint to add a question to history
app.post('/history', async (req, res) => {
    const question = req.body.question;
    if (question) {
        const encryptedQuestion = crypto.AES.encrypt(question, 'secret-key').toString();
        const result = await db.run('INSERT INTO questions (question) VALUES (?)', encryptedQuestion);
        res.json({ success: true, id: result.lastID });
    } else {
        res.status(400).json({ error: 'Invalid question' });
    }
});

// Endpoint to delete a question from history
app.delete('/history/:id', async (req, res) => {
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
    try {
        const questionId = req.params.questionId;
        console.log('Fetching discussion for question:', questionId);
        const messages = await db.all(
            'SELECT * FROM discussions WHERE question_id = ? ORDER BY created_at',
            questionId
        );
        console.log('Found messages:', messages);
        
        // Décrypter les messages avant de les envoyer
        const decryptedMessages = messages.map(msg => {
            try {
                return {
                    ...msg,
                    message: crypto.AES.decrypt(msg.message, 'secret-key').toString(crypto.enc.Utf8)
                };
            } catch (error) {
                console.error('Error decrypting message:', error);
                return null;
            }
        }).filter(msg => msg !== null);
        
        console.log('Decrypted messages:', decryptedMessages);
        res.json(decryptedMessages);
    } catch (error) {
        console.error('Error loading discussion:', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Endpoint to add a message to a discussion
app.post('/discussion', async (req, res) => {
    const { questionId, message, role } = req.body;
    console.log('Received message data:', { questionId, message, role }); // Debug log
    
    if (questionId && message && role) {
        try {
            const encryptedMessage = crypto.AES.encrypt(message, 'secret-key').toString();
            console.log('Encrypted message:', encryptedMessage); // Debug log
            
            await db.run(
                'INSERT INTO discussions (question_id, message, role) VALUES (?, ?, ?)',
                questionId, encryptedMessage, role
            );
            
            // Vérifier que le message a été sauvegardé
            const savedMessage = await db.get(
                'SELECT * FROM discussions WHERE question_id = ? ORDER BY id DESC LIMIT 1',
                questionId
            );
            console.log('Saved message:', savedMessage); // Debug log
            
            res.json({ success: true });
        } catch (error) {
            console.error('Error saving message:', error);
            res.status(500).json({ error: error.toString() });
        }
    } else {
        console.error('Invalid data received:', { questionId, message, role }); // Debug log
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Endpoint to update a question title
app.put('/history/:id', async (req, res) => {
    const id = req.params.id;
    const { newTitle } = req.body;
    
    if (!newTitle) {
        return res.status(400).json({ error: 'New title is required' });
    }

    try {
        // Encrypt the new title before saving
        const encryptedTitle = crypto.AES.encrypt(newTitle, 'secret-key').toString();
        await db.run('UPDATE questions SET question = ? WHERE id = ?', [encryptedTitle, id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating question title:', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Endpoint to save settings to a JSON file
app.post('/save-settings', (req, res) => {
    try {
        const newSettings = req.body;
        fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2));
        console.log('Settings saved to file:', newSettings);
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving settings to file:', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Endpoint to get the public IP address
app.get('/get-public-ip', (req, res) => {
    const publicIp = ip.address();
    res.json({ ip: publicIp });
});

// Clean shutdown handler
['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
        try {
            // Close database connection
            if (db) {
                await db.close();
                console.log('Database connection closed');
            }

            console.log(`Server stopped by ${signal}`);
            process.exit(0);
        } catch (error) {
            console.error('Error during shutdown:', error);
            process.exit(1);
        }
    });
});

// Start the server only after the database is initialized
app.listen(port, () => {
    console.log(`\n----------------------------------------`);
    console.log(`Server listening at:`);
    console.log(`----------------------------------------`);
    console.log(chalk.green(`\thttp://localhost:${port}`));
    // Log the server listening at public ip address and port
    console.log(chalk.green(`\thttp://${ip.address()}:${port}`));
    console.log(`----------------------------------------`);
    console.log(chalk.red('\nPress Ctrl+C to stop the server'));
});
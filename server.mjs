import express from 'express';
import ollama from 'ollama';
import modelsRouter from './routes/models.js';
import chatRouter from './routes/chat.js';

const app = express(); // Express instance
const port = 3333; // Listening port

app.use(express.json());

// We serve the public folder statically, which contains our index.html
app.use(express.static('public'));

// Use the modular routers
app.use('/models', modelsRouter);
app.use('/chat', chatRouter);

// Listening on the configured port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
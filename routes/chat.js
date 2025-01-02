import express from 'express';
import ollama from 'ollama';

const router = express.Router();

// Simple stockage en mémoire : { questionId: [ { role, message }, ... ] }
const discussions = {};

// We can move the activeRequests and abortControllers here or keep them in server.mjs
const activeRequests = new Map();
const abortControllers = new Map();

const questionSummary = "Always summarize the question in one sentence. ";
const defaultSystemContent = questionSummary+ "You are a helpful AI assistant, always respond in the same " +
                             "language as the user. Always add a title to your messages " +
                             "if the question is about a specific topic. Write all the "  +
                             "equations in LaTeX format.";


// POST /chat
router.post('/', async (req, res) => {
  const requestId = Date.now().toString();
  const abortController = new AbortController();
  
  try {
    const messages = [
      {
        role: 'system',
        content: req.body.options.system || defaultSystemContent
      },
      ...req.body.messages
    ];

    const modelName = req.body.model || 'llama3.2';
    console.log('Using model:', modelName);
    console.log('Messages sent to Ollama:', messages);
    console.log('Starting request:', requestId);
    activeRequests.set(requestId, true);
    abortControllers.set(requestId, abortController);

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    res.write(`data: ${JSON.stringify({requestId})}\n\n`);

    const response = await ollama.chat({ 
      model: modelName,
      messages: messages,
      stream: req.body.stream,
      options: {
        temperature: req.body.options.temperature,
        system: req.body.options.system
      },
      signal: abortController.signal
    });

    for await (const part of response) {
      if (!activeRequests.has(requestId)) {
        console.log('Request canceled:', requestId);
        break;
      }
      if (part.message?.content) {
        const formattedText = part.message.content;
        res.write(`data: ${JSON.stringify({content: formattedText})}\n\n`);
      }
    }

    activeRequests.delete(requestId);
    res.end();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request canceled by the user:', requestId);
    } else {
      console.error('Ollama error:', error);
      res.status(500).json({ error: error.toString() });
    }
  } finally {
    activeRequests.delete(requestId);
    abortControllers.delete(requestId);
    res.end();
  }
});

router.post('/stop', async (req, res) => {
  try {
    const requestId = req.body.requestId;
    if (activeRequests.has(requestId)) {
      const controller = abortControllers.get(requestId);
      if (controller) {
        controller.abort();
      }
      activeRequests.delete(requestId);
      abortControllers.delete(requestId);
      return res.json({ success: true });
    }
    return res.status(404).json({ error: 'Request not found' });
  } catch (error) {
    console.error('Error stopping request:', error);
    res.status(500).json({ error: error.toString() });
  }
});

export default router;


import express from 'express';
import ollama from 'ollama';

const router = express.Router();

// GET /models
router.get('/', async (req, res) => {
  try {
    const models = await ollama.list();
    res.json(models);
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
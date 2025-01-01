import express from 'express';
import ollama from 'ollama';
import { cacheMiddleware } from '../cache.js';

const router = express.Router();

// Mettre en cache la liste des modèles pendant 5 minutes
router.get('/', cacheMiddleware(300), async (req, res) => {
    try {
        const models = await ollama.list();
        res.json(models);
    } catch (error) {
        console.error('Error listing models:', error);
        res.status(500).json({ error: error.toString() });
    }
});

export default router;
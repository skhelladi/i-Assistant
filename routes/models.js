import express from 'express';
import ollama from 'ollama';
import { cacheMiddleware } from '../cache.js';

const router = express.Router();

// Function to stop an Ollama model using the direct REST API
async function stopModel(modelName) {
    try {
        // Use the correct API endpoint for stopping models
        await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelName,
                prompt: '',
                stream: false,
                raw: true,
                options: {
                    stop: true
                }
            })
        });

        console.log(`Model "${modelName}" stopped`);
        return true;
    } catch (error) {
        console.error(`Error stopping model "${modelName}":`, error);
        return false;
    }
}

// Get models list (cached)
router.get('/', cacheMiddleware(300), async (req, res) => {
    try {
        const models = await ollama.list();
        res.json(models);
    } catch (error) {
        console.error('Error listing models:', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Stop the current model and select a new one
router.post('/select', async (req, res) => {
    try {
        const { modelName, previousModel } = req.body;
        
        if (previousModel) {
            await stopModel(previousModel);
        }
        
        console.log(`Selecting new model: ${modelName}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error switching models:', error);
        res.status(500).json({ error: error.toString() });
    }
});

export default router;
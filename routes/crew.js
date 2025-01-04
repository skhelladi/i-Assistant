import express from 'express';
import { AgentTeam } from '../agents/agentManager.js';

const router = express.Router();
const teams = new Map();

// Endpoint pour créer un équipage
router.post('/create', async (req, res) => {
    try {
        const { agents: agentsData, tasks: tasksData, executionConfig } = req.body;
        const team = new AgentTeam();

        // Créer les agents
        for (const agentData of agentsData) {
            await team.addAgent(agentData);
        }

        // Générer un ID unique pour l'équipage
        const crewId = Date.now().toString();
        teams.set(crewId, { team, tasks: tasksData, config: executionConfig });

        res.json({ 
            id: crewId,
            message: 'Crew created successfully',
            agentsCount: agentsData.length,
            tasksCount: tasksData.length
        });

    } catch (error) {
        console.error('Error creating crew:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint pour exécuter les tâches
router.post('/execute', async (req, res) => {
    try {
        const { crewId, query } = req.body;
        
        const crew = teams.get(crewId);
        if (!crew) {
            throw new Error('Crew not found');
        }

        const results = await crew.team.executeQuery(query);

        res.json({
            status: 'success',
            results
        });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint pour obtenir le statut d'un équipage
router.get('/status/:crewId', (req, res) => {
    try {
        const { crewId } = req.params;
        const crew = teams.get(crewId);
        
        if (!crew) {
            return res.status(404).json({ error: 'Crew not found' });
        }

        res.json({
            status: 'active',
            agentsCount: crew.team.agents.length,
            tasksCount: crew.tasks.length
        });

    } catch (error) {
        console.error('Error getting crew status:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint pour annuler l'exécution d'un équipage
router.post('/cancel/:crewId', async (req, res) => {
    try {
        const { crewId } = req.params;
        
        if (!teams.has(crewId)) {
            return res.status(404).json({ error: 'Crew not found' });
        }

        teams.delete(crewId);
        res.json({ message: 'Crew execution cancelled' });

    } catch (error) {
        console.error('Error cancelling crew:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router; 
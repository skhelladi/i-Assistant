import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { Tool } from "@langchain/core/tools";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";

// Outils disponibles pour les agents
const createTools = (toolNames) => {
    const availableTools = {
        web_search: new Tool({
            name: "web_search",
            description: "Search the web for information",
            func: async (query) => {
                // Implémentez votre logique de recherche web ici
                return `Results for: ${query}`;
            }
        }),
        code_analysis: new Tool({
            name: "code_analysis",
            description: "Analyze code and provide insights",
            func: async (code) => {
                // Implémentez votre logique d'analyse de code ici
                return `Analysis of: ${code}`;
            }
        }),
        data_processing: new Tool({
            name: "data_processing",
            description: "Process and analyze data",
            func: async (data) => {
                // Implémentez votre logique de traitement de données ici
                return `Processed data: ${data}`;
            }
        }),
        file_operations: new Tool({
            name: "file_operations",
            description: "Perform file operations",
            func: async (command) => {
                // Implémentez votre logique d'opérations sur les fichiers ici
                return `File operation: ${command}`;
            }
        })
    };

    return toolNames.map(name => availableTools[name]).filter(Boolean);
};

// Création d'un agent Langchain
export const createLangchainAgent = async (agentConfig) => {
    const model = new ChatOllama({
        baseUrl: "http://localhost:11434",
        model: agentConfig.model,
        temperature: agentConfig.temperature
    });

    const tools = createTools(agentConfig.tools);

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `
            Role: ${agentConfig.role}
            Goal: ${agentConfig.goal}
            Backstory: ${agentConfig.backstory}
            
            You are an AI assistant that helps with various tasks.
            You have access to the following tools:
            ${tools.map(tool => `- ${tool.name}: ${tool.description}`).join('\n')}
        `],
        ["human", "{input}"],
        new MessagesPlaceholder("agent_scratchpad"),
    ]);

    const agent = await createOpenAIFunctionsAgent({
        llm: model,
        tools,
        prompt
    });

    const executor = new AgentExecutor({
        agent,
        tools,
        verbose: agentConfig.verbose
    });

    return {
        id: agentConfig.id,
        name: agentConfig.name,
        executor: executor
    };
};

// Gestion de l'équipe d'agents
export class AgentTeam {
    constructor() {
        this.agents = new Map();
    }

    async addAgent(agentConfig) {
        const agent = await createLangchainAgent(agentConfig);
        this.agents.set(agent.id, agent);
        return agent;
    }

    async executeQuery(query, agentIds = null) {
        const results = [];
        const targetAgents = agentIds 
            ? agentIds.map(id => this.agents.get(id)).filter(Boolean)
            : Array.from(this.agents.values());

        for (const agent of targetAgents) {
            try {
                const result = await agent.executor.invoke({ 
                    input: query
                });
                
                results.push({
                    taskId: `query-${Date.now()}`,
                    agentId: agent.id,
                    output: result.output
                });
            } catch (error) {
                results.push({
                    taskId: `query-${Date.now()}`,
                    agentId: agent.id,
                    output: `Error: ${error.message}`,
                    error: true
                });
            }
        }

        return results;
    }

    removeAgent(agentId) {
        return this.agents.delete(agentId);
    }

    clear() {
        this.agents.clear();
    }
} 
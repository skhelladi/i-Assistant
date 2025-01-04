(function(window) {
    'use strict';

    // Base UI Components
    const Input = ({ className = '', ...props }) => (
        <input
            className={`agent-input w-full p-2 rounded ${className}`}
            {...props}
        />
    );

    const Button = ({ className = '', children, ...props }) => (
        <button
            className={`agent-button p-2 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    );

    const Card = ({ children, className }) => (
        <div className={`agent-card shadow-lg rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );

    const CardHeader = ({ children }) => (
        <div
            className="mb-4 agent-card flex items-center justify-between"
            style={{
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem'
            }}
        >
            {children}
        </div>
    );

    const CardContent = ({ children }) => (
        <div className="p-4 agent-card">
            {children}
        </div>
    );

    // Icons (simple SVG components)
    const Plus = ({ className }) => (
        <svg 
            className={className} 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );

    const RefreshCw = ({ className }) => (
        <svg 
            className={className} 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
        >
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
    );

    // Composant pour la saisie des requêtes
    const QueryInput = ({ onSubmit }) => {
        const [query, setQuery] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (query.trim()) {
                onSubmit(query);
                setQuery('');
            }
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="4"
                    placeholder="Enter your query for the agent crew..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                    type="submit"
                    className="agent-button w-full p-2 rounded"
                >
                    Submit Query
                </button>
            </form>
        );
    };

    // Composant pour afficher les résultats
    const ResultsViewer = ({ results }) => {
        if (!results.length) return null;

        return (
            <div className="space-y-4">
                {results.map((result, index) => (
                    <Card key={index} className={`p-4 ${result.error ? 'border-red-500' : ''}`}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">
                                    Tâche: {result.taskId}
                                </h4>
                                <span className={`text-sm ${result.error ? 'text-red-500' : 'text-gray-500'}`}>
                                    Agent: {result.agentId}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={`whitespace-pre-wrap ${result.error ? 'text-red-500' : ''}`}>
                                {result.output}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    // Ajout d'un nouveau composant pour la configuration des agents
    const AgentConfigPanel = ({ agent, onUpdate }) => {
        return (
            <div className="space-y-4 border rounded p-4">
                <h3 className="font-bold">{agent.name || 'Nouvel Agent'}</h3>
                
                {/* Configuration du modèle de langage */}
                <div className="form-group">
                    <label>Configuration LLM</label>
                    <div className="space-y-2">
                        <select 
                            className="agent-input w-full"
                            value={agent.model}
                            onChange={e => onUpdate({...agent, model: e.target.value})}
                        >
                            <option value="">Sélectionner un modèle</option>
                            {llmModels.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                        <input 
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={agent.temperature}
                            onChange={e => onUpdate({
                                ...agent, 
                                temperature: parseFloat(e.target.value)
                            })}
                            className="w-full"
                        />
                        <span>Température: {agent.temperature}</span>
                    </div>
                </div>

                {/* Configuration de la mémoire */}
                <div className="form-group">
                    <label>Configuration de la mémoire</label>
                    <div className="space-y-2">
                        <select
                            className="agent-input w-full"
                            value={agent.memory.type}
                            onChange={e => onUpdate({
                                ...agent,
                                memory: { ...agent.memory, type: e.target.value }
                            })}
                        >
                            <option value="buffer">Buffer Memory</option>
                            <option value="summary">Summary Memory</option>
                            <option value="conversation">Conversation Memory</option>
                        </select>
                        <input 
                            type="number"
                            className="agent-input w-full"
                            value={agent.memory.maxSize}
                            onChange={e => onUpdate({
                                ...agent,
                                memory: { ...agent.memory, maxSize: parseInt(e.target.value) }
                            })}
                            placeholder="Taille maximale de la mémoire"
                        />
                    </div>
                </div>

                {/* Configuration des outils */}
                <div className="form-group">
                    <label>Outils disponibles</label>
                    <div className="space-y-2">
                        {['web_search', 'code_analysis', 'data_processing', 'file_operations'].map(tool => (
                            <label key={tool} className="flex items-center gap-2">
                                <input 
                                    type="checkbox"
                                    checked={agent.tools.includes(tool)}
                                    onChange={e => {
                                        const tools = e.target.checked 
                                            ? [...agent.tools, tool]
                                            : agent.tools.filter(t => t !== tool);
                                        onUpdate({...agent, tools});
                                    }}
                                />
                                {tool.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Composant ExecutionViewer mis à jour
    const ExecutionViewer = ({ agents, tasks, onExecute }) => {
        const [executionResults, setExecutionResults] = React.useState([]);
        const [isExecuting, setIsExecuting] = React.useState(false);
        const [currentStep, setCurrentStep] = React.useState(null);
        const [crewId, setCrewId] = React.useState(null);
        const [error, setError] = React.useState(null);
        const [progress, setProgress] = React.useState({});
        
        const updateProgress = (agentId, status) => {
            setProgress(prev => ({
                ...prev,
                [agentId]: status
            }));
        };

        const handleQuerySubmit = async (query) => {
            setIsExecuting(true);
            setError(null);
            try {
                // Créer l'équipage si nécessaire
                if (!crewId) {
                    updateProgress('system', 'Création de l\'équipage...');
                    const createResponse = await fetch('/api/crew/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            agents,
                            tasks: [...tasks, {
                                id: `task-${Date.now()}`,
                                description: query,
                                agentId: agents[0]?.id,
                                expectedOutput: 'Réponse textuelle',
                                context: {},
                                priority: 1
                            }]
                        })
                    });

                    if (!createResponse.ok) {
                        throw new Error('Échec de la création de l\'équipage');
                    }

                    const { id } = await createResponse.json();
                    setCrewId(id);
                }

                // Exécuter la requête
                updateProgress('system', 'Exécution de la requête...');
                const executeResponse = await fetch('/api/crew/execute', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        crewId,
                        query
                    })
                });

                if (!executeResponse.ok) {
                    throw new Error('Échec de l\'exécution');
                }

                const { results } = await executeResponse.json();
                
                // Mettre à jour les résultats et le progrès
                results.forEach(result => {
                    updateProgress(result.agentId, 'Terminé');
                });
                
                setExecutionResults(prev => [...prev, ...results]);

            } catch (error) {
                setError(error.message);
                updateProgress('system', 'Erreur');
                console.error('Erreur d\'exécution:', error);
            } finally {
                setIsExecuting(false);
            }
        };

        const handleCancel = async () => {
            if (crewId) {
                try {
                    await fetch(`/api/crew/cancel/${crewId}`, { method: 'POST' });
                    setCrewId(null);
                    setCurrentStep(null);
                } catch (error) {
                    console.error('Erreur lors de l\'annulation:', error);
                }
            }
        };

        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-bold">Execute Crew</h2>
                        {isExecuting && (
                            <button 
                                onClick={handleCancel}
                                className="agent-button bg-red-500 hover:bg-red-600"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Statut d'exécution */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Statut</h3>
                                {isExecuting && <RefreshCw className="animate-spin" />}
                            </div>
                            {currentStep && (
                                <p className="mt-2">Current Step: {currentStep}</p>
                            )}
                            {error && (
                                <p className="text-red-500 mt-2">Error : {error}</p>
                            )}
                        </div>

                        {/* New Query */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">New Query</h3>
                            <QueryInput onSubmit={handleQuerySubmit} />
                        </div>

                        {/* Résultats */}
                        {executionResults.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Results</h3>
                                <ResultsViewer results={executionResults} />
                            </div>
                        )}

                        {/* Progress */}
                        <div className="space-y-4">
                            {Object.entries(progress).map(([agentId, status]) => (
                                <div key={agentId} className="flex items-center justify-between">
                                    <span>{agentId === 'system' ? 'Système' : 
                                        agents.find(a => a.id === agentId)?.name || agentId}</span>
                                    <span className={`px-2 py-1 rounded ${
                                        status === 'Finished' ? 'bg-green-500' : 
                                        status === 'Error' ? 'bg-red-500' : 'bg-blue-500'
                                    } text-white`}>
                                        {status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    window.AgentUI = function AgentUI() {
        console.log('Rendering AgentUI component');
        const [agents, setAgents] = React.useState([]);
        const [tasks, setTasks] = React.useState([]);
        const [currentView, setCurrentView] = React.useState('agents');
        
        const [newAgent, setNewAgent] = React.useState({
            id: '',
            name: '',
            role: '',
            goal: '',
            backstory: '',
            tools: [],
            model: 'llama3.2:3b',
            temperature: 0.7,
            verbose: true,
            allowDelegation: false,
            memory: {
                type: 'buffer',
                maxSize: 10
            }
        });

        const [newTask, setNewTask] = React.useState({
            id: '',
            description: '',
            agentId: '',
            expectedOutput: '',
            context: {},
            dependencies: [],
            priority: 1,
            deadline: null
        });

        const [executionConfig, setExecutionConfig] = React.useState({
            taskSequence: [],
            maxRetries: 3,
            timeout: 30000
        });

        const [llmModels, setLlmModels] = React.useState([]); // Add state for LLM models

        React.useEffect(() => {
            const fetchLlmModels = async () => {
                try {
                    const response = await fetch('/api/ollama/models');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (Array.isArray(data.models)) {
                        setLlmModels(data.models);
                        // Si des modèles sont disponibles, mettre à jour le modèle par défaut
                        if (data.models.length > 0) {
                            setNewAgent(prev => ({
                                ...prev,
                                model: data.models[0]
                            }));
                        }
                    } else {
                        console.error('Models data is not an array:', data);
                        setLlmModels([]);
                    }
                } catch (error) {
                    console.error('Failed to fetch LLM models:', error);
                    setLlmModels([]);
                }
            };

            fetchLlmModels();
        }, []);

        // Fonctions de gestion des agents
        const addAgent = () => {
            if (newAgent.id && newAgent.role) {
                setAgents([...agents, { ...newAgent }]);
                setNewAgent({
                    id: '',
                    name: '',
                    role: '',
                    goal: '',
                    backstory: '',
                    tools: [],
                    model: 'llama3.2:3b',
                    temperature: 0.7,
                    verbose: true,
                    allowDelegation: false,
                    memory: {
                        type: 'buffer',
                        maxSize: 10
                    }
                });
            }
        };

        const renderAgentForm = () => (
            <div className="space-y-4">
                <input 
                    className="agent-input w-full p-2 rounded"
                    placeholder="Agent Name"
                    value={newAgent.name}
                    onChange={e => setNewAgent({...newAgent, name: e.target.value})}
                />
                <input 
                    className="agent-input w-full p-2 rounded"
                    placeholder="Agent ID"
                    value={newAgent.id}
                    onChange={e => setNewAgent({...newAgent, id: e.target.value})}
                />
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Role (e.g., Senior Python Developer, Data Analyst...)"
                    value={newAgent.role}
                    onChange={e => setNewAgent({...newAgent, role: e.target.value})}
                />
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Goal (What should this agent achieve?)"
                    value={newAgent.goal}
                    onChange={e => setNewAgent({...newAgent, goal: e.target.value})}
                />
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Backstory (Agent's experience and context)"
                    value={newAgent.backstory}
                    onChange={e => setNewAgent({...newAgent, backstory: e.target.value})}
                />
                <div className="form-group">
                    <label>Tools</label>
                    <select 
                        multiple
                        className="agent-input w-full p-2 rounded"
                        value={newAgent.tools}
                        onChange={e => setNewAgent({
                            ...newAgent, 
                            tools: Array.from(e.target.selectedOptions, option => option.value)
                        })}
                    >
                        <option value="web_search">Web Search</option>
                        <option value="code_analysis">Code Analysis</option>
                        <option value="data_processing">Data Processing</option>
                        <option value="file_operations">File Operations</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>LLM Model</label>
                    <select 
                        className="agent-input w-full p-2 rounded"
                        value={newAgent.model}
                        onChange={e => setNewAgent({...newAgent, model: e.target.value})}
                    >
                        <option value="">Select LLM Model</option>
                        {llmModels.length > 0 ? (
                            llmModels.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))
                        ) : (
                            <option value="" disabled>Loading models...</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Temperature (Creativity)</label>
                    <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={newAgent.temperature}
                        onChange={e => setNewAgent({...newAgent, temperature: parseFloat(e.target.value)})}
                        className="w-full"
                    />
                    <span>{newAgent.temperature}</span>
                </div>
                <div className="form-group">
                    <label className="flex items-center gap-2">
                        <input 
                            type="checkbox"
                            checked={newAgent.allowDelegation}
                            onChange={e => setNewAgent({...newAgent, allowDelegation: e.target.checked})}
                        />
                        Allow Task Delegation
                    </label>
                </div>
                <button 
                    onClick={addAgent} 
                    className="agent-button w-full p-2 rounded flex items-center justify-center"
                >
                    <Plus className="mr-2" />Add Agent
                </button>
            </div>
        );

        const renderAgentList = () => (
            <div className="space-y-4">
                {agents.map(agent => (
                    <Card key={agent.id} className="p-4">
                        <h3 className="font-bold">{agent.role}</h3>
                        <p>ID: {agent.id}</p>
                        <p>Goal: {agent.goal}</p>
                        <p>Model: {agent.model}</p>
                    </Card>
                ))}
            </div>
        );

        // Fonctions de gestion des tâches
        const addTask = () => {
            if (newTask.id && newTask.description) {
                setTasks([...tasks, { ...newTask }]);
                setNewTask({
                    id: '',
                    description: '',
                    agentId: '',
                    expectedOutput: '',
                    context: {},
                    dependencies: [],
                    priority: 1,
                    deadline: null
                });
            }
        };

        const renderTaskForm = () => (
            <div className="space-y-4">
                <input 
                    className="agent-input w-full p-2 rounded"
                    placeholder="Task ID"
                    value={newTask.id}
                    onChange={e => setNewTask({...newTask, id: e.target.value})}
                />
                <textarea 
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={e => setNewTask({...newTask, description: e.target.value})}
                />
                <textarea 
                    className="agent-input w-full p-2 rounded"
                    rows="2"
                    placeholder="Expected Output Format"
                    value={newTask.expectedOutput}
                    onChange={e => setNewTask({...newTask, expectedOutput: e.target.value})}
                />
                <select 
                    className="agent-input w-full p-2 rounded"
                    value={newTask.agentId}
                    onChange={e => setNewTask({...newTask, agentId: e.target.value})}
                >
                    <option value="">Select an agent</option>
                    {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name} - {agent.role}</option>
                    ))}
                </select>
                <div className="form-group">
                    <label>Priority</label>
                    <select
                        className="agent-input w-full p-2 rounded"
                        value={newTask.priority}
                        onChange={e => setNewTask({...newTask, priority: parseInt(e.target.value)})}
                    >
                        {[1, 2, 3, 4, 5].map(p => (
                            <option key={p} value={p}>Priority {p}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Dependencies</label>
                    <select
                        multiple
                        className="agent-input w-full p-2 rounded"
                        value={newTask.dependencies}
                        onChange={e => setNewTask({
                            ...newTask,
                            dependencies: Array.from(e.target.selectedOptions, option => option.value)
                        })}
                    >
                        {tasks.map(task => (
                            <option key={task.id} value={task.id}>{task.id} - {task.description}</option>
                        ))}
                    </select>
                </div>
                <button 
                    onClick={addTask} 
                    className="agent-button w-full p-2 rounded flex items-center justify-center"
                >
                    <Plus className="mr-2" />Add Task
                </button>
            </div>
        );

        const renderTaskList = () => (
            <div className="space-y-4">
                {tasks.map(task => (
                    <Card key={task.id} className="p-4">
                        <h3 className="font-bold">Task: {task.id}</h3>
                        <p>{task.description}</p>
                        <p>Assigned to: {task.agentId}</p>
                    </Card>
                ))}
            </div>
        );

        // Gestion de l'exécution
        const handleExecute = async () => {
            try {
                // Simulation d'exécution pour l'exemple
                return {
                    status: 'completed',
                    executionTime: '2.5s',
                    results: {
                        agentsUsed: agents.length,
                        tasksCompleted: tasks.length,
                        output: 'Simulation des résultats'
                    }
                };
            } catch (error) {
                console.error("Erreur d'exécution:", error);
                throw error;
            }
        };

        // Fonction pour créer un équipage CrewAI
        const createCrew = async () => {
            try {
                const response = await fetch('/api/crew/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        agents,
                        tasks,
                        executionConfig
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to create crew');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Error creating crew:', error);
                throw error;
            }
        };

        // Fonction pour exécuter les tâches
        const executeTasks = async () => {
            try {
                // Créer l'équipage
                const crew = await createCrew();
                
                // Exécuter les tâches
                const response = await fetch('/api/crew/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        crewId: crew.id,
                        taskSequence: executionConfig.taskSequence,
                        maxRetries: executionConfig.maxRetries,
                        timeout: executionConfig.timeout
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Task execution failed');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Error executing tasks:', error);
                throw error;
            }
        };

        return (
            <Card className="w-full max-w-6xl mx-auto my-6 space-y-6">
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        {/* <h2 className="agent-heading text-2xl font-bold">Multi-Agent System</h2> */}
                        <div className="flex items-center space-x-2">
                            {['agents', 'tasks', 'process', 'execution'].map(view => (
                                <button 
                                    key={view}
                                    className={`px-4 py-2 rounded ${
                                        currentView === view 
                                            ? 'agent-button' 
                                            : 'agent-button-outline'
                                    }`}
                                    onClick={() => setCurrentView(view)}
                                >
                                    {view.charAt(0).toUpperCase() + view.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 agent-text w-full">
                        {currentView === 'agents' && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold">Add New Agent</h3>
                                    {renderAgentForm()}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold">Agent List</h3>
                                    {renderAgentList()}
                                </div>
                            </div>
                        )}
                        {currentView === 'tasks' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold">Add New Task</h3>
                                    {renderTaskForm()}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold">Task List</h3>
                                    {renderTaskList()}
                                </div>
                            </div>
                        )}
                        {currentView === 'process' && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Process Configuration</h3>
                                <div className="space-y-2">
                                    <label className="block">Task Sequence</label>
                                    <select
                                        multiple
                                        className="w-full p-2 border rounded"
                                        value={executionConfig.taskSequence}
                                        onChange={e => setExecutionConfig({
                                            ...executionConfig,
                                            taskSequence: Array.from(e.target.selectedOptions, option => option.value)
                                        })}
                                    >
                                        {tasks.map(task => (
                                            <option key={task.id} value={task.id}>
                                                {task.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {currentView === 'execution' && (
                            <ExecutionViewer
                                agents={agents}
                                tasks={tasks}
                                onExecute={handleExecute}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Export the updateAgentUI function to be used in agent.js
    window.updateAgentUI = function updateAgentUI(agent, tasks) {
        console.log('Updating Agent UI with agent:', agent, 'and tasks:', tasks);
        // Implement the logic to update the UI based on the agent and tasks
    };
})(window);
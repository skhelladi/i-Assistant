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

    // Composant pour visualiser l'exécution
    const ExecutionViewer = ({ agents, tasks, onExecute }) => {
        const [executionResults, setExecutionResults] = React.useState([]);
        const [isExecuting, setIsExecuting] = React.useState(false);
        const [currentStep, setCurrentStep] = React.useState(null);

        const handleExecute = async () => {
            setIsExecuting(true);
            setExecutionResults([]);
            try {
                const results = await onExecute();
                setExecutionResults(prev => [...prev, results]);
            } catch (error) {
                setExecutionResults(prev => [...prev, { error: error.message }]);
            }
            setIsExecuting(false);
        };

        const renderExecutionStatus = () => (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Execution Status</h3>
                    {isExecuting && <RefreshCw className="animate-spin" />}
                </div>
                {currentStep && (
                    <div className="p-4 bg-gray-100 rounded">
                        <p>Current step: {currentStep}</p>
                    </div>
                )}
            </div>
        );

        const renderResults = () => (
            <div className="space-y-4">
                {executionResults.map((result, index) => (
                    <Card key={index} className="p-4">
                        <CardHeader>
                            <h4 className="font-semibold">Result #{index + 1}</h4>
                        </CardHeader>
                        <CardContent>
                            {result.error ? (
                                <div className="text-red-500">
                                    Error: {result.error}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {Object.entries(result).map(([key, value]) => (
                                        <div key={key} className="border-b pb-2">
                                            <span className="font-medium">{key}: </span>
                                            <span>{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        );

        return (
            <Card className="w-full">
                <CardHeader> 
                    <div className="flex items-center justify-between w-full">
                        <h2 className="agent-heading text-xl font-bold">System Execution</h2>
                        <button 
                            onClick={handleExecute}
                            disabled={isExecuting || !agents.length || !tasks.length}
                            className="agent-button p-2 rounded ml-auto"
                        >
                            {isExecuting ? 'Executing...' : 'Execute'}
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    {renderExecutionStatus()}
                    {executionResults.length > 0 && renderResults()}
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
            role: '',
            goal: '',
            backstory: '',
            model: 'llama3.2:3b',
            temperature: 0.7,
            allowDelegation: false
        });

        const [newTask, setNewTask] = React.useState({
            id: '',
            description: '',
            agentId: '',
            context: {}
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
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setLlmModels(Array.isArray(data.models) ? data.models : []);
                } catch (error) {
                    console.error('Failed to fetch LLM models:', error);
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
                    role: '',
                    goal: '',
                    backstory: '',
                    model: 'llama3.2:3b',
                    temperature: 0.7,
                    allowDelegation: false
                });
            }
        };

        const renderAgentForm = () => (
            <div className="space-y-4">
                <input 
                    className="agent-input w-full p-2 rounded"
                    placeholder="Agent ID"
                    value={newAgent.id}
                    onChange={e => setNewAgent({...newAgent, id: e.target.value})}
                />
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Role"
                    value={newAgent.role}
                    onChange={e => setNewAgent({...newAgent, role: e.target.value})}
                />
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Goal"
                    value={newAgent.goal}
                    onChange={e => setNewAgent({...newAgent, goal: e.target.value})}
                />
                <textarea
                    className="agent-input w-full p-2 rounded"
                    rows="3"
                    placeholder="Backstory"
                    value={newAgent.backstory}
                    onChange={e => setNewAgent({...newAgent, backstory: e.target.value})}
                />
                {/* Replace LLM Model input with combobox */}
                <select 
                    className="agent-input w-full p-2 rounded"
                    value={newAgent.model}
                    onChange={e => setNewAgent({...newAgent, model: e.target.value})}
                >
                    <option value="">Select LLM Model</option>
                    {Array.isArray(llmModels) && llmModels.map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
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
                    context: {}
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
                    placeholder="Description"
                    value={newTask.description}
                    onChange={e => setNewTask({...newTask, description: e.target.value})}
                />
                <select 
                    className="agent-input w-full p-2 rounded"
                    value={newTask.agentId}
                    onChange={e => setNewTask({...newTask, agentId: e.target.value})}
                >
                    <option value="">Select an agent</option>
                    {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.role}</option>
                    ))}
                </select>
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
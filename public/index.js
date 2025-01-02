// Ensure all necessary elements are selected
const sendButton = document.querySelector('#send-button');
const stopButton = document.querySelector('#stop-button');
const retryButton = document.querySelector('#retry-button');
const form = document.querySelector('form');
const input = document.querySelector('#chat');
const resultat = document.querySelector('#reponse');
const modelSelect = document.querySelector('#model-select');

// Add history list element reference
const historyList = document.querySelector('#history-list');

let currentController = null;
let lastUserMessage = null;
let currentRequestId = null;
let messageHistory = [];
let responseCount = 0;

const questionSummary = "Always summarize the question in one sentence. ";
const defaultSystemContent = questionSummary+"You are a helpful AI assistant, always respond in the same "+
                             "language as the user. Always add a title to your messages "+ 
                             "if the question is about a specific topic. Write all the "+  
                             "equations in LaTeX format.";

// Initialize default settings
let defaultSettings = {
    stream: true,
    temperature: 0.7,
    systemContent: defaultSystemContent
};

// Load settings from localStorage or use default settings
let currentSettings = JSON.parse(localStorage.getItem('settings')) || defaultSettings;

// Function to reset Ollama parameters
function resetOllamaParameters() {
    // Implement the logic to reset Ollama parameters if needed
    console.log('Ollama parameters reset to:', currentSettings);
}

// Load models on startup
async function loadModels() {
    try {
        const response = await fetch('/models');
        if (!response.ok) throw new Error('Error loading models');

        const data = await response.json();
        if (!Array.isArray(data.models)) {
            console.error('Invalid response format:', data);
            return;
        }

        modelSelect.innerHTML = data.models
            .map(model => `<option value="${model.name}">${model.name}</option>`)
            .join('');

        currentModel = localStorage.getItem('selectedModel') || data.models[0]?.name;
        if (currentModel) {
            modelSelect.value = currentModel;
        }
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Save model selection
modelSelect.addEventListener('change', async (e) => {
    const previousModel = currentModel;
    currentModel = e.target.value;
    localStorage.setItem('selectedModel', currentModel);
    
    try {
        await fetch('/models/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelName: currentModel,
                previousModel: previousModel
            })
        });
    } catch (error) {
        console.error('Error switching models:', error);
    }
});

// Load models on startup
loadModels();

// Stop request function
async function stopRequest() {
    if (currentController) {
        currentController.abort();
    }
    if (currentRequestId) {
        try {
            await fetch('/chat/stop', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ requestId: currentRequestId })
            });
        } catch (error) {
            console.error('Error stopping request:', error);
        } finally {
            currentRequestId = null;
            stopButton.disabled = true;
            sendButton.disabled = false;
            retryButton.disabled = false;
        }
    }
}

function showLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'block';
    input.disabled = true; // Disable input field
}

function hideLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'none';
    input.disabled = false; // Enable input field
}

// Function to summarize question (basic implementation)
function summarizeQuestion(question) {
    // Take first 30 characters and add ellipsis if longer
    return question.length > 30 ? question.substring(0, 30) + '...' : question;
}

// Set to track added questions
const addedQuestions = new Set();

// Function to edit the title of a history item
async function editHistoryTitle(questionId, oldTitle) {
    const newTitle = prompt('Enter new title:', oldTitle || '');
    if (!newTitle || newTitle.trim() === oldTitle) return;
    try {
        const response = await fetch(`/history/${questionId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newTitle: newTitle.trim() })
        });
        if (!response.ok) throw new Error('Failed to update title');
        // Update UI if needed
        const item = document.querySelector(`[data-id="${questionId}"]`);
        if (item) item.querySelector('.history-title').textContent = summarizeQuestion(newTitle.trim());
    } catch (error) {
        console.error('Error editing title:', error);
    }
}

// Function to add summary to history
async function addSummaryToHistory(summary, id) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.dataset.id = id;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'history-title';
    titleSpan.textContent = summarizeQuestion(summary);
    historyItem.appendChild(titleSpan);

    // Add edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-history-button';
    editButton.innerHTML = '<svg><use href="#edit-icon"/></svg>';
    editButton.onclick = (e) => {
        e.stopPropagation();
        editHistoryTitle(id, summary);
    };
    historyItem.appendChild(editButton);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<svg><use href="#trash-icon"/></svg>';
    deleteButton.onclick = async (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this question?')) {
            await deleteHistoryItem(id);
            historyItem.remove();
        }
    };
    historyItem.appendChild(deleteButton);

    // Add click event to load discussion
    historyItem.addEventListener('click', () => loadDiscussion(id));

    // Insert at the top of the list
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    return id;
}

// Function to delete a history item
async function deleteHistoryItem(id) {
    try {
        const response = await fetch(`/history/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Error deleting history item');
    } catch (error) {
        console.error('Error deleting history item:', error);
    }
}

// Load history from server
async function loadHistory() {
    try {
        const response = await fetch('/history');
        if (!response.ok) throw new Error('Error loading history');
        const history = await response.json();
        
        // Vider l'historique existant
        historyList.innerHTML = '';
        
        // Charger l'historique dans l'ordre chronologique inverse
        for (const question of history.reverse()) {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = summarizeQuestion(question.question);
            historyItem.title = question.question;
            historyItem.dataset.id = question.id;

            // Ajouter le bouton de suppression
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<svg><use href="#trash-icon"/></svg>';
            deleteButton.onclick = async (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this question?')) {
                    await deleteHistoryItem(question.id);
                    historyItem.remove();
                }
            };
            historyItem.appendChild(deleteButton);

            // Ajouter l'événement de clic pour charger la discussion
            historyItem.addEventListener('click', () => loadDiscussion(question.id));

            // Ajouter à l'historique
            historyList.appendChild(historyItem);
        }
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// Load discussion for a question
async function loadDiscussion(questionId) {
    console.log('Loading discussion for question:', questionId);
    try {
        // Nettoyer l'affichage actuel
        resultat.innerHTML = '';
        messageHistory = [];

        // Mettre à jour la sélection dans l'historique
        document.querySelectorAll('.history-item').forEach(item => {
            item.classList.remove('active', 'selected');
            if (item.dataset.id === questionId) {
                item.classList.add('active', 'selected');
            }
        });

        // Force this question as active
        const item = document.querySelector(`[data-id="${questionId}"]`);
        if (item) {
            document.querySelectorAll('.history-item').forEach(i => {
                i.classList.remove('active', 'selected');
            });
            item.classList.add('active', 'selected');
        }

        const response = await fetch(`/discussion/${questionId}`);
        
        if (!response.ok) {
            throw new Error(`Error loading discussion: ${response.statusText}`);
        }

        const messages = await response.json();

        if (messages && messages.length > 0) {
            messages.forEach(msg => {
                const messageObj = {
                    role: msg.role,
                    content: msg.message
                };
                messageHistory.push(messageObj);
                displayMessage(messageObj);
            });

            // Faire défiler jusqu'au dernier message
            const chatContainer = document.querySelector('.chat-container');
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

            // Activer/désactiver les boutons appropriés
            sendButton.disabled = false;
            stopButton.disabled = true;
            retryButton.disabled = false;

            // Réinitialiser le compteur de réponses
            responseCount = 0;

            // Appliquer la coloration syntaxique
            hljs.highlightAll();
        }

    } catch (error) {
        console.error('Error loading discussion:', error);
        resultat.innerHTML = `<div class="error">Error loading discussion: ${error.message}</div>`;
        
        // Réactiver les boutons en cas d'erreur
        sendButton.disabled = false;
        stopButton.disabled = true;
        retryButton.disabled = false;
    }
}

// Load history on startup
loadHistory();

// Function to start a new session
function startNewSession() {
    resultat.innerHTML = '';
    messageHistory = [];
    input.value = '';
    
    // Désactiver la session active dans l'historique
    document.querySelectorAll('.history-item').forEach(item => {
        item.classList.remove('active', 'selected');
    });
}

// Send message function
async function sendMessage(e) {
    e.preventDefault();
    
    const content = input.value.trim();
    if (!content) {
        console.log('Message empty, not sending');
        return;
    }

    sendButton.disabled = true;
    stopButton.disabled = false;
    retryButton.disabled = true;

    const newSessionButton = document.getElementById('new-session-button');
    newSessionButton.disabled = true;

    responseCount = 0;
    lastUserMessage = content;

    if (currentController) {
        currentController.abort();
    }
    currentController = new AbortController();

    // Disable interaction with the history list
    historyList.style.pointerEvents = 'none';

    try {
        showLoadingIndicator();
        const userMessage = { role: 'user', content };
        messageHistory.push(userMessage);
        displayMessage(userMessage);
        input.value = '';

        // Obtenir l'ID de la session active
        let questionId = getCurrentQuestionId();
        
        // Si pas de questionId actif, créer une nouvelle question dans l'historique
        if (!questionId) {
            const historyResponse = await fetch('/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: content })
            });

            if (!historyResponse.ok) {
                throw new Error('Failed to save question to history');
            }

            const historyResult = await historyResponse.json();
            questionId = historyResult.id;
            
            // Ajouter à l'historique visuel et activer la nouvelle session
            await addSummaryToHistory(content, questionId);
            document.querySelector(`[data-id="${questionId}"]`).classList.add('active', 'selected');
        }

        // Sauvegarder le message dans la discussion existante
        await saveMessageToDiscussion(questionId, content, 'user');

        const assistantMessage = { role: 'assistant', content: '' };

        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: messageHistory,
                model: currentModel,
                stream: currentSettings.stream,
                options: {
                    temperature: currentSettings.temperature,
                    system: currentSettings.systemContent
                }
            }),
            signal: currentController.signal
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const messageElement = displayMessage(assistantMessage);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = decoder.decode(value, { stream: true });
            const lines = text.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        if (data.requestId) {
                            currentRequestId = data.requestId;
                            continue;
                        }
                        assistantMessage.content += data.content || '';
                        messageElement.querySelector('.message-content').innerHTML = marked.parse(assistantMessage.content);
                        messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

                        const chatContainer = document.querySelector('.chat-container');
                        chatContainer.scrollTop = chatContainer.scrollHeight;

                        hljs.highlightAll();
                        hideLoadingIndicator();
                    } catch (e) {
                        console.error('Error parsing JSON:', e, line);
                    }
                }
            }
        }

        if (assistantMessage.content) {
            messageHistory.push(assistantMessage);
            // Sauvegarder la réponse de l'assistant dans la même discussion
            await saveMessageToDiscussion(questionId, assistantMessage.content, 'assistant');
        }

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request canceled');
        } else {
            console.error('Error:', error);
            resultat.innerHTML += `<div class="message error-message">Error: ${error.message}</div>`;
        }
    } finally {
        hideLoadingIndicator();
        currentRequestId = null;
        sendButton.disabled = false;
        stopButton.disabled = true;
        retryButton.disabled = false;
        newSessionButton.disabled = false;
        // Re-enable interaction with the history list
        historyList.style.pointerEvents = 'auto';
    }
}

// Save message to discussion
async function saveMessageToDiscussion(questionId, message, role) {
    if (!questionId || !message || !role) {
        console.error('Missing required parameters for saving message:', { questionId, message, role });
        return;
    }
    
    try {
        console.log('Saving message:', { questionId, message, role }); // Debug log
        const response = await fetch('/discussion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionId, message, role })
        });
        
        if (!response.ok) {
            throw new Error(`Failed to save message: ${response.statusText}`);
        }
        
        const result = await response.json();
        if (!result.success) {
            throw new Error('Failed to save message to discussion');
        }
        
        console.log(`Message saved successfully for question ${questionId}`);
    } catch (error) {
        console.error('Error saving message to discussion:', error);
        throw error;
    }
}

// Add event listeners
sendButton.addEventListener('click', sendMessage);
stopButton.addEventListener('click', stopRequest);
form.addEventListener('submit', sendMessage);

// Add event listener for new session button
const newSessionButton = document.getElementById('new-session-button');
newSessionButton.addEventListener('click', startNewSession);

// Function to display a message
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}-message`;

    const header = document.createElement('div');
    header.className = 'message-header';
    if (message.role === 'assistant') {
        responseCount++;
        header.textContent = `Assistant (Answer ${responseCount} - ${currentModel})`;
    } else {
        header.textContent = 'You';
    }

    const content = document.createElement('div');
    content.className = 'message-content';

    content.innerHTML = marked.parse(message.content);
    hljs.highlightAll();

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = `<svg class="copy-icon"><use href="#copy-icon"/></svg>`;
    copyButton.title = 'Copy message';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(message.content)
            .then(() => {
                copyButton.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    copyButton.style.backgroundColor = '';
                }, 1000);
            })
            .catch(err => console.error('Error copying:', err));
    };
    messageDiv.appendChild(copyButton);

    if (message.role === 'user') {
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.innerHTML = `<svg class="edit-icon"><use href="#edit-icon"/></svg>`;
        editButton.title = 'Edit question';
        editButton.onclick = () => {
            input.value = message.content;
            sendButton.disabled = false;
            stopButton.disabled = true;
            input.focus();
            const nextSiblings = [];
            let nextSibling = messageDiv.nextSibling;
            while (nextSibling) {
                nextSiblings.push(nextSibling);
                nextSibling = nextSibling.nextSibling;
            }
            nextSiblings.forEach(sibling => sibling.remove());
            messageDiv.remove();
        };
        messageDiv.appendChild(editButton);
    }

    if (message.role === 'assistant') {
        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';
        saveButton.innerHTML = `<svg class="save-icon"><use href="#save-icon"/></svg>`;
        saveButton.title = 'Save answer';
        saveButton.onclick = () => {
            const extension = prompt("Enter the file extension (for example, txt, md, etc.)", "txt");
            if (extension) {
                const blob = new Blob([message.content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `answer.${extension}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        };
        messageDiv.appendChild(saveButton);
    }

    messageDiv.appendChild(header);
    messageDiv.appendChild(content);
    resultat.appendChild(messageDiv);

    return messageDiv;
}

// Handle About modal
const aboutButton = document.getElementById('about-button');
const aboutModal = document.getElementById('about-modal');
const closeAbout = document.getElementById('close-about');

aboutButton.addEventListener('click', () => {
    aboutModal.style.display = 'flex';
});

closeAbout.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});

// Handle Settings Modal
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const settingsForm = document.getElementById('settings-form');

settingsButton.addEventListener('click', () => {
    settingsForm.stream.value = currentSettings.stream.toString();
    settingsForm.temperature.value = currentSettings.temperature;
    settingsForm.systemContent.value = currentSettings.systemContent;
    settingsModal.style.display = 'flex';
});

closeSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSettings.stream = settingsForm.stream.value === 'true';
    currentSettings.temperature = parseFloat(settingsForm.temperature.value);
    currentSettings.systemContent = settingsForm.systemContent.value;
    localStorage.setItem('settings', JSON.stringify(currentSettings));
    settingsModal.style.display = 'none';
    console.log('Settings updated:', currentSettings);
    resetOllamaParameters(); // Reset Ollama parameters whenever settings change
});

const resetSettingsButton = document.getElementById('reset-settings');

resetSettingsButton.addEventListener('click', () => {
    currentSettings = { ...defaultSettings };
    settingsForm.stream.value = currentSettings.stream.toString();
    settingsForm.temperature.value = currentSettings.temperature;
    settingsForm.systemContent.value = currentSettings.systemContent;
    localStorage.setItem('settings', JSON.stringify(currentSettings));
    console.log('Settings reset to default:', currentSettings);
    resetOllamaParameters(); // Reset Ollama parameters whenever settings change
});

retryButton.addEventListener('click', async () => {
    if (lastUserMessage) {
        try {
            showLoadingIndicator();
            const assistantMessage = { role: 'assistant', content: '' };
            const messageElement = displayMessage(assistantMessage, true);

            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messageHistory, { role: 'user', content: lastUserMessage }],
                    model: currentModel,
                    stream: currentSettings.stream,
                    options: {
                        temperature: currentSettings.temperature,
                        system: currentSettings.systemContent
                    }
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            sendButton.disabled = true;
            stopButton.disabled = false;
            retryButton.disabled = true;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = decoder.decode(value, { stream: true });
                const lines = text.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.requestId) {
                                currentRequestId = data.requestId;
                                continue;
                            }
                            assistantMessage.content += data.content || '';
                            messageElement.querySelector('.message-content').innerHTML = marked.parse(assistantMessage.content);
                            messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

                            const chatContainer = document.querySelector('.chat-container');
                            chatContainer.scrollTop = chatContainer.scrollHeight;

                            hljs.highlightAll();

                            // Hide loading indicator when response starts arriving
                            hideLoadingIndicator();
                        } catch (e) {
                            console.error('Error parsing JSON:', e, line);
                        }
                    }
                }
            }

            if (assistantMessage.content) {
                messageHistory.push({ role: 'user', content: lastUserMessage });
                messageHistory.push(assistantMessage);
            }

        } catch (error) {
            console.error('Error during retry:', error);
            resultat.innerHTML += `<div class="message error-message">Error: ${error.message}</div>`;
        } finally {
            hideLoadingIndicator();
            currentRequestId = null;
            sendButton.disabled = false;
            stopButton.disabled = true;
            retryButton.disabled = false;
        }
    }
});

const themeToggleButton = document.getElementById('theme-toggle-button');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
}

// Ajouter cette fonction utilitaire
function getCurrentQuestionId() {
    const activeItem = document.querySelector('.history-item.active');
    console.log('getCurrentQuestionId found:', activeItem ? activeItem.dataset.id : 'none');
    return activeItem ? activeItem.dataset.id : null;
}

// Ajouter un événement pour charger l'historique quand la page est prête
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    loadModels();
});

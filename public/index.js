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
const sidebar = document.querySelector('.sidebar');
const toggleSidebarButton = document.querySelector('#toggle-sidebar-button');

let currentController = null;
let lastUserMessage = null;
let currentRequestId = null;
let messageHistory = [];
let responseCount = 0;

const questionSummary = "Always summarize the question in one sentence. ";
const defaultSystemContent = questionSummary + "You are a helpful AI assistant, always respond in the same " +
    "language as the user. Always add a title to your messages " +
    "if the question is about a specific topic. Write all the " +
    "equations in LaTeX format.";

const defaultPort = 3333;

// Initialize default settings
let defaultSettings = {
    stream: true,
    temperature: 0.7,
    systemContent: defaultSystemContent,
    port: defaultPort
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
                headers: { 'Content-Type': 'application/json' },
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

        // Reset the discussion session if the deleted item was active
        const activeItem = document.querySelector('.history-item.active');
        if (activeItem && activeItem.dataset.id === id.toString()) {
            startNewSession();
        }
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

        // Clear existing history
        historyList.innerHTML = '';

        // Load history in reverse chronological order
        for (const question of history.reverse()) {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.dataset.id = question.id;

            // Add title span
            const titleSpan = document.createElement('span');
            titleSpan.className = 'history-title';
            titleSpan.textContent = summarizeQuestion(question.question);
            historyItem.appendChild(titleSpan);

            // Create buttons container
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'history-buttons';

            // Add edit button
            const editButton = document.createElement('button');
            editButton.className = 'edit-history-button';
            editButton.innerHTML = '<svg><use href="#edit-icon"/></svg>';
            editButton.title = 'Edit title';
            editButton.onclick = async (e) => {
                e.stopPropagation();
                const newTitle = prompt('Enter new title:', question.question);
                if (newTitle && newTitle !== question.question) {
                    try {
                        const response = await fetch(`/history/${question.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ newTitle })
                        });

                        if (!response.ok) {
                            throw new Error('Failed to update title');
                        }

                        // Update the title in the UI
                        titleSpan.textContent = summarizeQuestion(newTitle);

                        // Update the title in the history item's data
                        historyItem.dataset.title = newTitle;

                        console.log('Title updated successfully');
                    } catch (error) {
                        console.error('Error updating title:', error);
                        alert('Failed to update title. Please try again.');
                    }
                }
            };
            buttonsContainer.appendChild(editButton);

            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<svg><use href="#trash-icon"/></svg>';
            deleteButton.title = 'Delete';
            deleteButton.onclick = async (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this question?')) {
                    await deleteHistoryItem(question.id);
                    historyItem.remove();
                }
            };
            buttonsContainer.appendChild(deleteButton);

            // Add buttons container to history item
            historyItem.appendChild(buttonsContainer);

            // Add click event to load discussion
            historyItem.addEventListener('click', () => loadDiscussion(question.id));

            // Add to history list
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

        let finalPrompt = content;
        let searchContext = '';

        // Si la recherche web est activée, effectuer la recherche
        if (enableSearchCheckbox.checked) {
            console.log('Performing web search for:', content);
            const searchingMessage = {
                role: 'system',
                content: 'Searching the web...'
            };
            displayMessage(searchingMessage);

            searchContext = await performWebSearch(content);
            // Supprimer le message "Searching..."
            resultat.lastChild.remove();

            if (searchContext) {
                const searchResults = {
                    role: 'system',
                    content: `<div class="web-search-results">
                        <h4>Web Search Results</h4>
                        <div class="search-content">
                            <ol>
                                ${searchContext.split('\n').map(line => `<li>${line.substring(line.indexOf('.') + 2)}</li>`).join('')}
                            </ol>
                        </div>
                    </div>`
                };
                displayMessage(searchResults);
                messageHistory.push({
                    role: 'system',
                    content: `Web Search Results:\n${searchContext}`
                });
                
                // Modifier le prompt utilisateur pour inclure le contexte
                const userMessageWithContext = {
                    role: 'user',
                    content: `Based on the following web search results:\n${searchContext}\n\nAnswer this question: ${content}`
                };
                
                // Remplacer le dernier message utilisateur dans l'historique
                messageHistory[messageHistory.length - 1] = userMessageWithContext;
            } else {
                const noResultsMessage = {
                    role: 'system',
                    content: 'No relevant search results found.'
                };
                displayMessage(noResultsMessage);
            }
        }

        const assistantMessage = { role: 'assistant', content: '' };
        let messageElement = null;

        console.log('Sending message history:', messageHistory); // Debug log

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
        let fullResponse = '';

        // Créer l'élément du message uniquement après avoir reçu la première partie de la réponse
        messageElement = displayMessage(assistantMessage);

        let thinkMode = false;
        let thinkBuffer = '';
        let tagBuffer = '';
        let isCollectingTag = false;

        function handleIncomingToken(token) {
            // Process token character by character for tag detection
            for (let char of token) {
                if (char === '<') {
                    isCollectingTag = true;
                    tagBuffer = '<';
                    continue;
                }
                
                if (isCollectingTag) {
                    tagBuffer += char;
                    
                    // Check for opening tag completion
                    if (tagBuffer === '<think>') {
                        isCollectingTag = false;
                        tagBuffer = '';
                        thinkMode = true;
                        continue;
                    }
                    
                    // Check for closing tag completion
                    if (tagBuffer === '</think>') {
                        isCollectingTag = false;
                        tagBuffer = '';
                        thinkMode = false;
                        // Process accumulated think buffer
                        if (thinkBuffer) {
                            const thinkSection = document.createElement('div');
                            thinkSection.className = 'think-section';
                            thinkSection.textContent = thinkBuffer;
                            messageElement.querySelector('.message-content').appendChild(thinkSection);
                            thinkBuffer = '';
                        }
                        continue;
                    }
                    
                    // If current tag buffer is not a potential think tag, flush it
                    if (!'<think>'.startsWith(tagBuffer) && !'</think>'.startsWith(tagBuffer)) {
                        if (thinkMode) {
                            thinkBuffer += tagBuffer;
                        } else {
                            assistantMessage.content += tagBuffer;
                        }
                        isCollectingTag = false;
                        tagBuffer = '';
                    }
                    
                    continue;
                }
                
                // Regular character processing
                if (thinkMode) {
                    thinkBuffer += char;
                } else {
                    assistantMessage.content += char;
                }
            }
            
            // Update display if not in think mode
            if (!thinkMode && messageElement) {
                messageElement.querySelector('.message-content').innerHTML = marked.parse(assistantMessage.content);
            }
        }

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
                        if (data.content) {
                            handleIncomingToken(data.content);
                        }
                        hideLoadingIndicator();
                    } catch (e) {
                        console.error('Error parsing JSON:', e, line);
                    }
                }
            }
        }

        if (fullResponse) {
            assistantMessage.content = fullResponse;
            messageHistory.push(assistantMessage);
            // Sauvegarder la réponse de l'assistant dans la même discussion
            await saveMessageToDiscussion(questionId, fullResponse, 'assistant');
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

    // Traiter le contenu pour les sections "think"
    let processedContent = message.content;
    if (message.content.includes('<think>')) {
        processedContent = message.content.replace(
            /<think>([\s\S]*?)<\/think>/g,
            (match, p1) => `<div class="think-section">${p1.trim()}</div>`
        );
    }

    content.innerHTML = marked.parse(processedContent);
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

// Function to save settings to a JSON file
async function saveSettingsToFile(settings) {
    try {
        await fetch('/save-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        console.log('Settings saved to file:', settings);
    } catch (error) {
        console.error('Error saving settings to file:', error);
    }
}

settingsButton.addEventListener('click', () => {
    settingsForm.stream.value = currentSettings.stream.toString();
    settingsForm.temperature.value = currentSettings.temperature;
    settingsForm.systemContent.value = currentSettings.systemContent;
    settingsForm.port.value = currentSettings.port || defaultPort;
    settingsModal.style.display = 'flex';
});

closeSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const previousPort = currentSettings.port;
    currentSettings.stream = settingsForm.stream.value === 'true';
    currentSettings.temperature = parseFloat(settingsForm.temperature.value);
    currentSettings.systemContent = settingsForm.systemContent.value;
    currentSettings.port = parseInt(settingsForm.port.value, 10) || defaultPort;
    localStorage.setItem('settings', JSON.stringify(currentSettings));
    saveSettingsToFile(currentSettings); // Save settings to file
    settingsModal.style.display = 'none';
    console.log('Settings updated:', currentSettings);
    resetOllamaParameters(); // Reset Ollama parameters whenever settings change

    if (currentSettings.port !== previousPort) {
        fetch('/get-public-ip')
            .then(response => response.json())
            .then(data => {
                const publicIp = data.ip;
                alert(`Port number changed to ${currentSettings.port}. Please update the web link to:
                \n- http://localhost:${currentSettings.port} (if running locally)
                \n- http://${publicIp}:${currentSettings.port} (if running on server ${publicIp})`);
            })
            .catch(error => {
                console.error('Error fetching public IP:', error);
                alert(`Port number changed to ${currentSettings.port}. Please update the web link to:
                \n- http://localhost:${currentSettings.port}`);
            });
    }
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

// Function to toggle the sidebar visibility
function toggleSidebar() {
    sidebar.classList.toggle('hidden');
    const isHidden = sidebar.classList.contains('hidden');

    // Créer le bouton dans le conteneur si la sidebar est cachée
    let toggleButton = document.getElementById('toggle-sidebar-button');

    if (isHidden) {
        // Si on cache la sidebar, déplacer le bouton dans le container
        const container = document.querySelector('.container');
        if (toggleButton && container) {
            toggleButton.remove(); // Retirer l'ancien bouton
            // Créer un nouveau bouton dans le container
            const newToggleButton = document.createElement('button');
            newToggleButton.id = 'toggle-sidebar-button';
            newToggleButton.className = 'action-button';
            newToggleButton.title = 'Show Sidebar';
            newToggleButton.innerHTML = '<svg><use href="#show-sidebar-icon"/></svg>';
            newToggleButton.style.position = 'fixed';
            newToggleButton.style.top = '1rem';
            newToggleButton.style.left = '1rem';
            newToggleButton.style.zIndex = '1000';
            newToggleButton.addEventListener('click', toggleSidebar);
            container.appendChild(newToggleButton);
            toggleButton = newToggleButton;
        }
    } else {
        // Si on montre la sidebar, remettre le bouton dans la sidebar-header
        const sidebarHeader = document.querySelector('.sidebar-header');
        if (toggleButton && sidebarHeader) {
            toggleButton.remove(); // Retirer l'ancien bouton
            // Créer un nouveau bouton dans la sidebar
            const newToggleButton = document.createElement('button');
            newToggleButton.id = 'toggle-sidebar-button';
            newToggleButton.title = 'Hide Sidebar';
            newToggleButton.innerHTML = '<svg><use href="#hide-sidebar-icon"/></svg>';
            newToggleButton.addEventListener('click', toggleSidebar);
            sidebarHeader.appendChild(newToggleButton);
        }
    }
}

// Add event listener for the toggle sidebar button
toggleSidebarButton.addEventListener('click', toggleSidebar);

// Add event listeners for tab buttons
document.querySelectorAll('.tab-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
        document.getElementById(button.dataset.tab).style.display = 'block';

        // Update active button
        document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Add a checkbox for enabling web search
const enableSearchLabel = document.createElement('label');
enableSearchLabel.textContent = 'Enable Web Search';
const enableSearchCheckbox = document.createElement('input');
enableSearchCheckbox.type = 'checkbox';
enableSearchCheckbox.id = 'enable-web-search';
enableSearchLabel.appendChild(enableSearchCheckbox);

// Insert the checkbox next to the model select
const modelSelector = document.querySelector('.model-selector');
modelSelector.appendChild(enableSearchLabel);

// Function to perform web search (similar to performWebSearch in Index.jsx)
async function performWebSearch(query) {
    try {
        const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(`https://html.duckduckgo.com/html/?q=${query}`)}`
        );
        const data = await response.json();
        if (!data.contents) throw new Error('No search results found');

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const results = Array.from(doc.querySelectorAll('.result__snippet'))
            .map(snippet => snippet.textContent.trim())
            .filter(Boolean)
            .slice(0, 10);

        // Formater les résultats en liste numérotée
        return results.map((r, index) => `${index + 1}. ${r}`).join('\n');
    } catch (error) {
        console.error('Web search error:', error);
        return '';
    }
}

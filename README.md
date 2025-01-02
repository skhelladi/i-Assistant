# OllamaDesk

OllamaDesk serves as a graphical interface for [Ollama](https://ollama.com/) using free LLMs. The backend server is responsible for model management and processing.

![OllamaDesk](assets/gui.png)

## Features

- Interactive chat interface
- Model selection
- Streamed responses
- Retry and stop functionality
- Settings for customization
- Copy and paste functionality
- Save answers to a text/markdown file
- Save chat history
- Dark/light mode

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/skhelladi/OllamaDesk.git
cd OllamaDesk
```

### Install Dependencies

```bash
npm install express
npm install sqlite3
npm install ollama
npm install crypto-js
npm install node-cache
npm install nodemon
```

### Install Ollama and its Modules

Follow the instructions on the [Ollama website](https://ollama.com/) to install Ollama and its required modules.

## Usage

### Start the Server

```bash
node server.mjs
```

The server will start and listen on port 3000. You can access the application by navigating to `http://localhost:3000` in your web browser.

### Start the Server in Development Mode

```bash
npm run dev
```

This will start the server using `nodemon`, which will automatically restart the server when file changes are detected.

### Functionality

- **Send Message**: Enter your message in the input field and click the send button to interact with the AI assistant.
- **Stop Request**: Click the stop button to stop the ongoing response generation.
- **Retry**: Click the retry button to resend the last user message and get a new response.
- **Settings**: Click the settings button to customize the stream, temperature, and model context.

## License

This project is licensed under the GPL-3 license.

Unless you explicitly state otherwise, any contribution intentionally submitted by you for inclusion in this project shall be licensed as above, without any additional terms or conditions.

## Author

- Sofiane KHELLADI


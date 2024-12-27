# i-@ssistant

i-@ssistant is a web-based AI assistant application that allows users to interact with various models to obtain solutions to their queries. This application serves as a graphical interface for [Ollama](https://ollama.com/) using free LLMs. The backend server is responsible for model management and processing.

## Features

- Interactive chat interface
- Model selection
- Streamed responses
- Retry and stop functionality
- Settings for customization
- About modal with application information
- Copy and paste functionality
- Save answers to a text/markdown file

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/yourusername/ollama_gui.git
cd ollama_gui
```

### Install Dependencies

```bash
npm install
```

### Install Ollama and its Modules

Follow the instructions on the [Ollama website](https://ollama.com/) to install Ollama and its required modules.

## Usage

### Start the Server

```bash
node server.mjs
```

The server will start and listen on port 3000. You can access the application by navigating to `http://localhost:3000` in your web browser.

### Functionality

- **Send Message**: Enter your message in the input field and click the send button to interact with the AI assistant.
- **Stop Request**: Click the stop button to stop the ongoing response generation.
- **Retry**: Click the retry button to resend the last user message and get a new response.
- **Settings**: Click the settings button to customize the stream, temperature, and system content.

## License

This project is licensed under the GPL-3 license.

Unless you explicitly state otherwise, any contribution intentionally submitted by you for inclusion in this project shall be licensed as above, without any additional terms or conditions.

## Author

- Sofiane KHELLADI


class Terminal {
    constructor() {
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~'

        this.commands = {
            help: this.showHelp.bind(this),
            //about: this.showAbout.bind(this),
            //skills: this.skills.bind(this),
            //projects: this.showProjects.bind(this),
            //experience: this.showExperience.bind(this),
            //education: this.showEducation.bind(this),
            //contact: this.showContact.bind(this),
            clear: this.clearTerminal.bind(this),
            //resume: this.downloadResume.bind(this)
        }

        this.init();
        console.log("hello world");
    }

    init() {
        const input = document.getElementById('command-input');
        const cursor = document.getElementById('cursor');

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value.trim());
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1, input);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1, input);
            }
        });

        input.addEventListener('input', () => {
            this.updateCursorPosition(input, cursor);
        });

        this.updateCursorPosition(input, cursor);

        input.focus()

        document.addEventListener('click', () => {
            input.focus()
        });
    }

    executeCommand(command) {
        const [cmd, ...args] = command.split(' ');

        this.addOutput(`visitor@portfolio:${this.currentPath}$ ${command}`, 'command');

        if (command === '') {
            this.addNewPrompt();
            return;
        }

        this.commandHistory.unshift(command);
        this.historyIndex = -1;

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addOutput(`bash: ${cmd}: command not found`, 'error');
            this.addOutput(`Type 'help' for available commands.`, 'info');
        }

        this.addNewPrompt();
    }

    addOutput(text, className = '') {
        const terminalBody = document.getElementById('terminal');
        const outputLine = document.createElement('div');
        outputLine.className = `output-line ${className}`;
        outputLine.innerHTML = text;

        const currentInput = terminalBody.querySelector('.input-line');
        if (currentInput) {
            currentInput.remove();
        }

        terminalBody.appendChild(outputLine);
        terminalBody.scrollTrop = terminalBody.scrollHeight;
    }

    addNewPrompt() {
        const terminalBody = document.getElementById('terminal');
        const inputLine = document.createElement('div');
        inputLine.className = 'input-line'
        inputLine.innerHTML = `
            <span class="input-prompt">visitor@portfolio:${this.currentPath}$</span>
            <div class="input-container">
                <input type="text" id="command-input" autocomplete="off" spellcheck="false">
                <span class="cursor" id="cursor"></span>
            </div>
        `;

        terminalBody.appendChild(inputLine);

        const newInput = document.getElementById('command-input');
        const newCursor = document.getElementById('cursor');

        newInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(newInput.value.trim());
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1, input);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1, input);
            }
        });

        newInput.addEventListener('input', () => {
            this.updateCursorPosition(newInput, newCursor);
        });
        
        this.updateCursorPosition(newInput, newCursor);
        
        newInput.focus();
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    updateCursorPosition(input, cursor) {

    }

    navigateHistory(direction, input) {

    }

    showHelp() {
        const helpText = `
        <br>
            <span class="highlight">Available Commands:</span> <br>
            <span class="success">about</span>      - Learn about me <br>
            <span class="success">skills</span>     - View my technical skills <br>
            <span class="success">projects</span>   - Browse my projects <br>
            <span class="success">experience</span> - See my work experience <br>
            <span class="success">education</span>  - View my educational background <br>
            <span class="success">contact</span>    - Get my contact information <br>
            <span class="success">resume</span>     - Download my resume <br> <br>

            <span class="highlight">System Commands:</span>  <br>
            <span class="info">ls</span>         - List directory contents <br>
            <span class="info">cat</span>        - Display file contents <br>
            <span class="info">pwd</span>        - Show current directory <br>
            <span class="info">clear</span>      - Clear the terminal <br>
            <span class="info">whoami</span>     - Display current user <br>
            <span class="info">date</span>       - Show current date/time <br>
            <span class="info">neofetch</span>   - Display system information <br>
            <span class="info">tree</span>       - Show directory structure <br>
            <span class="info">help</span>       - Show this help message <br>
        `;
        this.addOutput(helpText);
    }




    clearTerminal() {
        const terminalBody = document.getElementById('terminal');
        terminalBody.innerHTML = '';
        console.log("clear");
    }



}

new Terminal();
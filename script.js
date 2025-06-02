class Terminal {
    constructor() {
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~'

        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            skills: this.showSkills.bind(this),
            projects: this.showProjects.bind(this),
            //experience: this.showExperience.bind(this),
            education: this.showEducation.bind(this),
            contact: this.showContact.bind(this),
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
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.font = window.getComputedStyle(input).font;
        tempSpan.textContent = input.value;
        document.body.appendChild(tempSpan);
        
        const textWidth = tempSpan.offsetWidth + 2;
        document.body.removeChild(tempSpan);
        
        cursor.style.left = textWidth + 'px';
    }

    navigateHistory(direction, input) {

    }

    showHelp() {
        const helpText = `
            <span class="highlight">Available Commands:</span> <br>
            <span class="success">about</span>      - Learn about me <br>
            <span class="success">skills</span>     - View my technical skills <br>
            <span class="success">projects</span>   - Browse my projects <br>
            <span class="success">education</span>  - View my educational background <br>
            <span class="success">contact</span>    - Get my contact information <br>
            <span class="success">resume</span>     - Download my resume <br>
            <span class="success">clear</span>      - Clear the terminal <br>
        `;
        this.addOutput(helpText);
    }

    showAbout() {
        const aboutText = `
            <span class="highlight">About Me</span>

            Hi! I'm a passionate software developer with expertise in modern web technologies.
            I love creating innovative solutions and building applications that make a difference.<br>
            <br>
            <span class="success">Name:</span> Jonathan Xu <br>
            <span class="success">Location:</span> Palo Alto, CA <br>
            <br>
            I'm constantly learning new technologies and staying up-to-date with industry trends.
            When I'm not coding, you can find me contributing to open-source projects or
            exploring the latest in AI and machine learning.
        `;
        this.addOutput(aboutText);
    }

    showSkills() {
        const skillsText = `
            <span class="highlight">Technical Skills</span><br>
            <br>
            <span class="success">Languages:</span><br>
            • Python, Java, C, OCaml<br>
            • HTML, CSS<br>
            • PostgreSQL<br>
            <br>
            <span class="success">Technologies:</span><br>
            • Git, Github<br>
            • Docker
            `;
        this.addOutput(skillsText);
    }

    showProjects() {
        const projectsText = `
            <span class="highlight">Featured Projects</span><br>
            <span class="success">1. Custom Machine Learning Library</span><br>
            Technologies: Python, Numpy, HTML, CSS, Flask<br>
            Description: A machine learning library written from scratch in python<br>
            GitHub: <span class="link">github.com</span><br>
            <br>
            <span class="success">2. Java Compiler</span><br>
            Technologies: C<br>
            Description: Selfmade Java compiler writtin in C<br>
            Live Demo: <span class="link">github.com</span><br>
            <br>
            <span class="success">3. Keep It Up!</span><br>
            Technologies: HTML, CSS, Javascript, React, Flask, MongoDB, MediaPipe<br>
            Description: Interactive weather dashboard with forecasting<br>
            GitHub: <span class="link">github.com</span><br>
            <br>
         `;
        this.addOutput(projectsText);
    }

    showEducation() {
        const educationText = `
            <span class="highlight">Education & Certifications</span><br>

            <span class="success">Bachelor of Science in Computer Science</span><br>
            University of Maryland, College Park | 2023 - 2027<br>
            • Relevant Coursework: Data Structures, Algorithms, Database Systems<br>
            • GPA: 4.0/4.0<br>
            • Dean's List: Fall 2023, Spring 2024, Fall 2024, Spring 2025<br>
            <br>
            <span class="success">Certifications:</span><br>
            • Docker Certification (2024)<br>
            <br>
        `;
        this.addOutput(educationText);
    }

    showContact() {
        const contactText = `
            <span class="highlight">Contact Information</span><br>

            <span class="success">Email:</span> jonathanxu.cs@email.com<br>
            <span class="success">LinkedIn:</span> <span class="link">linkedin.com/in/jonathanxuu</span><br>
            <span class="success">GitHub:</span> <span class="link">github.com/jonathanxu8</span><br>
            <span class="success">Phone:</span> +1 (650) 709-5403<br>
            <span class="success">Location:</span> Palo Alto, CA<br>
        `;
        this.addOutput(contactText);
    }

    clearTerminal() {
        const terminalBody = document.getElementById('terminal');
        terminalBody.innerHTML = '';
        console.log("clear");
    }

}

new Terminal();
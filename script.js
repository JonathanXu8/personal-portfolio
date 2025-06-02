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
    }

    init() {
        const input = document.getElementById('command-input');
        const cursor = document.getElementById('cursor');
        const terminalBody = document.getElementById('terminal')

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

        terminalBody.addEventListener('click', () => {
            input.focus();
        });
    }

    executeCommand(command) {
        const [cmd, ...args] = command.split(' ');

        this.addOutput(`<span class="input-prompt">visitor@portfolio:${this.currentPath}$ ${command} </span>`, 'command');

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

        terminalBody.addEventListener('click', () => {
            newInput.focus();
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
<span class="highlight">Available Commands:</span>
<span class="success">about</span>      - Learn about me
<span class="success">skills</span>     - View my technical skills
<span class="success">projects</span>   - Browse my projects
<span class="success">education</span>  - View my educational background
<span class="success">contact</span>    - Get my contact information
<span class="success">clear</span>      - Clear the terminal
        `;
        this.addOutput(helpText);
    }

    showAbout() {
        const aboutText = `
<span class="highlight">About Me</span>

Hi! I'm a passionate software developer with expertise in modern web technologies.
I love creating innovative solutions and building applications that make a difference.

<span class="success">Name:</span> Jonathan Xu
<span class="success">Location:</span> Palo Alto, CA

I'm constantly learning new technologies and staying up-to-date with industry trends.
When I'm not coding, you can find me contributing to open-source projects or
exploring the latest in AI and machine learning.
        `;
        this.addOutput(aboutText);
    }

    showSkills() {
        const skillsText = `
<span class="highlight">Technical Skills</span>

<span class="success">Languages:</span>
• Python, Java, C, OCaml
• HTML, CSS
• PostgreSQL

<span class="success">Technologies:</span>
• Git, Github
• Docker
        `;
        this.addOutput(skillsText);
    }

    showProjects() {
        const projectsText = `
<span class="highlight">Featured Projects</span>

<span class="success">1. Custom Machine Learning Library</span>
Technologies: Python, Numpy, HTML, CSS, Flask
Description: A machine learning library written from scratch in python
GitHub: <span class="link">github.com</span>

<span class="success">2. Java Compiler</span>
Technologies: C
Description: Selfmade Java compiler writtin in C
Live Demo: <span class="link">github.com</span>

<span class="success">3. Keep It Up!</span>
Technologies: HTML, CSS, Javascript, React, Flask, MongoDB, MediaPipe
Description: Interactive weather dashboard with forecasting
GitHub: <span class="link">github.com</span>
         `;
        this.addOutput(projectsText);
    }

    showEducation() {
        const educationText = `
<span class="highlight">Education & Certifications</span>

<span class="success">Bachelor of Science in Computer Science</span>
University of Maryland, College Park | 2023 - 2027
• Relevant Coursework: Data Structures, Algorithms, Database Systems
• GPA: 4.0/4.0
• Dean's List: Fall 2023, Spring 2024, Fall 2024, Spring 2025

<span class="success">Certifications:</span>
• Docker Certification (2024)
        `;
        this.addOutput(educationText);
    }

    showContact() {
        const contactText = `
<span class="highlight">Contact Information</span>

<span class="success">Email:</span> jonathanxu.cs@email.com
<span class="success">LinkedIn:</span> <span class="link">linkedin.com/in/jonathanxuu</span>
<span class="success">GitHub:</span> <span class="link">github.com/jonathanxu8</span>
<span class="success">Phone:</span> +1 (650) 709-5403
<span class="success">Location:</span> Palo Alto, CA
        `;
        this.addOutput(contactText);
    }

    clearTerminal() {
        const terminalBody = document.getElementById('terminal');
        terminalBody.innerHTML = '';
    }

}

new Terminal();
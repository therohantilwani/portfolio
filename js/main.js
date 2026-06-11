/* ==========================================================================
   INTERACTIVE LOGIC - ROHAN TILWANI PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // 3. Subtitle Typing Effect
    const stringsToType = [
        "Threat Intelligence Pipelines.",
        "ML-Driven Attack Classifiers.",
        "Decentralized Applications.",
        "IoT Automation Systems.",
        "Award-Winning AI Apps."
    ];
    
    const typingTextElement = document.getElementById('typing-text');
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentString = stringsToType[stringIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingTextElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentString.length) {
            // Pause at the end of string
            isDeleting = true;
            typingSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % stringsToType.length;
            typingSpeed = 500; // Pause before typing next string
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing loop
    if (typingTextElement) {
        setTimeout(type, 1000);
    }

    // 4. Interactive Hero Terminal Simulation
    const terminalBody = document.getElementById('terminal-body');
    const mockCommands = [
        { cmd: 'python3 cve_pipeline.py --reddit --nvd', out: 'Loading NLP transformer model...\n[+] Scraped 10,247 Reddit security threads\n[+] Cross-referenced 94 CVE entries from NVD\n[!] Early signal: 3 vulnerabilities predicted\n    └─ Lead time: avg 160 days before disclosure\n[+] Threat dashboard updated: http://localhost:8080' },
        { cmd: 'python3 honeypot_classifier.py --train', out: 'Loading historical honeypot attack logs...\n[+] Training ML classifier on 50K+ samples...\n[+] Model accuracy: 94.7% (+35% improvement)\n[+] Attack timeline forecasting: ENABLED\n[i] Model saved: models/attack_clf_v2.pkl' },
        { cmd: 'npx hardhat compile && npx hardhat test', out: 'Compiling 4 Solidity files successfully...\n  ✓ CrowdfundFactory deployed (142ms)\n  ✓ Milestone escrow release verified (89ms)\n  ✓ Contributor voting quorum enforced (67ms)\n  ✓ 4x security enhancement confirmed\n12 passing (298ms)' }
    ];
    let terminalCmdIndex = 0;

    function simulateTerminalCommand() {
        if (!terminalBody) return;
        
        // Find existing terminal inputs and clear them to prevent bloat, keeping initial shell details
        const initialLines = Array.from(terminalBody.querySelectorAll('.terminal-line')).slice(0, 9);
        terminalBody.innerHTML = '';
        initialLines.forEach(line => terminalBody.appendChild(line));

        const commandData = mockCommands[terminalCmdIndex];
        terminalCmdIndex = (terminalCmdIndex + 1) % mockCommands.length;

        // Create user prompt line
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-line';
        inputLine.innerHTML = `<span class="t-user">rohan@sec-node</span>:<span class="t-dir">~</span>$ <span class="typing-cmd"></span>`;
        terminalBody.appendChild(inputLine);
        
        const typingCmdSpan = inputLine.querySelector('.typing-cmd');
        let cmdCharIndex = 0;
        
        function typeCmdChar() {
            if (cmdCharIndex < commandData.cmd.length) {
                typingCmdSpan.textContent += commandData.cmd.charAt(cmdCharIndex);
                cmdCharIndex++;
                setTimeout(typeCmdChar, 70);
            } else {
                // Command fully typed. Append output lines
                setTimeout(() => {
                    const outputLines = commandData.out.split('\n');
                    outputLines.forEach(outLine => {
                        const outDiv = document.createElement('div');
                        outDiv.className = 'terminal-line t-system';
                        outDiv.textContent = outLine;
                        terminalBody.appendChild(outDiv);
                    });
                    
                    // Add new empty input prompt
                    const nextPrompt = document.createElement('div');
                    nextPrompt.className = 'terminal-line';
                    nextPrompt.innerHTML = `<span class="t-user">rohan@sec-node</span>:<span class="t-dir">~</span>$ <span class="typing-placeholder"></span>`;
                    terminalBody.appendChild(nextPrompt);
                    
                    // Scroll terminal to the bottom
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 400);
            }
        }
        
        // Pause 1 second before typing command
        setTimeout(typeCmdChar, 1500);
    }

    // Run terminal simulator every 14 seconds
    if (terminalBody) {
        setInterval(simulateTerminalCommand, 14000);
    }

    // 5. Active Link Highlighting with Intersection Observer
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 6. Projects Filter Selection Tab Control
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Trigger fade in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 7. GitHub Calendar Heatmap Integration
    const githubCalEl = document.getElementById('github-calendar');
    if (githubCalEl) {
        GitHubCalendar("#github-calendar", "therohantilwani", { 
            responsive: true,
            global_stats: true
        }).catch(err => {
            console.error("Error loading GitHub calendar:", err);
            githubCalEl.innerHTML = `
                <div class="calendar-error-state">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>Could not load GitHub activity. Visit <a href="https://github.com/therohantilwani" target="_blank" rel="noopener noreferrer">@therohantilwani</a> to view.</span>
                </div>
            `;
        });
    }
});

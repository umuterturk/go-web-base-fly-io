// Retro Pixel Art JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Add retro sound effects
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Only play sound for links that don't navigate away
            if (this.getAttribute('href') === '#' || this.getAttribute('data-action')) {
                e.preventDefault();
                playBeepSound();
            }

            // Handle special actions
            const action = this.getAttribute('data-action');
            if (action) {
                handleAction(action);
            }
        });
    });

    // Add retro effect to main title
    const mainTitle = document.getElementById('mainTitle');
    if (mainTitle) {
        mainTitle.addEventListener('mouseenter', function () {
            activateTitleEffect(this);
        });

        mainTitle.addEventListener('mouseleave', function () {
            deactivateTitleEffect(this);
        });
    }

    // Add special effects for social buttons
    const socialButtons = document.querySelectorAll('.social-link');
    socialButtons.forEach((button, index) => {
        // Add staggered animation delay
        button.style.animationDelay = `${index * 0.15}s`;

        button.addEventListener('mouseover', function () {
            playSocialHoverSound();
            createPixelTrail(this);
        });

        // Add focus effects for accessibility
        button.addEventListener('focus', function () {
            this.style.maxWidth = '150px';
            playSocialHoverSound(true); // quieter sound
        });

        button.addEventListener('blur', function () {
            this.style.maxWidth = ''; // Reset to CSS value
        });
    });

    // Initialize any pixel art animations
    initPixelAnimations();

    // Easter egg: Konami code
    let konamiCode = [];
    const correctKonami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    // Doom cheat codes
    let iddqdCode = [];
    let idkfaCode = [];

    document.addEventListener('keydown', function (e) {
        // Konami code handling
        konamiCode.push(e.key);
        if (konamiCode.length > correctKonami.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === correctKonami.join(',')) {
            activateEasterEgg();
        }

        // IDDQD code handling (god mode)
        iddqdCode.push(e.key.toLowerCase());
        if (iddqdCode.length > 5) {
            iddqdCode.shift();
        }

        if (iddqdCode.join('') === 'iddqd') {
            activateGodMode();
        }

        // IDKFA code handling (full weapons)
        idkfaCode.push(e.key.toLowerCase());
        if (idkfaCode.length > 5) {
            idkfaCode.shift();
        }

        if (idkfaCode.join('') === 'idkfa') {
            activateFullArsenal();
        }
    });

    // Add event listener for disabled API demo button
    document.getElementById('api-demo-btn').addEventListener('click', function (e) {
        e.preventDefault();
        playErrorSound();
        showDisabledMessage();
    });
});

// Activate the retro title effect
function activateTitleEffect(element) {
    // Play a special sound effect
    playTitleSound();

    // Add the active class for visual effects
    element.classList.add('active');

    // Create the glitch effect
    const glitchInterval = setInterval(() => {
        element.classList.add('glitch');
        setTimeout(() => {
            element.classList.remove('glitch');
        }, 100);
    }, 300);

    // Store the interval ID so we can clear it later
    element.dataset.glitchInterval = glitchInterval;

    // Create pixel dust effect
    createPixelDust(element);
}

// Deactivate the title effect
function deactivateTitleEffect(element) {
    // Remove the active class
    element.classList.remove('active');
    element.classList.remove('glitch');

    // Clear the glitch interval
    if (element.dataset.glitchInterval) {
        clearInterval(parseInt(element.dataset.glitchInterval));
        delete element.dataset.glitchInterval;
    }
}

// Create pixel dust effect
function createPixelDust(element) {
    const rect = element.getBoundingClientRect();
    const container = document.querySelector('.container');

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const pixel = document.createElement('div');
            pixel.style.position = 'absolute';
            pixel.style.width = '3px';
            pixel.style.height = '3px';
            pixel.style.backgroundColor = getRandomColor();
            pixel.style.left = `${rect.left + Math.random() * rect.width}px`;
            pixel.style.top = `${rect.top + Math.random() * rect.height}px`;
            pixel.style.zIndex = '100';
            pixel.style.pointerEvents = 'none';
            pixel.style.opacity = '1';
            pixel.style.transition = 'all 0.8s ease';

            container.appendChild(pixel);

            setTimeout(() => {
                const dirX = Math.random() * 60 - 30;
                const dirY = Math.random() * -40 - 10;
                pixel.style.transform = `translate(${dirX}px, ${dirY}px) rotate(${Math.random() * 360}deg)`;
                pixel.style.opacity = '0';

                setTimeout(() => {
                    container.removeChild(pixel);
                }, 800);
            }, 10);
        }, i * 30);
    }
}

// Get a random retro color
function getRandomColor() {
    const colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Play title hover sound
function playTitleSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an oscillator for a more complex sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator1.type = 'square';
    oscillator1.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);

    oscillator2.type = 'sawtooth';
    oscillator2.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator1.start();
    oscillator2.start();

    oscillator1.stop(audioContext.currentTime + 0.3);
    oscillator2.stop(audioContext.currentTime + 0.3);
}

// Play a special sound for social button hover
function playSocialHoverSound(isQuiet = false) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1); // A5

    // Lower volume if requested (for focus events)
    const volume = isQuiet ? 0.05 : 0.1;
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Create pixel trail effect for social buttons
function createPixelTrail(element) {
    const rect = element.getBoundingClientRect();
    const container = document.querySelector('.container');

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const pixel = document.createElement('div');
            pixel.style.position = 'absolute';
            pixel.style.width = '4px';
            pixel.style.height = '4px';
            pixel.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
            pixel.style.left = `${rect.left + Math.random() * rect.width}px`;
            pixel.style.top = `${rect.top + Math.random() * rect.height}px`;
            pixel.style.zIndex = '100';
            pixel.style.pointerEvents = 'none';
            pixel.style.opacity = '1';
            pixel.style.transition = 'all 0.5s ease';

            container.appendChild(pixel);

            setTimeout(() => {
                pixel.style.transform = `translate(${Math.random() * 20 - 10}px, ${-20 - Math.random() * 30}px)`;
                pixel.style.opacity = '0';

                setTimeout(() => {
                    container.removeChild(pixel);
                }, 500);
            }, 10);
        }, i * 50);
    }
}

// Play a retro beep sound
function playBeepSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Initialize pixel art animations
function initPixelAnimations() {
    // Make the pixel character "walk" by toggling classes
    const pixelChar = document.getElementById('pixel-character');
    if (pixelChar) {
        setInterval(() => {
            pixelChar.classList.toggle('walk');
        }, 500);
    }
}

// Handle special button actions
function handleAction(action) {
    switch (action) {
        case 'toggle-theme':
            toggleRetroTheme();
            break;
        case 'api-demo':
            // This is now handled by the disabled button
            break;
    }
}

// Toggle between different retro themes
function toggleRetroTheme() {
    const root = document.documentElement;
    const themes = [
        // Default theme (already in CSS)
        {
            bg: '#0f0f1b',
            primary: '#33ff66',
            secondary: '#ff5566',
            accent: '#ffcc00',
            text: '#ffffff'
        },
        // Amber monochrome (classic terminal)
        {
            bg: '#0a0a0a',
            primary: '#ffbf00',
            secondary: '#cc9900',
            accent: '#ffdd66',
            text: '#ffffcc'
        },
        // Gameboy palette
        {
            bg: '#0f380f',
            primary: '#8bac0f',
            secondary: '#306230',
            accent: '#9bbc0f',
            text: '#c6d0b0'
        },
        // CGA palette
        {
            bg: '#000000',
            primary: '#55ffff',
            secondary: '#ff55ff',
            accent: '#ffffff',
            text: '#ffff55'
        },
        // ZX Spectrum
        {
            bg: '#000000',
            primary: '#00d8d8',
            secondary: '#d80000',
            accent: '#ffff00',
            text: '#ffffff'
        }
    ];

    // Get current theme index or default to 0
    let themeIndex = parseInt(localStorage.getItem('retroThemeIndex') || '0');

    // Advance to next theme
    themeIndex = (themeIndex + 1) % themes.length;

    // Apply new theme
    const newTheme = themes[themeIndex];
    root.style.setProperty('--bg-color', newTheme.bg);
    root.style.setProperty('--primary-color', newTheme.primary);
    root.style.setProperty('--secondary-color', newTheme.secondary);
    root.style.setProperty('--accent-color', newTheme.accent);
    root.style.setProperty('--text-color', newTheme.text);

    // Save the current theme index
    localStorage.setItem('retroThemeIndex', themeIndex.toString());

    // Create a "flash" effect
    const flashOverlay = document.createElement('div');
    flashOverlay.style.position = 'fixed';
    flashOverlay.style.top = '0';
    flashOverlay.style.left = '0';
    flashOverlay.style.width = '100%';
    flashOverlay.style.height = '100%';
    flashOverlay.style.backgroundColor = '#ffffff';
    flashOverlay.style.opacity = '0.3';
    flashOverlay.style.pointerEvents = 'none';
    flashOverlay.style.zIndex = '9999';
    flashOverlay.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(flashOverlay);

    setTimeout(() => {
        flashOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flashOverlay);
        }, 300);
    }, 50);
}

// Konami code easter egg activation
function activateEasterEgg() {
    playEasterEggSound();

    // Display a message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "KONAMI CODE ACTIVATED!";
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageDiv.style.color = '#ffcc00';
    messageDiv.style.fontFamily = "'Press Start 2P', monospace";
    messageDiv.style.fontSize = '24px';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.boxShadow = '0 0 20px #ffcc00';
    messageDiv.style.border = '2px solid #ffcc00';
    document.body.appendChild(messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);

    // Launch multiple fireworks over time
    const fireworksCount = 20;
    const fireworksDuration = 8000; // 8 seconds of fireworks

    // Launch fireworks at random positions
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            // Random position across the screen
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.1;
            createFirework(x, y);
        }, i * (fireworksDuration / fireworksCount));
    }
}

// Create a firework explosion
function createFirework(x, y) {
    // Play firework launch sound
    playFireworkSound();

    // Confetti colors - bright and festive
    const colors = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
        '#ff8800', '#ff0088', '#8800ff', '#00ff88', '#88ff00', '#ffffff'
    ];

    // Create the initial confetti launcher
    const launcher = document.createElement('div');
    launcher.style.position = 'fixed';
    launcher.style.width = '6px';
    launcher.style.height = '6px';
    launcher.style.backgroundColor = '#ffffff';
    launcher.style.left = `${x}px`;
    launcher.style.top = `${window.innerHeight}px`; // Start from bottom
    launcher.style.zIndex = '9998';
    launcher.style.pointerEvents = 'none';
    launcher.style.transition = 'all 1s ease-out';

    document.body.appendChild(launcher);

    // Animate the launcher rising
    setTimeout(() => {
        launcher.style.transform = `translateY(-${window.innerHeight - y}px)`;

        // When the launcher reaches its peak, create the confetti explosion
        setTimeout(() => {
            document.body.removeChild(launcher);

            // Create primary confetti pieces
            const confettiCount = Math.floor(Math.random() * 20) + 30; // 30-50 pieces

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');

                // Randomize confetti shape (square, rectangle, or triangle)
                const shapeType = Math.floor(Math.random() * 3);
                confetti.style.position = 'fixed';

                // Size varies between pieces
                const size = Math.random() * 15 + 8;
                confetti.style.width = `${size}px`;

                if (shapeType === 0) {
                    // Square
                    confetti.style.height = `${size}px`;
                } else if (shapeType === 1) {
                    // Rectangle
                    confetti.style.height = `${size * 0.5}px`;
                } else {
                    // Triangle (using border trick)
                    confetti.style.height = '0';
                    confetti.style.width = '0';
                    confetti.style.borderLeft = `${size / 2}px solid transparent`;
                    confetti.style.borderRight = `${size / 2}px solid transparent`;
                    confetti.style.borderBottom = `${size}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                    confetti.style.backgroundColor = 'transparent';
                }

                // Random color for non-triangles
                if (shapeType !== 2) {
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                }

                confetti.style.left = `${x}px`;
                confetti.style.top = `${y}px`;
                confetti.style.zIndex = '9998';
                confetti.style.pointerEvents = 'none';
                confetti.style.transition = 'all 2s cubic-bezier(0.1, 0.8, 0.2, 1)';
                confetti.style.transform = 'rotate(0deg)';

                document.body.appendChild(confetti);

                // Store the confetti element and its destination for secondary explosion
                const confettiData = {
                    element: confetti,
                    destX: Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 150 + 50) + x,
                    destY: Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 100 + 50) + y + (Math.random() * 100),
                    rotation: Math.random() * 720 - 360
                };

                // Animate primary confetti outward with rotation
                setTimeout(() => {
                    confetti.style.transform = `translate(${confettiData.destX - x}px, ${confettiData.destY - y}px) rotate(${confettiData.rotation}deg)`;

                    // Secondary explosion - each confetti explodes into smaller pieces
                    setTimeout(() => {
                        // Create secondary confetti at the position of the primary confetti
                        createSecondaryConfetti(confettiData.destX, confettiData.destY,
                            confetti.style.backgroundColor ||
                            (confetti.style.borderBottom && confetti.style.borderBottom.split(' ')[2]));

                        // Remove the primary confetti
                        document.body.removeChild(confetti);
                    }, 1000 + Math.random() * 500); // Random timing for secondary explosions
                }, 10);
            }

            // Create a flash at the explosion point
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.width = '30px';
            flash.style.height = '30px';
            flash.style.backgroundColor = '#ffffff';
            flash.style.borderRadius = '50%';
            flash.style.left = `${x - 15}px`;
            flash.style.top = `${y - 15}px`;
            flash.style.zIndex = '9997';
            flash.style.pointerEvents = 'none';
            flash.style.boxShadow = '0 0 30px 15px rgba(255, 255, 255, 0.8)';
            flash.style.opacity = '1';
            flash.style.transition = 'all 0.3s ease-out';

            document.body.appendChild(flash);

            // Fade out the flash
            setTimeout(() => {
                flash.style.opacity = '0';
                flash.style.transform = 'scale(2)';

                setTimeout(() => {
                    document.body.removeChild(flash);
                }, 300);
            }, 50);

        }, 1000); // Time for launcher to reach peak
    }, 10);
}

// Create secondary confetti explosion (smaller pieces)
function createSecondaryConfetti(x, y, color) {
    // Play a softer pop sound
    playSecondaryConfettiSound();

    // Create mini confetti pieces
    const miniCount = Math.floor(Math.random() * 8) + 5; // 5-12 mini pieces

    for (let i = 0; i < miniCount; i++) {
        const miniConfetti = document.createElement('div');

        // Smaller size for secondary confetti
        const size = Math.random() * 6 + 2;
        miniConfetti.style.position = 'fixed';
        miniConfetti.style.width = `${size}px`;
        miniConfetti.style.height = `${size}px`;

        // Use same color as parent with slight variations
        const hue = Math.random() * 30 - 15; // Slight hue variation
        miniConfetti.style.backgroundColor = color || '#ffffff';
        miniConfetti.style.filter = `brightness(${Math.random() * 0.4 + 0.8}) hue-rotate(${hue}deg)`;

        miniConfetti.style.left = `${x}px`;
        miniConfetti.style.top = `${y}px`;
        miniConfetti.style.zIndex = '9996';
        miniConfetti.style.pointerEvents = 'none';
        miniConfetti.style.transition = 'all 1s ease-out';
        miniConfetti.style.opacity = '1';

        document.body.appendChild(miniConfetti);

        // Animate mini confetti in random directions
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 20;
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance + (Math.random() * 50); // Add some gravity

            miniConfetti.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 360}deg)`;
            miniConfetti.style.opacity = '0';

            // Remove mini confetti after animation
            setTimeout(() => {
                document.body.removeChild(miniConfetti);
            }, 1000);
        }, 10);
    }
}

// Play secondary confetti pop sound
function playSecondaryConfettiSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a soft pop sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Play firework sound
function playFireworkSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a whistle sound for launch
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();

    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);

    gainNode1.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);

    oscillator1.start();
    oscillator1.stop(audioContext.currentTime + 0.2);

    // Create a bang sound for explosion (with delay)
    setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();

        oscillator2.type = 'square';
        oscillator2.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15);

        gainNode2.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);

        oscillator2.start();
        oscillator2.stop(audioContext.currentTime + 0.15);
    }, 1000);
}

// Play a special sound for the easter egg
function playEasterEggSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Create a more complex sound
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(110, audioContext.currentTime);

    // Create a sequence of notes
    const notes = [110, 220, 440, 880, 440, 220];
    let time = audioContext.currentTime;

    notes.forEach((note, index) => {
        time += 0.1;
        oscillator.frequency.setValueAtTime(note, time);
    });

    // Connect and play
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.8);
}

// God mode activation (IDDQD)
function activateGodMode() {
    // Play a godmode activation sound
    playGodModeSound();

    // Display a message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "GOD MODE ACTIVATED!";
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageDiv.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    messageDiv.style.fontFamily = "'Press Start 2P', monospace";
    messageDiv.style.fontSize = '24px';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.boxShadow = '0 0 20px ' + getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    messageDiv.style.border = '2px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary-color');

    document.body.appendChild(messageDiv);

    // Apply invincibility effect to all elements
    document.querySelectorAll('.card, .btn, #pixel-character, h1, h2, p').forEach(element => {
        element.style.transition = 'all 0.3s ease';
        element.style.boxShadow = '0 0 15px ' + getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        element.style.animation = 'pulsate 2s infinite';

        // Store the original border if exists
        if (element.style.border) {
            element.dataset.originalBorder = element.style.border;
        }

        element.style.border = '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    });

    // Add pulsate animation
    if (!document.getElementById('pulsate-animation')) {
        const style = document.createElement('style');
        style.id = 'pulsate-animation';
        style.textContent = `
            @keyframes pulsate {
                0% { opacity: 1; }
                50% { opacity: 0.8; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);

    // Remove god mode effects after 30 seconds
    setTimeout(() => {
        document.querySelectorAll('.card, .btn, #pixel-character, h1, h2, p').forEach(element => {
            element.style.boxShadow = '';
            element.style.animation = '';

            // Restore original border if existed
            if (element.dataset.originalBorder) {
                element.style.border = element.dataset.originalBorder;
                delete element.dataset.originalBorder;
            } else {
                element.style.border = '';
            }
        });
    }, 30000);
}

// Full arsenal activation (IDKFA)
function activateFullArsenal() {
    // Play weapon loading sounds
    playWeaponLoadSound();

    // Display a message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "FULL ARSENAL ACTIVATED!";
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageDiv.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    messageDiv.style.fontFamily = "'Press Start 2P', monospace";
    messageDiv.style.fontSize = '24px';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.boxShadow = '0 0 20px ' + getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    messageDiv.style.border = '2px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

    document.body.appendChild(messageDiv);

    // Create weapon effects (rockets, etc) firing from cursor on click
    let arsenalActive = true;
    let isShooting = false;
    let shootingInterval = null;

    // Function to create explosion at current mouse position
    const shoot = function (x, y) {
        if (!arsenalActive) return;

        // Create explosion effect at mouse point
        createExplosion(x, y);

        // Play weapon fire sound
        playWeaponFireSound();
    };

    // Start shooting on mousedown
    const weaponMouseDownHandler = function (e) {
        if (!arsenalActive) return;

        isShooting = true;

        // Shoot immediately on first click
        shoot(e.clientX, e.clientY);

        // Then continue shooting at intervals
        shootingInterval = setInterval(() => {
            if (isShooting) {
                shoot(lastMouseX, lastMouseY);
            }
        }, 100); // Adjust interval for shooting speed
    };

    // Track mouse position
    let lastMouseX = 0;
    let lastMouseY = 0;
    const mouseMoveHandler = function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    };

    // Stop shooting on mouseup
    const weaponMouseUpHandler = function () {
        isShooting = false;
        if (shootingInterval) {
            clearInterval(shootingInterval);
            shootingInterval = null;
        }
    };

    // Add event listeners
    document.body.addEventListener('mousedown', weaponMouseDownHandler);
    document.body.addEventListener('mouseup', weaponMouseUpHandler);
    document.body.addEventListener('mouseleave', weaponMouseUpHandler);
    document.body.addEventListener('mousemove', mouseMoveHandler);

    // Create a weapon indicator in the corner
    const weaponIndicator = document.createElement('div');
    weaponIndicator.textContent = "🚀 x 999 | 🔫 x 999";
    weaponIndicator.style.position = 'fixed';
    weaponIndicator.style.bottom = '10px';
    weaponIndicator.style.right = '10px';
    weaponIndicator.style.padding = '10px';
    weaponIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    weaponIndicator.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    weaponIndicator.style.fontFamily = "'Press Start 2P', monospace";
    weaponIndicator.style.fontSize = '12px';
    weaponIndicator.style.zIndex = '9999';
    weaponIndicator.style.borderRadius = '5px';
    weaponIndicator.style.border = '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

    document.body.appendChild(weaponIndicator);

    // Remove message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);

    // Remove arsenal effects after 30 seconds
    setTimeout(() => {
        arsenalActive = false;
        if (shootingInterval) {
            clearInterval(shootingInterval);
        }
        document.body.removeEventListener('mousedown', weaponMouseDownHandler);
        document.body.removeEventListener('mouseup', weaponMouseUpHandler);
        document.body.removeEventListener('mouseleave', weaponMouseUpHandler);
        document.body.removeEventListener('mousemove', mouseMoveHandler);
        document.body.removeChild(weaponIndicator);
    }, 30000);
}

// Create explosion effect
function createExplosion(x, y) {
    const container = document.body;
    const colors = ['#ff0000', '#ff5500', '#ffaa00', '#ffff00', '#ffffff'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.zIndex = '9998';
        particle.style.pointerEvents = 'none';
        particle.style.transition = 'all 0.5s cubic-bezier(0.1, 0.8, 0.2, 1)';

        container.appendChild(particle);

        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            particle.style.opacity = '0';

            setTimeout(() => {
                container.removeChild(particle);
            }, 500);
        }, 10);
    }
}

// Play god mode activation sound
function playGodModeSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a rich sound with multiple oscillators
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator1.type = 'sawtooth';
    oscillator1.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator1.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.2);
    oscillator1.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.4);

    oscillator2.type = 'square';
    oscillator2.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator2.frequency.linearRampToValueAtTime(300, audioContext.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator1.start();
    oscillator2.start();

    oscillator1.stop(audioContext.currentTime + 0.5);
    oscillator2.stop(audioContext.currentTime + 0.5);
}

// Play weapon load sound
function playWeaponLoadSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create sequence of loading sounds
    for (let i = 0; i < 4; i++) {
        const time = audioContext.currentTime + (i * 0.15);

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200 + (i * 100), time);

        gainNode.gain.setValueAtTime(0.2, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(time);
        oscillator.stop(time + 0.1);
    }
}

// Play weapon fire sound
function playWeaponFireSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Play error sound for disabled features
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a descending error sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Show message for disabled features
function showDisabledMessage() {
    const apiResult = document.getElementById('api-result');

    // Create a glitch effect
    apiResult.style.animation = 'glitch-btn 0.3s 3';

    // Flash the message
    apiResult.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    setTimeout(() => {
        apiResult.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }, 300);

    // Create a temporary message
    const originalContent = apiResult.innerHTML;
    apiResult.innerHTML = `<span style="color: #ff5555;">ERROR: API ENDPOINTS UNAVAILABLE IN STATIC MODE</span>`;

    // Restore original content after delay
    setTimeout(() => {
        apiResult.innerHTML = originalContent;
        apiResult.style.animation = '';
    }, 2000);
} 
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

    document.addEventListener('keydown', function (e) {
        konamiCode.push(e.key);
        if (konamiCode.length > correctKonami.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === correctKonami.join(',')) {
            activateEasterEgg();
        }
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
        case 'api-demo':
            fetchApiDemo();
            break;
        case 'toggle-theme':
            toggleRetroTheme();
            break;
    }
}

// Fetch data from the API endpoint
function fetchApiDemo() {
    const resultElement = document.getElementById('api-result');
    if (!resultElement) return;

    resultElement.textContent = 'Fetching data...';

    fetch('/api/hello')
        .then(response => response.json())
        .then(data => {
            resultElement.textContent = `API Response: ${JSON.stringify(data)}`;
        })
        .catch(error => {
            resultElement.textContent = `Error: ${error.message}`;
        });
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

    // Create falling pixels animation
    const container = document.querySelector('.container');
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFallingPixel(container);
        }, i * 100);
    }

    // Flash the screen
    const flashOverlay = document.createElement('div');
    flashOverlay.style.position = 'fixed';
    flashOverlay.style.top = '0';
    flashOverlay.style.left = '0';
    flashOverlay.style.width = '100%';
    flashOverlay.style.height = '100%';
    flashOverlay.style.backgroundColor = getRandomColor();
    flashOverlay.style.opacity = '0.5';
    flashOverlay.style.pointerEvents = 'none';
    flashOverlay.style.zIndex = '9998';
    flashOverlay.style.transition = 'opacity 0.5s ease';

    document.body.appendChild(flashOverlay);

    setTimeout(() => {
        flashOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flashOverlay);
        }, 500);
    }, 100);
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

// Create a falling pixel for the easter egg
function createFallingPixel(container) {
    const pixel = document.createElement('div');
    pixel.style.position = 'absolute';
    pixel.style.width = '10px';
    pixel.style.height = '10px';
    pixel.style.backgroundColor = getRandomColor();
    pixel.style.left = `${Math.random() * window.innerWidth}px`;
    pixel.style.top = '-10px';
    pixel.style.zIndex = '9997';
    pixel.style.pointerEvents = 'none';
    pixel.style.transition = 'all 3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';

    document.body.appendChild(pixel);

    // Animate falling with a slight delay
    setTimeout(() => {
        pixel.style.transform = `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`;

        // Remove the pixel after animation
        setTimeout(() => {
            document.body.removeChild(pixel);
        }, 3000);
    }, 10);
} 
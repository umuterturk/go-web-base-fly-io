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
    const currentBg = getComputedStyle(root).getPropertyValue('--bg-color').trim();

    // Cycle through different retro themes
    if (currentBg === '#0f0f1b') {
        // Switch to green terminal theme
        root.style.setProperty('--bg-color', '#001100');
        root.style.setProperty('--primary-color', '#00ff00');
        root.style.setProperty('--secondary-color', '#008800');
        root.style.setProperty('--accent-color', '#00aa00');
    } else if (currentBg === '#001100') {
        // Switch to amber terminal theme
        root.style.setProperty('--bg-color', '#100a00');
        root.style.setProperty('--primary-color', '#ffb000');
        root.style.setProperty('--secondary-color', '#ff8800');
        root.style.setProperty('--accent-color', '#ffcc00');
    } else {
        // Back to default theme
        root.style.setProperty('--bg-color', '#0f0f1b');
        root.style.setProperty('--primary-color', '#33ff66');
        root.style.setProperty('--secondary-color', '#ff5566');
        root.style.setProperty('--accent-color', '#ffcc00');
    }
}

// Konami code easter egg
function activateEasterEgg() {
    // Flash the screen
    const flashElement = document.createElement('div');
    flashElement.style.position = 'fixed';
    flashElement.style.top = '0';
    flashElement.style.left = '0';
    flashElement.style.width = '100%';
    flashElement.style.height = '100%';
    flashElement.style.backgroundColor = '#ffffff';
    flashElement.style.zIndex = '9999';
    flashElement.style.opacity = '0';
    flashElement.style.transition = 'opacity 0.1s';

    document.body.appendChild(flashElement);

    setTimeout(() => {
        flashElement.style.opacity = '1';
        playBeepSound();

        setTimeout(() => {
            flashElement.style.opacity = '0';

            setTimeout(() => {
                document.body.removeChild(flashElement);

                // Add some fun pixel art elements
                const pixelRain = document.createElement('div');
                pixelRain.className = 'pixel-rain';
                pixelRain.style.position = 'fixed';
                pixelRain.style.top = '0';
                pixelRain.style.left = '0';
                pixelRain.style.width = '100%';
                pixelRain.style.height = '100%';
                pixelRain.style.pointerEvents = 'none';
                pixelRain.style.zIndex = '9998';

                document.body.appendChild(pixelRain);

                // Create falling pixels
                for (let i = 0; i < 50; i++) {
                    createFallingPixel(pixelRain);
                }

                // Remove the effect after 10 seconds
                setTimeout(() => {
                    document.body.removeChild(pixelRain);
                }, 10000);
            }, 200);
        }, 100);
    }, 10);
}

// Create a falling pixel for the easter egg
function createFallingPixel(container) {
    const pixel = document.createElement('div');
    const size = Math.floor(Math.random() * 10) + 5;
    const colors = ['#33ff66', '#ff5566', '#ffcc00', '#66ccff'];

    pixel.style.position = 'absolute';
    pixel.style.width = `${size}px`;
    pixel.style.height = `${size}px`;
    pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    pixel.style.left = `${Math.random() * 100}%`;
    pixel.style.top = `-${size}px`;
    pixel.style.opacity = Math.random() * 0.5 + 0.5;

    container.appendChild(pixel);

    const duration = Math.random() * 5 + 3;
    const delay = Math.random() * 5;

    pixel.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + size}px)`, opacity: 0.5 }
    ], {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity
    });
} 
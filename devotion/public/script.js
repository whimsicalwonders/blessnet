let score = 0;
let clickCount = 0;
const scoreDisplay = document.getElementById('score-value');
const messageDisplay = document.getElementById('message');
const cucumbers = document.querySelectorAll('.cucumber');
const clickSound = document.getElementById('click-sound');

const messages = [
    "Cucumber power activated!",
    "The kingdom grows stronger!",
    "Cuc-tastic click!",
    "Long live the Cucumber King!",
    "Another veggie victory!"
];

function resetCucumberPositions() {
    const container = document.querySelector('.cucumber-container');
    const maxWidth = container.offsetWidth - 80; // Adjust for cucumber width
    const maxHeight = container.offsetHeight - 80; // Adjust for cucumber height
    cucumbers.forEach(cucumber => {
        const newLeft = Math.random() * maxWidth;
        const newTop = Math.random() * maxHeight;
        cucumber.style.left = `${newLeft}px`;
        cucumber.style.top = `${newTop}px`;
    });
    console.log('Cucumbers repositioned!');
}

function handleCucumberClick(cucumber) {
    try {
        score += 10;
        clickCount++;
        scoreDisplay.textContent = score;
        cucumber.classList.add('bounce');
        setTimeout(() => cucumber.classList.remove('bounce'), 500);

        // Slight position shift on click
        const maxShift = 20;
        const newLeft = Math.random() * maxShift - maxShift / 2;
        const newTop = Math.random() * maxShift - maxShift / 2;
        cucumber.style.left = `${parseFloat(cucumber.style.left || 0) + newLeft}px`;
        cucumber.style.top = `${parseFloat(cucumber.style.top || 0) + newTop}px`;

        // Play sound
        clickSound.currentTime = 0; // Reset sound to start
        clickSound.play().catch(err => console.error('Audio playback error:', err));

        // Random message
        messageDisplay.textContent = messages[Math.floor(Math.random() * messages.length)];

        // Reset positions every 10 clicks
        if (clickCount % 10 === 0) {
            resetCucumberPositions();
            messageDisplay.textContent = "Cucumbers scattered! Keep clicking!";
        }

        console.log(`Cucumber clicked! Score: ${score}, Clicks: ${clickCount}`);
    } catch (error) {
        console.error('Error handling click:', error);
        messageDisplay.textContent = 'Oops, something went wrong!';
    }
}

cucumbers.forEach(cucumber => {
    cucumber.addEventListener('click', () => handleCucumberClick(cucumber));
});

// Initialize cucumber positions
resetCucumberPositions();
console.log('Cucumber Kingdom initialized. Ready to click!');
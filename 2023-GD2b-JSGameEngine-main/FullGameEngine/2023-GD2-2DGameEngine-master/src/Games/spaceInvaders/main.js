// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player class
class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 5;
    }

    draw() {
        // Draw the player as a white rectangle
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        // Move the player to the left
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    moveRight() {
        // Move the player to the right
        this.x += this.speed;
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }

    fire() {
        // Create a new bullet and add it to the bullets array
        const bullet = new Bullet(this.x + this.width / 2 - 2.5, this.y, 5, 10, 7);
        bullets.push(bullet);
    }
}

// Bullet class
class Bullet {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    draw() {
        // Draw the bullet as a white rectangle
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // Update the bullet's position by moving it upwards
        this.y -= this.speed;
    }
}

// Alien class
class Alien {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        // Draw the alien as a green rectangle
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Constants and Variables
const alienRows = 4;
const alienColumns = 10;
const alienWidth = 40;
const alienHeight = 30;
const alienPadding = 10;
let alienDirection = 1; // 1: right, -1: left
let alienMoveDown = false;

const keyStates = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
};

// Game Objects
const player = new Player(canvas.width / 2 - 25, canvas.height - 50, 50, 20);
let bullets = [];
const aliens = createAliens();

// Create aliens
function createAliens() {
    let aliensArray = [];
    for (let row = 0; row < alienRows; row++) {
        for (let col = 0; col < alienColumns; col++) {
            const x = col * (alienWidth + alienPadding);
            const y = row * (alienHeight + alienPadding);
            aliensArray.push(new Alien(x, y, alienWidth, alienHeight));
        }
    }
    return aliensArray;
}

// Update function
function update() {
    // Update player based on key states
    if (keyStates.ArrowLeft) {
        player.moveLeft();
    }
    if (keyStates.ArrowRight) {
        player.moveRight();
    }

    // Fire bullet when Space key is pressed
    if (keyStates.Space) {
        player.fire();
        keyStates.Space = false; // Prevent continuous firing
    }

    // Update bullets
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    let moveDownThisFrame = false;
    if (alienMoveDown) {
        moveDownThisFrame = true;
        alienMoveDown = false;
    }

    // Update aliens' positions
    aliens.forEach((alien) => {
        if (moveDownThisFrame) {
            alien.y += 20;
        } else {
            alien.x += 2 * alienDirection;
        }
    });

    // Check for bullet-alien collisions
    bullets.forEach((bullet, bulletIndex) => {
        bullet.update();
        aliens.forEach((alien, alienIndex) => {
            if (
                alien &&
                bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y
            ) {
                // Collision detected, remove bullet and alien
                bullets.splice(bulletIndex, 1);
                aliens.splice(alienIndex, 1);
            }
        });

        if (bullet.y < 0) {
            bullets.splice(bulletIndex, 1);
        }
    });

    // Check if all aliens are destroyed
    if (aliens.length === 0) {
        resetGame();
    }

    // Detect if aliens need to change direction or move down
    const leftMostAlien = aliens.reduce((leftMost, current) => (current.x < leftMost.x ? current : leftMost), aliens[0]);
    const rightMostAlien = aliens.reduce((rightMost, current) => (current.x > rightMost.x ? current : rightMost), aliens[0]);

    if (!moveDownThisFrame && (rightMostAlien.x + alienWidth > canvas.width || leftMostAlien.x < 0)) {
        alienDirection *= -1;
        alienMoveDown = true;
    }
}

// Draw function
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    player.draw();

    // Draw bullets
    bullets.forEach((bullet) => bullet.draw());

    // Draw aliens
    aliens.forEach((alien) => alien.draw());
}

// Game loop
function gameLoop() {
    // Check if game over
    if (isGameOver()) {
        alert('Game Over');
        return;
    }

    // Update game state and draw
    update();
    draw();

    // Request next animation frame
    requestAnimationFrame(gameLoop);
}

// Check if game over
function isGameOver() {
    return aliens.some((alien) => alien.y + alien.height >= canvas.height - player.height);
}

// Reset the game
function resetGame() {
    aliens.length = 0; // Clear the aliens array

    // Recreate aliens
    aliens.push(...createAliens());
}

// Event Handlers
function handleKeyDown(e) {
    if (e.code in keyStates) {
        keyStates[e.code] = true;
    }
}

function handleKeyUp(e) {
    if (e.code in keyStates) {
        keyStates[e.code] = false;
    }
}

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Start the game loop
gameLoop();

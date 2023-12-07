// Define constants and variables
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const gameArea = document.getElementById("game-container");

const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

let playerX = 0;
let playerY = 75;
let enemyX = Math.random() * (gameWidth - playerWidth);
let enemyY = Math.random() * (gameHeight - playerHeight);

let gameOver = false;
let keys = {};

// Define the game loop function
function gameLoop() {
handlePlayerMovement();
moveEnemyTowardsPlayer();
updatePlayerPosition();
updateEnemyPosition();
checkCollisions();

if (!gameOver) {
requestAnimationFrame(gameLoop);
} else {
endGame();
}
}

// Define the keydown and keyup event listeners to handle player movement
document.addEventListener("keydown", event => {
keys[event.key] = true;
});

document.addEventListener("keyup", event => {
keys[event.key] = false;
});

// Define the functions for handling player movement and enemy movement
function handlePlayerMovement() {
if (keys.ArrowLeft && playerX > 0) {
playerX -= 3;
}
if (keys.ArrowRight && playerX < gameWidth - playerWidth) {
playerX += 3;
}
if (keys.ArrowUp && playerY > 0) {
playerY -= 3;
}
if (keys.ArrowDown && playerY < gameHeight - playerHeight) {
playerY += 3;
}
}

function moveEnemyTowardsPlayer() {
const enemySpeed = 1;
const dx = playerX - enemyX;
const dy = playerY - enemyY;
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance > 0) {
enemyX += dx / distance * enemySpeed;
enemyY += dy / distance * enemySpeed;
}
}

// Define functions for updating player and enemy positions
function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
  }
  
  function updateEnemyPosition() {
    enemy.style.left = `${enemyX}px`;
    enemy.style.top = `${enemyY}px`;
  }
  

// Define the function for checking collisions
function checkCollisions() {
const collisionDistance = playerWidth / 2 + enemy.offsetWidth / 2;
const dx = playerX - enemyX;
const dy = playerY - enemyY;
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < collisionDistance) {
// Collision detected, end the game
player.style.opacity = 0;
gameOver = true;
}
}

// Define the end game function
function endGame() {
// Display the game over message
alert("Game Over");
resetGame();
}

// Define the reset game function
function resetGame() {
playerX = 0;
playerY = 75;
enemyX = Math.random() * (gameWidth - playerWidth);
enemyY = Math.random() * (gameHeight - playerHeight);
keys = {};
player.style.opacity = 1;
gameOver = false;
requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
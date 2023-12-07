// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define player and enemy dimensions and positions
const playerWidth = 50;
const playerHeight = 50;
let playerX = 0;
let playerY = canvas.height / 2 - playerHeight / 2;
const enemyWidth = 50;
const enemyHeight = 50;
let enemyX = canvas.width - enemyWidth;
let enemyY = canvas.height / 2 - enemyHeight / 2;

// Define the game loop function
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player and enemy
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
  ctx.fillStyle = "red";
  ctx.fillRect(enemyX, enemyY, enemyWidth, enemyHeight);

  // Move the enemy towards the player
  const enemySpeed = 1;
  const dx = playerX - enemyX;
  const dy = playerY - enemyY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance > 0) {
    enemyX += dx / distance * enemySpeed;
    enemyY += dy / distance * enemySpeed;
  }

  // Handle player movement
  const playerSpeed = 3;
  
  if (keys.ArrowLeft && playerX > 0) {
    playerX -= playerSpeed;
  }
  
  if (keys.ArrowRight && playerX < canvas.width - playerWidth) {
    playerX += playerSpeed;
  }
  
  if (keys.ArrowUp && playerY > 0) {
    playerY -= playerSpeed;
  }
  
  if (keys.ArrowDown && playerY < canvas.height - playerHeight) {
    playerY += playerSpeed;
  }

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop and define event listeners
let keys = {};

document.addEventListener("keydown", event => {
  keys[event.key] = true;
});

document.addEventListener("keyup", event => {
  keys[event.key] = false;
});

requestAnimationFrame(gameLoop); // Initial call to game loop

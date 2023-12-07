// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the number of tiles in the X and Y directions, and calculate the size of each tile
const numTilesX = 10;
const numTilesY = 10;
const tileSize = canvas.width / numTilesX;

// Define the initial position, size, and speed of Pac-Man
const pacMan = { x: canvas.width / 2, y: canvas.height / 2, size: tileSize, speed: tileSize / 15 };

// Define the maze layout
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 1, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Define the initial positions, colors, sizes, and speeds of the ghosts
const ghosts = [
  { x: 1 * tileSize, y: 1 * tileSize, color: 'red', speed: tileSize / 60, size: tileSize * 0.8 },
  { x: 8 * tileSize, y: 1 * tileSize, color: 'pink', speed: tileSize / 60, size: tileSize * 0.8 },
];

// Define variables for score, lives, and movement direction
let score = 0;
let lives = 3;
let dx = 0;
let dy = 0;

// Add event listener for arrow key presses to change the direction of Pac-Man
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') { dx = 0; dy = -pacMan.speed; }
  else if (e.key === 'ArrowDown') { dx = 0; dy = pacMan.speed; }
  else if (e.key === 'ArrowLeft') { dx = -pacMan.speed; dy = 0; }
  else if (e.key === 'ArrowRight') { dx = pacMan.speed; dy = 0; }
});

// Start the game loop using requestAnimationFrame
requestAnimationFrame(function gameLoop() {
  update();
  draw();

  if (lives > 0) { requestAnimationFrame(gameLoop); }
  else { gameOver(); }
});

// The update function is called in each frame to update game state
function update() {
  updatePacMan();
  updateGhosts();
  checkPelletCollision();
  checkGhostCollision();
}

// The draw function is called in each frame to render the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPacMan();
  drawGhosts();
  drawScore();
  drawLives();
}

// Update the position of Pac-Man based on the current movement direction
function updatePacMan() {
  const newX = pacMan.x + dx;
  const newY = pacMan.y + dy;
  if (!isWallCollision(newX, newY)) {
    pacMan.x = newX;
    pacMan.y = newY;
  }
}

// Update the positions of the ghosts based on Pac-Man's position
function updateGhosts() {
  for (const ghost of ghosts) {
    const gridX = Math.floor(ghost.x / tileSize);
    const gridY = Math.floor(ghost.y / tileSize);
    const targetGridX = Math.floor(pacMan.x / tileSize);
    const targetGridY = Math.floor(pacMan.y / tileSize);

    const dx = targetGridX - gridX;
    const dy = targetGridY - gridY;

    const distX = Math.abs(dx);
    const distY = Math.abs(dy);

    if (distX > distY) {
      if (dx > 0 && !isWallCollision(ghost.x + ghost.speed, ghost.y)) {
        ghost.x += ghost.speed;
      } else if (dx < 0 && !isWallCollision(ghost.x - ghost.speed, ghost.y)) {
        ghost.x -= ghost.speed;
      }
    } else {
      if (dy > 0 && !isWallCollision(ghost.x, ghost.y + ghost.speed)) {
        ghost.y += ghost.speed;
      } else if (dy < 0 && !isWallCollision(ghost.x, ghost.y - ghost.speed)) {
        ghost.y -= ghost.speed;
      }
    }
  }
}

// Check for collision between Pac-Man and pellets
function checkPelletCollision() {
  const tileX = Math.floor(pacMan.x / tileSize);
  const tileY = Math.floor(pacMan.y / tileSize);

  if (maze[tileY][tileX] === 2) {
    score += 10;
    maze[tileY][tileX] = 0;
  }
}

// Check for collision between Pac-Man and ghosts
function checkGhostCollision() {
  for (const ghost of ghosts) {
    const dx = Math.abs(pacMan.x - ghost.x);
    const dy = Math.abs(pacMan.y - ghost.y);

    if (dx < tileSize && dy < tileSize) {
      lives -= 1;
      resetPacManAndGhosts();
      break;
    }
  }
}

// Reset the positions of Pac-Man and ghosts after a collision
function resetPacManAndGhosts() {
  pacMan.x = canvas.width / 2;
  pacMan.y = canvas.height / 2;

  ghosts[0].x = 1 * tileSize;
  ghosts[0].y = 1 * tileSize;
  ghosts[1].x = 8 * tileSize;
  ghosts[1].y = 1 * tileSize;
}

// Display the game over message
function gameOver() {
  ctx.fillStyle = 'red';
  ctx.font = '40px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
}

// Draw Pac-Man
function drawPacMan() {
  ctx.beginPath();
  ctx.arc(pacMan.x, pacMan.y, pacMan.size / 2, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(pacMan.x, pacMan.y);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

// Draw the ghosts
function drawGhosts() {
  for (const ghost of ghosts) {
    ctx.fillStyle = ghost.color;
    ctx.fillRect(ghost.x - ghost.size / 2, ghost.y - ghost.size / 2, ghost.size, ghost.size);
  }
}

// Draw the maze
function drawMaze() {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else if (maze[y][x] === 2) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize / 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

// Check if there is a wall collision at the given coordinates
function isWallCollision(x, y) {
  const tileX = Math.floor(x / tileSize);
  const tileY = Math.floor(y / tileSize);
  return maze[tileY] && maze[tileY][tileX] === 1;
}

// Draw the current score
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Draw the number of remaining lives
function drawLives() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Lives: ${lives}`, 10, 50);
}

// Import required modules
import Player from "./player.js";
import Enemy from "./enemy.js";
import Collectible from "./collectible.js";
import Sound from "./sounds.js";
import UI from "./ui.js";
import { circleRectCollision, detectCollision } from "./collision.js";
import InputManager from "./input.js";
import Animation from "./animation.js";
import ParticleEmitter from "./particleEmitter.js";
import Level from "./level.js"; 
import Obstacle from "./obstacle.js";
// Initialize canvas, context, and required objects
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sound = new Sound();
const ui = new UI(canvas);
const particleEmitter = new ParticleEmitter();

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Initialize variables
let canDecrementLives = true;
// Instantiate a Level object
const level = new Level(canvas, 1, 200, 5000);
const { enemy, collectibles } = level.loadLevel();
const player = new Player(50, 50, 30, 30, "blue", 1000);
// Create an array to hold Obstacle objects
const obstacles = [
  new Obstacle(100, 300, 150, 20, "purple"),
  new Obstacle(300, 200, 20, 150, "purple"),
  new Obstacle(500, 400, 150, 20, "purple"),
];
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const collectible = new Collectible(x, y, 20, "yellow");
  collectibles.push(collectible);
}, 5000);

// Load player animation images
const playerImages = [
  document.createElement("img"),
  document.createElement("img"),
  document.createElement("img"),
];
playerImages[0].src = "./resources/image1.jpg";
playerImages[1].src = "./resources/image2.jpg";
playerImages[2].src = "./resources/image3.jpg";

// Create player animation instance
const playerAnimation = new Animation(playerImages, 0.15);

// Create input manager instance
const inputManager = new InputManager();

// Main game loop function
function gameLoop(lastTime) {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;

  // If lives reach zero, end the game
  if (ui.lives <= 0) {
    endGame();
    return;
  }
  function isValidMove(newX, newY) {
    const tempPlayer = new Player(newX, newY, player.width, player.height, player.color, player.speed);
    for (const obstacle of obstacles) {
      if (detectCollision(tempPlayer, obstacle)) {
        return false;
      }
    }
    return true;
  }
  function isValidEnemyMove(newX, newY) {
    const tempEnemy = new Enemy(newX, newY, enemy.width, enemy.height, enemy.color, enemy.speed);
    for (const obstacle of obstacles) {
      if (detectCollision(tempEnemy, obstacle)) {
        return false;
      }
    }
    return true;
  }

  // Clear canvas and draw game objects
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx, playerAnimation);
  enemy.draw(ctx);
  obstacles.forEach((obstacle) => {
    obstacle.draw(ctx);
    if (detectCollision(player, obstacle)) {
      player.undoMove(deltaTime);
    }
  });
      // Stop the player's movement in the direction of the collision
     

  // Play background music if not playing
  if (!sound.bgSoundPlaying) {
    sound.playBackgroundMusic();
    sound.bgSoundPlaying = true;
  }

  // Check for player and enemy collision
  if (detectCollision(player, enemy)) {
    if (canDecrementLives) {
      ui.decrementLives();
      canDecrementLives = false;
      setTimeout(() => {
        canDecrementLives = true;
      }, 2000);
    }
  }

  // Draw and update collectibles, check for player and collectible collision, and emit particles
  collectibles.forEach((collectible) => {
    if (!collectible.isCollected) {
      collectible.draw(ctx);
      if (circleRectCollision(collectible, player)) {
        sound.play("collect");
        ui.updateScore(10);
        collectible.isCollected = true;
        particleEmitter.emit(collectible.x, collectible.y, 3, "yellow", 20);
      }
    }
  });

  // Draw UI elements
  ui.drawScore(ctx, 10, 30);
  ui.drawLives(ctx, 10, 30);

  // Update and draw particle emitter
  particleEmitter.updateAndDraw(ctx);

// Update player animation and positions
playerAnimation.update(deltaTime);
player.update(deltaTime);
enemy.update(player, deltaTime, isValidEnemyMove);

// Update player movement based on user input
if (inputManager.isKeyPressed("ArrowLeft") && isValidMove(player.x - player.speed * deltaTime, player.y)) {
  player.moveLeftPressed = true;
} else {
  player.moveLeftPressed = false;
}
if (inputManager.isKeyPressed("ArrowRight") && isValidMove(player.x + player.speed * deltaTime, player.y)) {
  player.moveRightPressed = true;
} else {
  player.moveRightPressed = false;
}
if (inputManager.isKeyPressed("ArrowUp") && isValidMove(player.x, player.y - player.speed * deltaTime)) {
  player.moveUpPressed = true;
} else {
  player.moveUpPressed = false;
}
if (inputManager.isKeyPressed("ArrowDown") && isValidMove(player.x, player.y + player.speed * deltaTime)) {
  player.moveDownPressed = true;
} else {
  player.moveDownPressed = false;
}

// Call the gameLoop function recursively using requestAnimationFrame()
requestAnimationFrame(() => gameLoop(currentTime));
}

// Start the game loop
gameLoop(performance.now());

// End game function
function endGame() {
// Stop any game sounds that may be playing
sound.stopBackgroundMusic();

// Display a game over message
ui.drawGameOver(ctx);

// Stop the game loop by removing the recursive call to gameLoop()
// and remove the event listeners for keydown and keyup
}

// This class depends on the Camera, which is a separate module and needs to be imported.
import Camera from './camera.js';

// The Game class is responsible for setting up and managing the main game loop.
class Game {
  // The constructor initializes a new instance of the Game class.
  constructor(canvasId) {
    // The canvas HTML element where the game will be drawn.
    this.canvas = document.getElementById(canvasId);
    // The 2D rendering context for the canvas, which is used for drawing.
    this.ctx = this.canvas.getContext('2d');
    // An array to hold all the game objects that are currently in the game.
    this.gameObjects = [];
    // An array to hold game objects that are marked to be removed from the game.
    this.gameObjectsToRemove = [];
    // The time at which the last frame was rendered.
    this.lastFrameTime = 0;
    // The amount of time that passed between the last frame and the current frame.
    this.deltaTime = 0;
    // Adjust the size of the canvas to match the window size.
    this.resizeCanvas();
    // Add an event listener to resize the canvas whenever the window size changes.
    window.addEventListener('resize', () => this.resizeCanvas());
    // Instantiate a new camera without a target and with dimensions equal to the canvas size.
    this.camera = new Camera(null, this.canvas.width, this.canvas.height);
  }

  // This method resizes the canvas to fill the window, with a small margin.
  resizeCanvas() {
    this.canvas.width = window.innerWidth - 50;
    this.canvas.height = window.innerHeight - 50;
  }

  // This method starts the game loop.
  start() {
    this.isRunning = true;
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  // The main game loop, which is called once per frame.
  gameLoop(currentFrameTime) {
    // Calculate the time passed since the last frame.
    this.deltaTime = (currentFrameTime - this.lastFrameTime) / 1000;
    // Update the last frame time.
    this.lastFrameTime = currentFrameTime;

    // Update all game objects and the camera.
    this.update();
    this.camera.update();
    // Draw the game objects on the canvas.
    this.draw();

    // Request the next animation frame, which will call this method again.
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  // This method updates all the game objects.
  update() {
    // Call each game object's update method with the delta time.
    for (const gameObject of this.gameObjects) {
      gameObject.update(this.deltaTime);
    }
    // Filter out game objects that are marked for removal.
    this.gameObjects = this.gameObjects.filter(obj => !this.gameObjectsToRemove.includes(obj));
    // Clear the list of game objects to remove.
    this.gameObjectsToRemove = [];
  }

  // This method draws all the game objects on the canvas.
  draw() {
    // Clear the entire canvas.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save the current state of the canvas and the context.
    this.ctx.save();
    // Translate the canvas by the negative of the camera's position. This makes the camera follow its target.
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Draw each game object on the canvas.
    for (const gameObject of this.gameObjects) {
      gameObject.draw(this.ctx);
    }

    // Restore the canvas and context to their state before the camera translation.
    this.ctx.restore();
  }

  // This method adds a game object to the game.
  addGameObject(gameObject) {
    // Set the game object's game property to this game instance.
    gameObject.game = this;
    // Add the game object to the array of game objects.
    this.gameObjects.push(gameObject);
  }

  // This method marks a game object for removal from the game.
  removeGameObject(gameObject) {
    // Add the game object to the array of game objects to remove.
    this.gameObjectsToRemove.push(gameObject);
  }

  // This method resets the game to its initial state and then restarts it.
  reset() {
    // Stop the game.
    this.isRunning = false;

    // Reset all game objects that have a reset method.
    for (const gameObject of this.gameObjects) {
      if (gameObject.reset) {
        gameObject.reset();
      }
    }

    // Restart the game.
    this.start();
  }
}

// The Game class is then exported as the default export of this module.
export default Game;

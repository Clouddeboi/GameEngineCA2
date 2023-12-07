// Import the GameObject class from the 'engine' directory
import GameObject from '../engine/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../engine/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../engine/physics.js';

// Import the Images object from the 'engine' directory. This object contains all the game's image resources
import {Images} from '../engine/resources.js';

// Import the Player and Platform classes from the current directory
import Player from './player.js';
import Platform from './platform.js';

// Define a new class, Enemy, which extends (i.e., inherits from) GameObject
class Enemy extends GameObject {

  // Define the constructor for this class, which takes two arguments for the x and y coordinates
  constructor(x, y) {
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this enemy, responsible for rendering it in the game.
    // The renderer uses the color 'green', dimensions 50x50, and an enemy image from the Images object
    this.addComponent(new Renderer('green', 50, 50, Images.enemy));
    
    // Add a Physics component to this enemy, responsible for managing its physical interactions
    // Sets the initial velocity and acceleration
    this.addComponent(new Physics({ x: 50, y: 0 }, { x: 0, y: 0 }));
    
    // Initialize variables related to enemy's movement
    this.movementDistance = 0;
    this.movementLimit = 100;
    this.movingRight = true;
  }

  // Define an update method that will run every frame of the game. It takes deltaTime as an argument
  // which represents the time passed since the last frame
  update(deltaTime) {
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);

    // Check if the enemy is moving to the right
    if (this.movingRight) {
      // If it hasn't reached its movement limit, make it move right
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = 50;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = 1;
      } else {
        // If it reached the limit, make it move left
        this.movingRight = false;
        this.movementDistance = 0;
      }
    } else {
      // If it hasn't reached its movement limit, make it move left
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = -50;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = -1;
      } else {
        // If it reached the limit, make it move right
        this.movingRight = true;
        this.movementDistance = 0;
      }
    }

    // Check if the enemy is colliding with the player
    const player = this.game.gameObjects.find(obj => obj instanceof Player);
    if (physics.isColliding(player.getComponent(Physics))) {
      player.collidedWithEnemy();
    }

    // Check if the enemy is colliding with any platforms
    const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);
    this.isOnPlatform = false;
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        // If it is, stop its vertical movement and position it on top of the platform
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = platform.y - this.getComponent(Renderer).height;
        this.isOnPlatform = true;
      }
    }

    // Call the update method of the superclass (GameObject), passing along deltaTime
    super.update(deltaTime);
  }
}

// Export the Enemy class as the default export of this module
export default Enemy;

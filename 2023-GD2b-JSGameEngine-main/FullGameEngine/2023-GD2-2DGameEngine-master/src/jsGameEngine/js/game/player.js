// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import { AudioFiles } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import playerUI from './playerUI.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 50, 50, Images.player); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 5.5;
    this.jumpTime = 0.2;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.PlayerSpeed = 5;//helps us manage players speed better

    //SFX
    this.JumpSFX = AudioFiles.jump;//adds the jump sound effect
    this.CollectbleSFX = AudioFiles.Collect;//adds the collect sound effect
    this.GamerOverSFX = AudioFiles.GameOver;//adds the game over sound effect

    this.isPaused = false;//sets the game to not be paused
    this.timer = 15;//sets the timer to 60 seconds
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    if(!this.isPaused)//if the game is not paused
    {

      this.timer -= deltaTime;//decreases the timer by the amount of time that has passed

      const physics = this.getComponent(Physics); // Get physics component
      const input = this.getComponent(Input); // Get input componentS

      const FinishGame = physics.FinishGame;//set finish game variable to false

      this.handleGamepadInput(input);
      
      // Handle player movement
      if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
        physics.velocity.x = this.PlayerSpeed;
        this.direction = -1;
      } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
        physics.velocity.x = -this.PlayerSpeed;
        this.direction = 1;
      } else if (!this.isGamepadMovement) {
        physics.velocity.x = 0;
      }

      // Handle player jumping
      if (!this.isGamepadJump && input.isKeyDown('ArrowUp')) {
        this.startJump();
        this.JumpSFX.play();//plays the jump sound effect
      }

      if (this.isJumping) {
        this.updateJump(deltaTime);
      }

      // Handle collisions with collectibles
      const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
      for (const collectible of collectibles) 
      {
        if (physics.isColliding(collectible.getComponent(Physics))) 
        {
          this.collect(collectible);
          this.game.removeGameObject(collectible);
          this.CollectbleSFX.play();
        }
      }
    
      // Handle collisions with enemies
      const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
      for (const enemy of enemies) {
        if (physics.isColliding(enemy.getComponent(Physics))) {
          this.collidedWithEnemy();
        }
      }
      
    
      // Check if player has fallen off the bottom of the screen
      // if (this.y > this.game.canvas.height) {
      //   this.resetPlayerState();
      // }

      /*
        Co-pilot helped me with this code
        it showed me how to make a game over screen
        i then coded a win screen myself
      */

      // Create game over screen
      let gameOverScreen = document.createElement('div');//creates a div element
      gameOverScreen.id = 'game-over-screen';//sets the id of the div element to game-over-screen
      gameOverScreen.style.display = 'none';//sets the display of the div element to none
      gameOverScreen.innerHTML = '<h1>Game Over</h1><button onclick="location.reload()">Play Again</button>';
      document.body.appendChild(gameOverScreen);//adds the div element to the body of the html

      // Create win screen
      let winScreen = document.createElement('div');
      winScreen.id = 'win-screen';//sets the id of the div element to win-screen
      winScreen.style.display = 'none';
      winScreen.innerHTML = '<h1>You Win!</h1><button onclick="location.reload()">Play Again</button>';
      document.body.appendChild(winScreen);

      // Check if player has no lives left
      if (this.timer <= 0) 
      {
        this.isPaused = true;
        console.log('You lose!');
        document.getElementById('game-over-screen').style.display = 'block';
        this.GamerOverSFX.play();//plays the game over sound effect
      }

      if(FinishGame)//if the player has finished the game
      {
        this.isPaused = true;
        console.log('You Win!');
        document.getElementById('win-screen').style.display = 'block';
        document.getElementById('win-screen').classList.add('shake');
      }

      super.update(deltaTime);
    }
  }

    handleGamepadInput(input){
      const gamepad = input.getGamepad(); // Get the gamepad input
      const physics = this.getComponent(Physics); // Get physics component
      if (gamepad) {
        // Reset the gamepad flags
        this.isGamepadMovement = false;
        this.isGamepadJump = false;

        // Handle movement
        const horizontalAxis = gamepad.axes[0];
        // Move right
        if (horizontalAxis > 0.1) {
          this.isGamepadMovement = true;
          physics.velocity.x = 100;
          this.direction = -1;
        } 
        // Move left
        else if (horizontalAxis < -0.1) {
          this.isGamepadMovement = true;
          physics.velocity.x = -100;
          this.direction = 1;
        } 
        // Stop
        else {
          physics.velocity.x = 0;
        }
        
        // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
        if (input.isGamepadButtonDown(0)) {
          this.isGamepadJump = true;
          console.log(this.getComponent(Physics).Grounded);
          this.startJump();
        }
      }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.getComponent(Physics).Grounded) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    this.timer += 3;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}
export default Player;
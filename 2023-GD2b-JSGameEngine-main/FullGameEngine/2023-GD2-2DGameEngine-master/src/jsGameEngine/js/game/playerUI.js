import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component with initial text and add it to this object's components.
    this.uiComponent = new UI('Lives: 3 Score: 0', x, y);
    this.addComponent(this.uiComponent);
    
    this.timer = 60;//sets the timer to 60 seconds
  }

  // The update method is called every frame.
  update(deltaTime) {

    this.timer -= deltaTime;//decreases the timer by the amount of time that has passed
    // Find the player object in the game's gameObjects array.
    const player = this.game.gameObjects.find((obj) => obj instanceof Player);

    // Update the text of the UI component to reflect the player's current lives and score and timer.
    this.uiComponent.setText(`Lives: ${player.lives}       Score: ${player.score}      Timer: ${Math.max(0, Math.floor(this.timer))}s`);
  
    if(this.timer <= 0)//if the timer is less than or equal to 0
    {
      player.lives = 0;//set the players lives to 0
    }
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.

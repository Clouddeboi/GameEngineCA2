// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    //const floorWidth = 5000;
    const gap = 100;

    // Create platforms and add them to the game
    /*
    FORMAT: new Platform(x, y, width, height, color = 'white', tag = "platform", BounceAmount = 0)
    RGB Colour wheel: https://www.colorspire.com/rgb-color-wheel/
    Colour Pallete Used: https://lospec.com/palette-list/microsoft-windows
    Ground+Walls: "rgb(0, 0, 126)"
    Bounce Platform: "rgb(255, 255, 4)"
     */
    const platforms = [
      new Platform(0, 800, 1000, 5000, "rgb(0, 0, 126)", "platform", 0, false),
      new Platform(650, 780, 80, 20, "rgb(255, 255, 4)", "platform", 8, false),
      new Platform(650, 780, 500, 20, "rgb(255, 255, 4)", "platform", 0, true, true, false),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    //Create enemies and add them to the game
    this.addGameObject(new Enemy(50, this.canvas.height - 90));
    //this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));
    //this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 10));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(750, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(800, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;

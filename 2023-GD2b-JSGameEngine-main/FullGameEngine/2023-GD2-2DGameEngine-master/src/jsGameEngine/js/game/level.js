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
    Slippery Platform: "rgb(6, 255, 255)"
     */
    const platforms = [
      //Floor and Walls
      new Platform(-800, 800, 6000, 6000, "rgb(0, 0, 126)", "platform", 0, false),//floor
      new Platform(-800, -1000, 1000, 5000, "rgb(0, 0, 126)", "platform", 0, false),//left wall
      new Platform(1980, -1000, 2000, 5000, "rgb(0, 0, 126)", "platform", 0, false),//right wall

      //Platforms
      new Platform(500, 300, 200, 20, "rgb(0, 0, 126)", "platform", 0, false),
      new Platform(800, 150, 200, 20, "rgb(0, 0, 126)", "platform", 0, false),
      new Platform(500, -700, 200, 20, "rgb(0, 0, 126)", "platform", 0, false),
      new Platform(1200, -400, 200, 20, "rgb(0, 0, 126)", "platform", 0, false),
      new Platform(900, -550, 200, 20, "rgb(0, 0, 126)", "platform", 0, false),

      //Jumping Platforms
      new Platform(300, 780, 80, 20, "rgb(255, 255, 4)", "platform", 8, false),
      new Platform(1900, -50, 80, 20, "rgb(255, 255, 4)", "platform", 8, false),

      //Slippy Platforms
      new Platform(1200, 0, 500, 20, "rgb(6, 255, 255)", "platform", 0, true, true, false),


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

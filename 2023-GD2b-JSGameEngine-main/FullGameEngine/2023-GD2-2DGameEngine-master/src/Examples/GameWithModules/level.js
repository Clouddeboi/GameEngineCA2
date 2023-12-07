import Enemy from "./enemy.js";
import Collectible from "./collectible.js";

class Level {
  constructor(canvas, levelNumber, enemySpeed, collectibleInterval) {
    this.canvas = canvas;
    this.levelNumber = levelNumber;
    this.enemySpeed = enemySpeed;
    this.collectibleInterval = collectibleInterval;
  }

  loadLevel() {
    // Initialize enemies
    const enemy = new Enemy(this.canvas.width, this.canvas.height, 50, 50, "red", this.enemySpeed);

    // Initialize collectibles
    const collectibles = [];
    setInterval(() => {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const collectible = new Collectible(x, y, 20, "yellow");
      collectibles.push(collectible);
    }, this.collectibleInterval);

    return { enemy, collectibles };
  }
}

export default Level;

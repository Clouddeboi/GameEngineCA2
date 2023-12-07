class Enemy {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(player, deltaTime, isValidEnemyMove) {
    // Calculate the direction vector from enemy to player
    const dx = player.x - this.x;
    const dy = player.y - this.y;

    // Normalize the direction vector
    const distance = Math.sqrt(dx * dx + dy * dy);
    const directionX = dx / distance;
    const directionY = dy / distance;

    // Move the enemy towards the player
    const newX = this.x + directionX * this.speed * deltaTime;
    const newY = this.y + directionY * this.speed * deltaTime;
    const tempEnemy = new Enemy(newX, newY, this.width, this.height, this.color, this.speed);
    if (isValidEnemyMove(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
}

export default Enemy;

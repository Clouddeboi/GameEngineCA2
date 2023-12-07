class Player {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed; // Set player speed
    this.moveLeftPressed = false;
    this.moveRightPressed = false;
    this.moveUpPressed = false;
    this.moveDownPressed = false;
  }

  // Inside the Player class
draw(ctx, animation) {
  const currentFrame = animation.getCurrentFrame();
  ctx.drawImage(currentFrame, this.x, this.y, this.width, this.height);
}
collidesWithObstacle(obstacle) {
  return (
    this.x < obstacle.x + obstacle.width &&
    this.x + this.width > obstacle.x &&
    this.y < obstacle.y + obstacle.height &&
    this.y + this.height > obstacle.y
  );
}

  update(deltaTime) {
    // Calculate the distance the player should move in this frame
    const distance = this.speed * deltaTime;

    // Move the player based on the current key inputs
    if (this.moveLeftPressed && this.x > 0) {
      this.x -= distance;
    }
    if (this.moveRightPressed && this.x + this.width < canvas.width) {
      this.x += distance;
    }
    if (this.moveUpPressed && this.y > 0) {
      this.y -= distance;
    }
    if (this.moveDownPressed && this.y + this.height < canvas.height) {
      this.y += distance;
    }
  }

  moveLeft() {
    this.moveLeftPressed = true;
  }

  moveRight() {
    this.moveRightPressed = true;
  }

  moveUp() {
    this.moveUpPressed = true;
  }

  moveDown() {
    this.moveDownPressed = true;
  }

  stopMoveLeft() {
    this.moveLeftPressed = false;
  }

  stopMoveRight() {
    this.moveRightPressed = false;
  }

  stopMoveUp() {
    this.moveUpPressed = false;
  }

  stopMoveDown() {
    this.moveDownPressed = false;
  }
}

export default Player;

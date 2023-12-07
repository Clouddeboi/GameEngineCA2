class UI {
  constructor(canvas) {
    this.canvas = canvas;
    this.score = 0;
    this.lives = 3;
  }

  updateScore(amount) {
    this.score += amount;
  }

  drawScore(ctx, x, y) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, y);
  }

  drawLives(ctx, x, y) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Lives: ${this.lives}`, this.canvas.width / 2, y + 30);
  }

  decrementLives() {
    this.lives -= 1;
  }

  drawGameOver(ctx) {
    ctx.fillStyle = "red";
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2 - 50);

    // Add a restart button
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = this.canvas.width / 2 - buttonWidth / 2;
    const buttonY = this.canvas.height / 2 + 50;
    ctx.fillStyle = "red";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    ctx.fillStyle = "white";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Restart", this.canvas.width / 2, this.canvas.height / 2 + 80);

    // Add a click event listener to the canvas element
    this.canvas.addEventListener("click", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
        location.reload();
      }
    });
  }
}

export default UI;

class Particle {
    constructor(x, y, size, color, velocity) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.velocity = velocity;
    }
  
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  export default Particle;
  
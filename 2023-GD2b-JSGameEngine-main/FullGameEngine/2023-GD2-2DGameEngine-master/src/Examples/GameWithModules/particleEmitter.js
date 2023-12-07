import Particle from "./particle.js";

class ParticleEmitter {
  constructor() {
    this.particles = [];
  }

  emit(x, y, size, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      this.particles.push(new Particle(x, y, size, color, velocity));
    }
  }

  updateAndDraw(ctx) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();
      particle.draw(ctx);

      if (particle.size > 0.1) {
        particle.size -= 0.1;
      } else {
        this.particles.splice(i, 1);
      }
    }
  }
}

export default ParticleEmitter;

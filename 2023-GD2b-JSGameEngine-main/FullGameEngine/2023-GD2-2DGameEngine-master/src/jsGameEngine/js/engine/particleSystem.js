// The required modules and classes are imported at the top of the script.
import GameObject from './gameobject.js';
import Particle from './particle.js';
import Physics from '../engine/physics.js';

// The ParticleSystem class extends GameObject and is responsible for creating and managing a system of particles.
class ParticleSystem extends GameObject {
  // The constructor method initializes a new instance of the ParticleSystem class.
  constructor(x, y, color, count, lifeDuration, emitDuration) {
    // Call the constructor of the parent class (GameObject) and pass the position of the particle system.
    super(x, y);
    // Initialize instance properties.
    this.color = color; // Color of the particles.
    this.count = count; // Total number of particles to emit.
    this.lifeDuration = lifeDuration; // The life duration of each particle.
    this.emitDuration = emitDuration; // Duration over which particles should be emitted.
    this.particlesEmitted = 0; // Keep track of how many particles have been emitted.
  }

  // The update method is called once per game frame and is responsible for updating the state of the particle system.
  update(deltaTime) {
    // If there's still time left to emit particles...
    if (this.emitDuration > 0) {
      // Emit particles.
      this.emitParticles(deltaTime);
      // Decrease the emit duration by the amount of time that has passed since the last frame.
      this.emitDuration -= deltaTime;
    } else if (this.emitDuration <= 0) {
      // If the emit duration has run out, remove the particle system from the game.
      this.game.removeGameObject(this);
    }
    // Call the update method of the parent class (GameObject), which will update all of the system's components.
    super.update(deltaTime);
  }

  // The emitParticles method is responsible for creating and emitting particles.
  emitParticles(deltaTime) {
    // Calculate how many particles to emit in this frame.
    const particlesToEmit = Math.ceil((this.count / this.emitDuration) * deltaTime);
    // Emit the calculated number of particles.
    for (let i = 0; i < particlesToEmit && this.particlesEmitted < this.count; i++) {
      // Create a new particle with a random life duration, size, and initial velocity.
      const lifeDuration = this.lifeDuration + Math.random() - 0.5;
      const particle = new Particle(this.x, this.y, Math.random() * 5, Math.random() * 5, this.color, lifeDuration);
      particle.addComponent(new Physics({ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 }, { x: 0, y: 0 }));
      // Add the particle to the game.
      this.game.addGameObject(particle);
      // Increase the count of particles emitted.
      this.particlesEmitted++;
    }
  }
}

// The ParticleSystem class is then exported as the default export of this module.
export default ParticleSystem;

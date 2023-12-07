// The required modules and classes are imported at the top of the script.
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

// The Particle class extends GameObject and represents a particle in the game.
class Particle extends GameObject {
  // The constructor method initializes a new instance of the Particle class.
  constructor(x, y, width, height, color, duration) {
    // Call the constructor of the parent class (GameObject) and pass the position of the particle.
    super(x, y);
    // The duration that this particle should exist for.
    this.duration = duration;
    // Add a Renderer component to this particle. The Renderer is responsible for drawing the particle.
    this.addComponent(new Renderer(color, width, height));
    // Add a Physics component to this particle. The Physics component is responsible for the physics of the particle.
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
  }

  // The update method is called once per game frame and is responsible for updating the state of the particle.
  update(deltaTime) {
    // Decrease the duration by the amount of time that has passed since the last frame.
    this.duration -= deltaTime;

    // If the duration has run out...
    if (this.duration <= 0) {
      // Remove this particle from the game.
      this.game.removeGameObject(this);
    }

    // Call the update method of the parent class (GameObject), which will update all of the particle's components.
    super.update(deltaTime);
  }
}

// The Particle class is then exported as the default export of this module.
export default Particle;

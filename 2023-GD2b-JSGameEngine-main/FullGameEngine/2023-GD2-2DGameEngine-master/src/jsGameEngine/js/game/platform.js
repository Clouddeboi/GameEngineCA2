// Import the necessary classes from the 'engine' directory
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

// Define a new class, Platform, which extends (inherits from) GameObject
class Platform extends GameObject 
{
  /* 
  this constructor is used to create a platform
  it takes 5 arguments: x and y coordinates, width and height of the platform, and the color of the platform
  */
  constructor(x, y, width, height, color = 'white', tag = "platform", BounceAmount = 0)
  {
    super(x, y);
    
    this.addComponent(new Renderer(color, width, height));
    
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
    this.tag = tag; 
    
    this.BounceAmount = BounceAmount;
  }
}
// Export the Platform class as the default export of this module
export default Platform;

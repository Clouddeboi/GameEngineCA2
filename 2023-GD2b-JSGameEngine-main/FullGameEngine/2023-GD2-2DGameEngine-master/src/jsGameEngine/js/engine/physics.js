// Import the required modules and classes.
import Platform from '../game/platform.js';
import Component from './component.js';
import Renderer from './renderer.js';
import { AudioFiles } from '../engine/resources.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 10 }) {
    super(); // Call the parent constructor.
    this.velocity = velocity; // Initialize the velocity.
    this.acceleration = acceleration; // Initialize the acceleration.
    this.gravity = gravity; // Initialize the gravity.
    this.JumpPadSFX = AudioFiles.jumpPad;//adds the jump pad sound effect
    this.SlipperySFX = AudioFiles.Slippery;// adds the slippery surface sound effect
    this.FinishGameSFX = AudioFiles.FinishGame;// adds the finish game sound effect
  }

  // The update method handles how the component's state changes over time.
  update(deltaTime) {
    // Update velocity based on acceleration and gravity.
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime;
  
    const platforms = this.gameObject.game.gameObjects.filter((obj) => obj instanceof Platform);

    this.FinishGame = false;//set finish game variable to false
    
    /*
      Co-pilot helped me with the collision detection
      and i coded the collision detection for specific platforms
      (Bouncy, Slippery, Finish Game)
      i added all the sfx aswell
    */
    //set grounded variable to false
    this.Grounded = false;
    for(let i=0; i<Math.abs(this.velocity.y); i++)
    {
      this.gameObject.y += Math.sign(this.velocity.y);
      for(const obj of platforms)
      {
        if(obj.getComponent(Physics).isColliding(this))
        {
          if(this.velocity.y<0)
          {
            this.gameObject.y += 1;
            this.velocity.y = 0;
            this.velocity.y =+ 1;
          }
          else if(this.velocity.y>=0)
          {
            this.gameObject.y -= 1;
            this.Grounded = true;
            this.velocity.y = 0;

            if(obj.EndPlatform)//if the platform is the finish game platform
            {
              console.log("You Win");//logs you win to the console
              this.FinishGame = true;//sets the finish game variable to true
            }
            // Add bounce effect
            if(obj.BounceAmount > 0)//if the platform has a bounce amount over 0
            {
              this.velocity.y = -obj.BounceAmount;
              //console.log("Bounce");
            }

            if(obj.Slippery)//if the platform is slippery
            {
              if(obj.fallLeft)//if the platform makes the player fall left
              {
                this.velocity.x += 10;//add 10 to the x velocity
              }
              else if(obj.fallRight)//if the platform makes the player fall right
              {
                this.velocity.x -= 10;//add -10 to the x velocity
              }
            }
          }
          if(obj.BounceAmount>0)
          {
            this.JumpPadSFX.play();//plays the jump pad sound effect
          }
          if(obj.Slippery)
          {
            this.SlipperySFX.play();//plays the slippery surface sound effect
          }
          if(obj.EndPlatform)
          {
            this.FinishGameSFX.play();//plays the finish game sound effect
          }
        }
      }
    }
  
    for(let i=0; i<Math.abs(this.velocity.x); i++)//for loop to check if the player is colliding with the platform
    {
      this.gameObject.x+=Math.sign(this.velocity.x);//if the number is a minus return minus same for plus and 0
      for(const obj of platforms)
      {
        if(obj.getComponent(Physics).isColliding(this))//if the object is colliding with the platform
        {
            this.gameObject.x-=Math.sign(this.velocity.x);
            this.velocity.x = 0;
        }
      }
    }
  }

  // The isColliding method checks if this game object is colliding with another game object.
  isColliding(otherPhysics) {
    // Get the bounding boxes of both game objects.
    const [left, right, top, bottom] = this.getBoundingBox();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();

    // Check if the bounding boxes overlap. If they do, return true. If not, return false.
    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  // The getBoundingBox method returns the bounding box of the game object in terms of its left, right, top, and bottom edges.
  getBoundingBox() {
    // Get the Renderer component of the game object to get its width and height.
    const renderer = this.gameObject.getComponent(Renderer);
    // Calculate the left, right, top, and bottom edges of the bounding box.
    const left = this.gameObject.x;
    const right = this.gameObject.x + renderer.width;
    const top = this.gameObject.y;
    const bottom = this.gameObject.y + renderer.height;

    // Return the bounding box.
    return [left, right, top, bottom];
  }
}

// The Physics class is then exported as the default export of this module.
export default Physics;

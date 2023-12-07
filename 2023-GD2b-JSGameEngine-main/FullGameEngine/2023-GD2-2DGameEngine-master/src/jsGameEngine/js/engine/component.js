// This class represents a Component which is usually a reusable and attachable unit of game behavior.
class Component {
    // The constructor initializes a new instance of the Component class. 
    constructor() {
      // The gameObject property references the object that this component is attached to.
      // Initially, it is set to null.
      this.gameObject = null;
    }
  
    // The update method is typically called once per game update cycle (or frame). 
    // Here, it's empty and likely intended to be overridden by subclasses to include custom behavior.
    // deltaTime represents the amount of time passed since the last update. This is commonly used in movement calculations.
    update(deltaTime) {
    }
    
    // The draw method is typically called once per game update cycle (or frame) after update method, and is used for drawing the component's gameObject on the screen.
    // ctx is a reference to the drawing context of the canvas. It's used to actually draw things.
    // Like the update method, this is also empty and likely intended to be overridden by subclasses to include custom behavior.
    draw(ctx) {
    }
  }
  
  // The Component class is exported as the default export of this module, allowing it to be imported in other modules.
  export default Component;
  
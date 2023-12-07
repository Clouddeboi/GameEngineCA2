// This class represents a GameObject which is an entity in your game.
class GameObject {
    // The constructor initializes a new instance of the GameObject class.
    // The x and y parameters represent the position of the GameObject. 
    // They default to 0 if not provided when the object is created.
    constructor(x = 0, y = 0) {
      // The x-coordinate of the GameObject's position.
      this.x = x;
      // The y-coordinate of the GameObject's position.
      this.y = y;
      // An array to hold all the components that are attached to this GameObject.
      this.components = [];
    }
  
    // The addComponent method is used to attach a new component to this GameObject.
    addComponent(component) {
      // Add the component to the list of this GameObject's components.
      this.components.push(component);
      // Set the gameObject property of the component to this GameObject.
      // This way, the component has a reference back to the GameObject it is attached to.
      component.gameObject = this;
    }
  
    // The update method is called once per game frame, and calls the update method on all of this GameObject's components.
    // deltaTime is the amount of time passed since the last frame, and is passed down to all components.
    update(deltaTime) {
      for (const component of this.components) {
        component.update(deltaTime);
      }
    }
  
    // The draw method is called once per game frame, after the update method, and calls the draw method on all of this GameObject's components.
    // ctx is the canvas 2D context that the components should draw themselves onto.
    draw(ctx) {
      for (const component of this.components) {
        component.draw(ctx);
      }
    }
  
    // The getComponent method is used to get the first component of this GameObject that is an instance of the given class.
    // componentClass is the class of the component to get.
    getComponent(componentClass) {
      // Find the first component that is an instance of componentClass.
      return this.components.find((component) => component instanceof componentClass);
    }
  }
  
  // The GameObject class is exported as the default export of this module.
  export default GameObject;
  
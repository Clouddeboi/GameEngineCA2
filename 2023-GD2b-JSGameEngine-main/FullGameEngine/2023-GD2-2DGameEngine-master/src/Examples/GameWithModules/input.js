export default class InputManager {
    constructor() {
      this.keyStates = {};
      this.keyMap = {};
  
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
  
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);
    }
  
    handleKeyDown(event) {
      this.keyStates[event.key] = true;
    }
  
    handleKeyUp(event) {
      this.keyStates[event.key] = false;
    }
  
    isKeyPressed(action) {
      return this.keyStates[action];
    }
  }
  
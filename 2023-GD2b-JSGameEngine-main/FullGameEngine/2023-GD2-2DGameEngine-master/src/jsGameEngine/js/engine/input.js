// This class depends on the Component, which is a separate module and needs to be imported.
import Component from './component.js';

// The Input class is responsible for handling keyboard and gamepad input.
class Input extends Component {
  // The constructor initializes a new instance of the Input class.
  constructor() {
    // Call the constructor of the parent class (Component).
    super();
    // An object to store the state of each key. The keys are the keyboard key codes, and the values are boolean indicating whether the key is down.
    this.keys = {};
    // The index of the gamepad that this input component is listening to.
    this.gamepadIndex = null;

    // Add event listeners for the keydown and keyup events.
    // When a keydown event is fired, the corresponding key in the keys object is set to true.
    // When a keyup event is fired, the corresponding key in the keys object is set to false.
    document.addEventListener('keydown', (event) => (this.keys[event.code] = true));
    document.addEventListener('keyup', (event) => (this.keys[event.code] = false));

    // Add event listeners for the gamepadconnected and gamepaddisconnected events.
    // When a gamepadconnected event is fired, the gamepadIndex property is set to the index of the connected gamepad.
    // When a gamepaddisconnected event is fired, the gamepadIndex property is set to null.
    window.addEventListener('gamepadconnected', (event) => {
      console.log('Gamepad connected:', event.gamepad);
      this.gamepadIndex = event.gamepad.index;
    });
    window.addEventListener('gamepaddisconnected', (event) => {
      console.log('Gamepad disconnected:', event.gamepad);
      this.gamepadIndex = null;
    });
  }

  // This method checks if a particular key is down.
  isKeyDown(key) {
    // If the key is in the keys object and its value is true, return true. Otherwise, return false.
    return this.keys[key] || false;
  }

  // This method returns the current state of the gamepad this input component is listening to, or null if there is no such gamepad.
  getGamepad() {
    // If a gamepad index has been set...
    if (this.gamepadIndex !== null) {
      // Get the list of all gamepads...
      const gamepads = navigator.getGamepads();
      // And return the gamepad at the stored index.
      return gamepads[this.gamepadIndex];
    }
    // If no gamepad index has been set, return null.
    return null;
  }

  // This method checks if a particular button on the gamepad is down.
  isGamepadButtonDown(buttonIndex) {
    // Get the current state of the gamepad.
    const gamepad = this.getGamepad();
    // If a gamepad is available and the button at the given index is pressed, return true. Otherwise, return false.
    if (gamepad && gamepad.buttons[buttonIndex]) {
      return gamepad.buttons[buttonIndex].pressed;
    }
    return false;
  }
}

// The Input class is then exported as the default export of this module.
export default Input;

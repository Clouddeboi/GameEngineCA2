// This class relies on the Renderer, which is a separate module and needs to be imported.
import Renderer from "./renderer.js";

// The Camera class is responsible for tracking a target object and positioning the camera view based on the target's position.
class Camera {
  // The constructor initializes a new instance of the Camera class. It accepts a target object to follow, as well as the dimensions of the camera (width and height).
  constructor(target, width, height) {
    // The target object that the camera will follow.
    this.target = target;
    // The width of the camera's field of view.
    this.width = width;
    // The height of the camera's field of view.
    this.height = height;
    // The x-coordinate of the camera's position, initialized to 0.
    this.x = 0;
    // The y-coordinate of the camera's position, initialized to 0.
    this.y = 0;
  }

  // The update method adjusts the camera's position to center on the target object. It's called typically in the game's update loop.
  update() {
    // The x-coordinate of the camera is set to the target's x-coordinate, plus half of the target's width (which centers the camera on the target), and then minus half of the camera's width (which adjusts for the camera's size).
    this.x = this.target.x + this.target.getComponent(Renderer).width / 2 - this.width / 2;
    // The y-coordinate of the camera is set in the same way, but with the target's and camera's heights instead of their widths.
    this.y = this.target.y + this.target.getComponent(Renderer).height / 2 - this.height / 2;
  }
}

// The Camera class is then exported as the default export of this module.
export default Camera;

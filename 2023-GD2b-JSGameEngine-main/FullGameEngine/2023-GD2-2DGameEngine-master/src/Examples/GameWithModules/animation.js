export default class Animation {
    constructor(frames, frameInterval) {
      this.frames = frames;
      this.frameInterval = frameInterval;
      this.currentFrame = 0;
      this.frameTimer = 0;
    }
  
    update(deltaTime) {
      this.frameTimer += deltaTime;
      if (this.frameTimer > this.frameInterval) {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        this.frameTimer = 0;
      }
    }
  
    getCurrentFrame() {
      return this.frames[this.currentFrame];
    }
  }
  
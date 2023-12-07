import Renderer from "./renderer.js";

class Camera{
    constructor(target, width, height){
        this.target = target; 
        this.width = width; 
        this.height = height; 
        this.x = 0;
        this.y = 0;
    }
    update(){
        this.x = this.target.x+this.target.getComponent(Renderer).width/2 - this.width/2;
        this.y = this.target.y+this.target.getComponent(Renderer).height/2 - this.height/2;
    }
}
export default Camera; 
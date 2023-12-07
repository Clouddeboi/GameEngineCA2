import Component from "./component.js"

class Renderer extends Component{
    constructor(color = "white", width = 50, height = 50, image = null){
        super();
        this.color = color; 
        this.width = width; 
        this.height = height; 
        this.image = image; 
    }
    draw(ctx){
        if(this.image && this.image.complete){
            const x = this.gameObject.x; 
            const y = this.gameObject.y; 
            const w = this.width; 
            const h = this.height; 
           //check on direction
            const flipX = this.gameObject.direction === -1;
            if(!flipX){
                ctx.drawImage(this.image, x,y,w,h);
            }else{
                ctx.save();
                ctx.translate(x+w,y);
                ctx.scale(-1,1);
                ctx.drawImage(this.image,0,0,w,h);
                ctx.restore();
            }
        }else{
            ctx.fillStyle = this.color;
            ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
        }
    }
}
export default Renderer;
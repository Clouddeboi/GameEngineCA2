import Component from "./component.js";

class UI extends Component {
    constructor(text, x, y, font = "20px Arial", 
    color = "white", textAlign = "left", textBaseline = "top" ){
        super();

        this.text = text; 
        this.x = x; 
        this.y = y; 
        this.font = font; 
        this.color = color; 
        this.textAlign = textAlign; 
        this.textBaseline = textBaseline; 
    }

    draw(ctx){
        const camera = this.gameObject.game.camera;

        ctx.font = this.font; 
        ctx.fillStyle = this.color;
        ctx.textAlign = this.textAlign; 
        ctx.textBaseline = this.textBaseline


        //check this out in game
        ctx.fillText(this.text, this.x + camera.x, this.y + camera.y);
    }

    setText(newText){
        this.text = newText; 
    }
}
export default UI; 
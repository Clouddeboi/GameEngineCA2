import GameObject from "../Engine/gameobject.js";
import UI from "../Engine/ui.js";
import Player from "./player.js";

class PlayerUI extends GameObject{
    constructor(x,y){
        super(x,y);
        this.uiComponent = new UI ("Lives 3 Score 0", x, y);
        this.addComponent(this.uiComponent);
    }

    update(deltaTime){
        const player = 
        this.game.gameObjects.find((obj)=> obj instanceof Player);

        this.uiComponent.setText(`Lives: ${player.lives} 
        Score: ${player.score}`);       
        super.update(deltaTime);
    }

}
export default PlayerUI;
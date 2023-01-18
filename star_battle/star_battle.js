import Canvas from "./entities/canvas.js";

export default class StarBattle{
    constructor(){
        this.stage = new Canvas({
            id: 'star_battle', 
            type: '2d', 
            width: 800, 
            height: 800
        })
    }
}
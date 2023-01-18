import Canvas from "./entities/canvas.js";

export default function StarBattleEngine(){
    const {ctx, width, height} = new Canvas({
        id: 'star_battle', 
        type: '2d', 
        width: 800, 
        height: 800
    })
    
    
}
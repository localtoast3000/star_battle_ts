export default class Canvas{
    constructor({id, type, width, height}){
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', id)
        this.ctx = canvas.getContext(type)
        this.cWidth = canvas.width = width
        this.cheight = canvas.height = height
    }

    render(content){
        this.ctx.draw(content)
    }
}
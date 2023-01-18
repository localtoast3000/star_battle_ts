export default class Canvas{
    constructor({id, type, width, height}){
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', id)
        this.ctx = canvas.getContext(type)
        this.width = canvas.width = width
        this.height = canvas.height = height
    }
}
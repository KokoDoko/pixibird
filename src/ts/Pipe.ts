import * as PIXI from "pixi.js"

export class Pipe extends PIXI.Sprite {

    private top:boolean
    
    constructor(texture: PIXI.Texture, top:boolean) {
        super(texture)
        this.top = top
        let randomY = Math.random() * 250 - 200 // -200 to 50
        this.x = 900
        if (top) {
            this.y = -100 + randomY
        } else {
            this.y = 400 + randomY
        }
    }

    public update(delta:number) {
        this.x -= 5 * delta
        if (this.x < -100) this.resetPosition()
    }

    private resetPosition() {
        let randomY = Math.random() * 250 - 200 // -200 to 50
        this.x = 900
        if (this.top) {
            this.y = -100 + randomY
        } else {
            this.y = 400 + randomY
        }
    } 
}

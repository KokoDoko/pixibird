import * as PIXI from "pixi.js"

export class Flappy extends PIXI.Sprite {

    private fallSpeed = 0.1
    private keyPressed = false

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.scale.set(0.2, 0.2)
        this.restartFlappy()

        window.addEventListener("keydown", (e) => this.checkSpace(e))
        window.addEventListener("keyup", (e) => this.releaseSpace(e))
    }

    public restartFlappy(){
        this.fallSpeed = 0.1  
        this.x = 200
        this.y = 20
    }

    public update() {      
        this.fallSpeed += 0.15
        this.y += this.fallSpeed
        this.rotation = this.fallSpeed / 50
    }

    private checkSpace(e:KeyboardEvent) {
        if(e.key === " " && !this.keyPressed) {
            this.fallSpeed = -7
            this.keyPressed = true
        }
    }

    private releaseSpace(e: KeyboardEvent) {
        if (e.key === " ") {
            this.keyPressed = false
        }
    }


}

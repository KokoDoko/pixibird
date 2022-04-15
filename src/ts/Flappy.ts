import * as PIXI from "pixi.js"

export class Flappy extends PIXI.Sprite {

    private fallSpeed = 0.1
    private keyPressed = false

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.scale.set(0.2, 0.2)
        this.x = Math.random() * 400

        window.addEventListener("keydown", (e) => this.checkSpace(e))
        window.addEventListener("keyup", (e) => this.releaseSpace(e))
    }

    public update() {
        this.fallSpeed += 0.15
        this.y += this.fallSpeed
        this.rotation = this.fallSpeed / 50
    }

    private checkSpace(e:KeyboardEvent) {
        if(e.key === " " && !this.keyPressed) {
            this.fallSpeed = -8
            this.keyPressed = true
        }
    }

    private releaseSpace(e: KeyboardEvent) {
        if (e.key === " ") {
            this.keyPressed = false
        }
    }
}

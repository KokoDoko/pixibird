import * as PIXI from "pixi.js"
import { Game } from "./Game"

export class Pipes {
    
    private game : Game
    private pipeUp : PIXI.Sprite
    private pipeDown : PIXI.Sprite
    private scored = false
    
    constructor(game: Game) {
        this.game = game

        this.pipeUp = new PIXI.Sprite(this.game.pixi.loader.resources["pipeup"].texture!)
        this.game.pixi.stage.addChild(this.pipeUp)

        this.pipeDown = new PIXI.Sprite(this.game.pixi.loader.resources["pipedown"].texture!)
        this.game.pixi.stage.addChild(this.pipeDown)

        this.resetPosition()
    }

    public update() {
        this.pipeUp.x -= 5
        this.pipeDown.x -= 5

        if (this.pipeUp.x < 200 && !this.scored) {
            this.scored = true
            this.game.addScore(1)
        }
        if (this.pipeUp.x < -100) this.resetPosition()
    }

    // check if bird hits the top pipe or the bottom pipe
    public hitsFlappy(bird:PIXI.Sprite) {
        return (this.checkCollision(bird, this.pipeUp) || (this.checkCollision(bird, this.pipeDown)))
    }

    private checkCollision(objectOne: PIXI.Sprite, objectTwo: PIXI.Sprite) {
        const bounds1 = objectOne.getBounds()
        const bounds2 = objectTwo.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    public resetPosition() {
        let randomY = Math.random() * 250 - 200
        this.pipeUp.x = 900
        this.pipeDown.x = 900
        this.pipeUp.y = -150 + randomY
        this.pipeDown.y = 450 + randomY
        this.scored = false
    }
}

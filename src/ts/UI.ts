import * as PIXI from "pixi.js"
import { Game } from "./Game"

export class UI {

    private scoreField: PIXI.Text
    private hiScoreField: PIXI.Text
    private messageField: PIXI.Text
    private game:Game
    private score:number = 0
    private hiscore:number = 0
    private gameOverListener: EventListener

    constructor(game:Game) { 
        this.game = game

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 26,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text('Score : 0', style)
        this.scoreField.x = 20
        this.scoreField.y = 20

        this.hiScoreField = new PIXI.Text(`High Score : ${this.hiscore}`, style)
        this.hiScoreField.x = 680
        this.hiScoreField.y = 20

        const gameOverStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 55,
            align:"center", 
            fontWeight: 'bold',
            fill: ['#006677'],
            wordWrap: true,
            wordWrapWidth: 400
        })

        this.messageField = new PIXI.Text('', gameOverStyle)
        this.messageField.x = 260
        this.messageField.y = 140
        
        this.game.pixi.stage.addChild(this.scoreField)
        this.game.pixi.stage.addChild(this.hiScoreField)
        this.game.pixi.stage.addChild(this.messageField)

        this.gameOverListener = (e:Event) => this.restartGame(e)
    }

    public addScore(s:number) {
        this.score += s
        this.scoreField.text = `Score : ${this.score}`
    }
    
    public showGameOver(){
        if (this.score > this.hiscore) this.hiscore = this.score
        this.hiScoreField.text = `High Score : ${this.hiscore}`
        this.messageField.text =  "GAME OVER press space to restart"
        window.addEventListener("keydown", this.gameOverListener)
    }

    private restartGame(e:Event){
        window.removeEventListener("keydown", this.gameOverListener)
        this.messageField.text = ""
        this.score = 0
        this.scoreField.text = `Score : 0`
        this.game.restart()
    }
}

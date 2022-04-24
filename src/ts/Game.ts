import "../css/styles.css"
import * as PIXI from "pixi.js"
import { Pipes } from "./Pipes"
import { Background } from "./Background"
import { UI } from "./UI"
import { Flappy } from "./Flappy"
// images
import birdImage from "../images/birdy.png"
import bgImage from "../images/background.png"
import pipeUpImage from "../images/pipeup.png"
import pipeDownImage from "../images/pipedown.png"

export class Game {

    public pixi: PIXI.Application
    public go : boolean = false
    private pipes: Pipes
    private flappy: Flappy
    private bg: Background
    private ui: UI

    constructor() {
        const container = document.getElementById("container")!
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        container.appendChild(this.pixi.view)

        // image preloader
        this.pixi.loader
            .add("bird", birdImage)
            .add("background", bgImage)
            .add("pipeup", pipeUpImage)
            .add("pipedown", pipeDownImage)

        //this.pixi.loader.onProgress.add((p: PIXI.Loader) => this.showProgress(p))
        //this.pixi.loader.onComplete.add(() => this.doneLoading())
        this.pixi.loader.load(() => this.doneLoading())
    }

    private showProgress(p: PIXI.Loader) {
        console.log(`Loading ${p.progress}%`)
    }

    private doneLoading() {
        this.bg = new Background(this.pixi.loader.resources["background"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.pixi.stage.addChild(this.bg)

        this.flappy = new Flappy(this.pixi.loader.resources["bird"].texture!)
        this.pixi.stage.addChild(this.flappy)

        this.pipes = new Pipes(this)
        this.ui = new UI(this)

        this.pixi.ticker.add((delta) => this.update(delta))
    }

    public addScore(n:number){
        this.ui.addScore(n)
    }


    private update(delta:number) {
        this.bg.update()
        this.flappy.update()
        this.pipes.update()
        this.checkCollisions()
    }


    private checkCollisions() {
        if (this.flappy.y > this.pixi.screen.height + 80 || this.pipes.hitsFlappy(this.flappy)) {
            this.showGameOver()
        }
    }

    private showGameOver(){
        this.pixi.stop()
        this.ui.showGameOver()
    }

    public restart(){
        this.flappy.restartFlappy()
        this.pipes.resetPosition()
        this.pixi.start()
    }

}

new Game()
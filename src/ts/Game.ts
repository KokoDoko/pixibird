import "../css/styles.css"
import * as PIXI from "pixi.js"
import { Pipe } from "./Pipe"
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
    private pipes: Pipe[] = []
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

    showProgress(p: PIXI.Loader) {
        console.log(`Loading ${p.progress}%`)
    }

    doneLoading() {
        console.log("preloader finished")

        this.bg = new Background(this.pixi.loader.resources["background"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.pixi.stage.addChild(this.bg)

        this.flappy = new Flappy(this.pixi.loader.resources["bird"].texture!)
        this.pixi.stage.addChild(this.flappy)

        this.addTwoPipes()
        setTimeout(()=>this.addTwoPipes(), 1600 )

        // create a UI
        this.ui = new UI(this)

        // start update loop
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    // spawn two pipes
    private addTwoPipes() {
        let p1 = new Pipe(this.pixi.loader.resources["pipeup"].texture!, true)
        this.pipes.push(p1)
        this.pixi.stage.addChild(p1)

        let p2 = new Pipe(this.pixi.loader.resources["pipedown"].texture!, false)
        this.pipes.push(p2)
        this.pixi.stage.addChild(p2)
    }

    private update(delta:number) {
        this.bg.update()
        this.flappy.update()

        for (let pipe of this.pipes) {
            pipe.update(delta)
        }

        this.checkCollisions()
    }


    private checkCollisions() {
        if (this.flappy.y > 400) {
            this.ui.gameOver()
        }

        for (let pipe of this.pipes) {
            if (this.collision(pipe, this.flappy)) {
                this.ui.gameOver()
            }
        }
    }




    private collision(objectOne: PIXI.Sprite, objectTwo: PIXI.Sprite) {
        const bounds1 = objectOne.getBounds()
        const bounds2 = objectTwo.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

}

new Game()
class Robot {
    #rotation
    #hasBeeper = false
    constructor(world, x, y, color) {
        this.world = world
        this.x = x
        this.y = y
        this.color = color
        this.#rotation = 60   
        this.scale = 1

        this.konvaGroup = new Konva.Group({
            x: this.x,
            y: this.y,
            rotation: this.#rotation
        })
        
        this.wedge = new Konva.Wedge({
            x: 0,
            y: 0,
            radius: 30,
            angle: 60,
            fill: this.color,
            stroke: 'black',
        });
        

        this.beeper = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 10,
            fill: "gray",
            visible: false
        })

        this.konvaGroup.add(this.wedge)
        this.konvaGroup.add(this.beeper)
        layer.add(this.konvaGroup)
    }

    redraw() {
        this.konvaGroup.x(this.x)
        this.konvaGroup.y(this.y)
        this.wedge.fill(this.color)
        this.wedge.scaleX(this.scale)
        this.wedge.scaleY(this.scale)
    }

    pickUpBeeper() {
        this.#hasBeeper = true
        this.beeper.visible(true)
    }

    move() {
        this.y -= 50

        return playTween({
            node: this.konvaGroup,
            duration: 0.5,
            y: this.y
        })

    }

    turnRight() {
        this.#rotation += 90

        return playTween({
            node: this.konvaGroup,
            duration: 0.5,
            rotation: this.#rotation
        })
    }


}

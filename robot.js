class Robot {
    #x
    #y
    #world
    #rotation
    #hasBeeper
    #konvaGroup
    #wedge
    #beeper
        
    constructor(world, x, y, color) {
        this.#world = world
        this.#x = x
        this.#y = y
        this.#hasBeeper = false
        this.#rotation = 60   
        this.color = color
        this.scale = 1
        this.speed = 100

        this.#konvaGroup = new Konva.Group({
            x: this.#x,
            y: this.#y,
            rotation: this.#rotation
        })
        
        this.#wedge = new Konva.Wedge({
            x: 0,
            y: 0,
            radius: 30,
            angle: 60,
            fill: this.color,
            stroke: 'black',
        });
        

        this.#beeper = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 10,
            fill: "gray",
            visible: false
        })

        this.#konvaGroup.add(this.#wedge)
        this.#konvaGroup.add(this.#beeper)
        layer.add(this.#konvaGroup)
    }

    redraw() {
        this.#konvaGroup.x(this.#x)
        this.#konvaGroup.y(this.#y)
        this.#wedge.fill(this.color)
        this.#wedge.scaleX(this.scale)
        this.#wedge.scaleY(this.scale)
    }

    pickUpBeeper() {
        if (this.#hasBeeper) {
            throw new Error("\nRobot malfunction: Can only carry one beeper at a time!")
        }
        if (this.#world.hasBeeperAt(this.#x, this.#y)) {
            this.#world.removeBeeperAt(this.#x, this.#y)
            this.#hasBeeper = true
            this.#beeper.visible(true)
        }
        else
            throw new Error("\nRobot malfunction: There is no beeper here!")
    }

    dropBeeper() {
        if (!this.#hasBeeper) {
            throw new Error("\nRobot malfunction: Not carrying a beeper!")
        }
        this.#world.addBeeper(this.#x, this.#y)
        this.#hasBeeper = false
        this.#beeper.visible(false)
    }

    isOnBeeper() {
        return this.#world.hasBeeperAt(this.#x, this.#y)
    }

    move(numSteps) {
        if (typeof numSteps != "number")
            throw new Error("A robot's move method must be given 1 numerical parameter")

        if (this.getDirection() == "up")
            this.#y -= 50*numSteps
        if (this.getDirection() == "down")
            this.#y += 50*numSteps
        if (this.getDirection() == "left")
            this.#x -= 50*numSteps
        if (this.getDirection() == "right")
            this.#x += 50*numSteps

        return playTween({
            node: this.#konvaGroup,
            duration: 0.5*numSteps*(100/this.speed),
            x: this.#x,
            y: this.#y
        })

    }

    turnRight() {
        this.#rotation = this.#rotation + 90

        return playTween({
            node: this.#konvaGroup,
            duration: 0.5*(100/this.speed),
            rotation: this.#rotation
        })
    }

    turnLeft() {
        this.#rotation = this.#rotation - 90

        return playTween({
            node: this.#konvaGroup,
            duration: 0.5*(100/this.speed),
            rotation: this.#rotation
        })
    }

    getDirection() {
        if (this.#rotation % 360 == 60 || this.#rotation % 360 == -300) 
            return "up"
        if (this.#rotation % 360  == 150 || this.#rotation % 360 == -210) 
            return "right"
        if (this.#rotation % 360  == 240 || this.#rotation % 360 == -120) 
            return "down"
        if (this.#rotation % 360  == 330 || this.#rotation % 360 == -30) 
            return "left"
    }

}


const playTween = (config) => {
    return new Promise(function(resolve, reject) {
            
        var tween = new Konva.Tween({
            ...config,
            onFinish: resolve
        });
        tween.play()                

    })
}

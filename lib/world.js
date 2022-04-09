class World {
    #beepers
    constructor() {
        addGrid(Konva, layer)
        this.#beepers = []
    }

    addBeeper(x, y) {
        let beeper = new Konva.Circle({
            x: x,
            y: y,
            radius: 10,
            fill: "gray"
        })
        layer.add(beeper)
        this.#beepers.push({
            x: x, 
            y: y,
            konvaObject: beeper
        })
    }

    hasBeeperAt(x, y) {
        for (let i = 0; i < this.#beepers.length; i++) {
            if (this.#beepers[i].x == x && this.#beepers[i].y == y)
                return true
        }
        return false
    }

    removeBeeperAt(x, y) {
        for (let i = 0; i < this.#beepers.length; i++) {
            if (this.#beepers[i].x == x && this.#beepers[i].y == y) {
                this.#beepers[i].konvaObject.destroy()
                this.#beepers.splice(i, 1)
                return
            }
        }
    }

}
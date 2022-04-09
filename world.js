class World {
    constructor() {
        addGrid(Konva, layer)
        this.beepers = []
    }

    addBeeper(x, y) {
        let beeper = new Konva.Circle({
            x: x,
            y: y,
            radius: 10,
            fill: "gray"
        })
        layer.add(beeper)
        this.beepers.push({
            x: x, 
            y: y,
            konvaObject: beeper
        })

    }
}
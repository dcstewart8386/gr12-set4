// This file is used to add the grid to the canvas to facilitate development.
// Feel free to play around with this file to change the look of the grid. If
// needed, a fresh copy can be downloaded from GitHub.
function addGrid(Konva, layer) {

    // Draw vertical lines and labels
    for (i = 50; i <= layer.width(); i += 50) {
        let line = new Konva.Line({
            points: [i, 0, i, layer.height()],
            stroke: '#CCC',
            strokeWidth: 1,
        });
        layer.add(line)
        let text = new Konva.Text({
            x: i - 8,
            y: 0,
            text: i,
            fontSize: 10,
            fontFamily: 'Calibri',
            fill: '#999',
        });
        layer.add(text)
    }

    // Draw horizontal lines and labels
    for (i = 50; i <= layer.height(); i += 50) {
        let line = new Konva.Line({
            points: [0, i, layer.width(), i],
            stroke: '#CCC',
            strokeWidth: 1,
        });
        layer.add(line)
        let text = new Konva.Text({
            x: 0,
            y: i - 10,
            text: i,
            fontSize: 10,
            fontFamily: 'Calibri',
            fill: '#999',
        });
        layer.add(text)
    }
}

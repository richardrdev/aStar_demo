import ViewWindow from './ViewWindow';
import TilemapPixel from './TilemapPixelData';
import p5 from 'p5';

class View {
    window: ViewWindow;
    tilemap: TilemapPixel;

    constructor(sketch: p5) {
        this.window = new ViewWindow();
        const cvs = sketch.createCanvas(...this.window.getDimensions());
        cvs.parent('canvas-container');
        this.tilemap = new TilemapPixel(sketch.width, sketch.height);
        sketch.background('#ffffff');
        sketch.ellipseMode(sketch.CORNER);
    }

    // animateSearch(sketch:p5, searchDetails) {
    //     console.log("animating");
    //     const path = searchDetails.path;
    //     const start = searchDetails.start;
    //     const end = searchDetails.end;
    //     let current = this.tilemap.getTile(start[0], start[1]);
    //     current.considered = true;
    //     current.inPath = true;

    //     for (let i = 0; i < path.length; i++) {
    //         current = this.tilemap.getAdjacent(path[i], current);
    //         current.considered = true;
    //         current.inPath = true;
    //     }
    // }

    getMapDetails() {
        return this.tilemap.getMapDetails();
    }

    getTileFromMouse(mouseX: number, mouseY: number) {
        return this.tilemap.getTileFromPixelCoord(mouseX, mouseY);
    }

    draw(sketch: p5) {
        sketch.background('#ffffff');
        this.tilemap.draw(sketch);
    }

    // windowResized() {
    //     console.log("window has been resized");
    //     let [width, height] = getCanvasDimensions();
    //     resizeCanvas(width, height);
    //     tiles.build();
    //     tiles.checkerboard();
    // }
}

export default View;

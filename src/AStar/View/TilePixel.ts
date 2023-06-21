import Entity from '../Model/Entities/Entity';
import p5 from 'p5';
import Tile from '../Superclasses/Tile';
import { TileState } from '../Interfaces/TileUtilities';

class TilePixel extends Tile {
    tileX: number;
    tileY: number;
    entity: Entity | null;
    considered: boolean;
    inPath: boolean;
    coordX: number;
    coordY: number;
    width: number;
    height: number;

    constructor(tileX: number, tileY: number, width: number, height: number) {
        super(tileX, tileY);
        this.coordX = tileX * width;
        this.coordY = tileY * height;
        this.width = width;
        this.height = height;
    }

    getPixelCoord() {
        return [this.coordX, this.coordY];
    }

    notify(modelState: TileState) {
        this.updateState(modelState);
    }

    draw(sketch: p5) {
        this.drawOutline(sketch);
        if (this.considered) this.drawConsidered(sketch);
        // if (this.isClosed) this.drawClosed(sketch);
        if (this.inPath) this.drawInPath(sketch);
        if (this.entity) {
            switch (this.entity.getEntityType().toLowerCase()) {
                case 'wall':
                    this.drawFilled(sketch);
                    break;
                case 'startpoint':
                    this.drawEllipse(sketch, '#dc143c');
                    break;
                case 'endpoint':
                    this.drawEllipse(sketch, '#4169e1');
                    break;
                default:
                    this.drawFilled(sketch, '#ff7f50');
                    break;
            }
        }
    }

    drawClosed(sketch: p5) {
        //fscore ranges from ~550 to 0
        //we divide fscore by 2 in order to roughly get a 0-255 range
        //we max out at 255 just to be safe
        const fScoreToScale = Math.floor(this.fScore / 2);
        const MAXVAL = 255;
        const fillRed = Math.min(fScoreToScale, MAXVAL);
        // if (sketch.frameCount % 60 == 0) {
        //     console.log(fillRed);
        // }
        const [x, y] = this.getPixelCoord();
        sketch.fill(fillRed, 1, 100, 50);
        sketch.rect(x, y, this.width, this.height);
    }

    drawConsidered(sketch: p5) {
        const [x, y] = this.getPixelCoord();
        sketch.fill('#fad6b1');
        sketch.rect(x, y, this.width, this.height);
    }

    drawInPath(sketch: p5, fill = '#ff0000') {
        //TODO - draw a vertical or horizontal line, depending on the path
        const [leftEdge, topEdge] = this.getPixelCoord();
        const horizontalCenter = leftEdge + this.width / 2 - 1;
        const verticalCenter = topEdge + this.height / 2 - 1;
        const boxCoords = {
            leftEdge: leftEdge,
            topEdge: topEdge,
            horizontalCenter: horizontalCenter,
            verticalCenter: verticalCenter,
        };
        sketch.fill(fill);
        this.drawPathDirection(this.inPathEntrance, sketch, boxCoords);
        this.drawPathDirection(this.inPathExit, sketch, boxCoords);
    }

    //the "any" here is lazy, but it's not really worth making an interface for this one function
    //note to self - if I need to draw lines again, refactor this and make a boxCoords function and interface
    drawPathDirection(direction: string, sketch: p5, boxCoords: any) {
        const pathWidth = 3;
        switch (direction) {
            case 'north': {
                sketch.rect(
                    boxCoords.horizontalCenter,
                    boxCoords.topEdge,
                    pathWidth,
                    this.height / 2
                );
                break;
            }
            case 'east': {
                sketch.rect(
                    boxCoords.leftEdge + this.width,
                    boxCoords.verticalCenter,
                    -1 * (this.width / 2),
                    pathWidth
                );
                break;
            }
            case 'south': {
                sketch.rect(
                    boxCoords.horizontalCenter,
                    boxCoords.topEdge + this.height,
                    pathWidth,
                    -1 * (this.height / 2)
                );
                break;
            }
            case 'west': {
                sketch.rect(
                    boxCoords.leftEdge,
                    boxCoords.verticalCenter,
                    this.width / 2,
                    pathWidth
                );
                break;
            }
            default: {
                //uncomment for debugging
                // console.log('path direction empty');
                // console.log(this);
                break;
            }
        }
    }

    drawOutline(sketch: p5, fill = '#000000') {
        const [x, y] = this.getPixelCoord();
        const dx = x + this.width;
        const dy = y + this.height;
        sketch.fill(fill);
        sketch.line(x, y, dx, y);
        sketch.line(x, y, x, dy);
        sketch.line(dx, dy, dx, y);
        sketch.line(dx, dy, x, dy);
    }

    drawFilled(sketch: p5, fill = '#000000') {
        const [x, y] = this.getPixelCoord();
        sketch.fill(fill);
        sketch.rect(x, y, this.width, this.height);
    }

    drawEllipse(sketch: p5, fill = '#000000') {
        const [x, y] = this.getPixelCoord();
        sketch.fill(fill);
        sketch.ellipse(x, y, this.width, this.height);
    }

    updateState(modelState: TileState) {
        this.entity = modelState.entity;
        this.considered = modelState.considered;
        this.inPath = modelState.inPath;
        this.inPathEntrance = modelState.inPathEntrance;
        this.inPathExit = modelState.inPathExit;
        this.isClosed = modelState.isClosed;
        this.fScore = modelState.fScore;
    }
}

export default TilePixel;

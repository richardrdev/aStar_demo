import TilePixel from './TilePixel';
import p5 from 'p5';
import Tilemap from '../Superclasses/Tilemap';

class TilemapPixel extends Tilemap {
    mapWidth: number;
    mapHeight: number;
    tileWidth: number;
    tileHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    grid: TilePixel[][];

    constructor(canvasWidth: number, canvasHeight: number) {
        super();
        //width 32 x height 24
        this.mapWidth = 32;
        this.mapHeight = 24;
        [this.tileWidth, this.tileHeight] = this.calcTileDimensions(
            canvasWidth,
            canvasHeight
        );
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.grid = this.buildGrid();
    }

    getMapDetails() {
        return {
            dimensions: this.getTileDimensions(),
        };
    }

    draw(sketch: p5) {
        this.grid.forEach((column) => {
            column.forEach((tile) => {
                tile.draw(sketch);
            });
        });
    }

    buildGrid() {
        const grid = [...Array(this.mapWidth)].map((column, tileX) => {
            return [...Array(this.mapHeight)].map((cell, tileY) => {
                const newTile = new TilePixel(
                    tileX,
                    tileY,
                    this.tileWidth,
                    this.tileHeight
                );
                return newTile;
            });
        });

        return grid;
    }

    // updateMap(modelGrid:Tile[][]) {
    //     for (let x = 0; x < modelGrid.length; x++) {
    //         for (let y = 0; y < modelGrid[x].length; y++) {
    //             this.grid[x][y].updateState(modelGrid[x][y].getState());
    //         }
    //     }
    // }

    calcTileDimensions(canvasWidth: number, canvasHeight: number) {
        const w = canvasWidth / this.mapWidth;
        const h = canvasHeight / this.mapHeight;
        return [w, h];
    }

    getTileFromPixelCoord(pixelX: number, pixelY: number) {
        const tileCoords: [number, number] = [
            this.getTileXFromPixelCoord(pixelX),
            this.getTileYFromPixelCoord(pixelY),
        ];
        return tileCoords;
    }

    getTileXFromPixelCoord(pixelX: number) {
        return Math.floor(pixelX / this.tileWidth);
    }

    getTileYFromPixelCoord(pixelY: number) {
        return Math.floor(pixelY / this.tileHeight);
    }
}

export default TilemapPixel;

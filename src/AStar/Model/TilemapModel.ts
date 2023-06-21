import Tilemap from '../Superclasses/Tilemap';
import TilePixel from '../View/TilePixel';
import Entity from './Entities/Entity';
import TileModel from './TileModel';
import { TileStep, TileStepNullable } from '../Interfaces/TileUtilities';
import Tile from '../Superclasses/Tile';

class TilemapModel extends Tilemap {
    mapWidth: number;
    mapHeight: number;
    grid: TileModel[][];

    constructor(mapDetails: { dimensions: number[] }) {
        super();
        [this.mapWidth, this.mapHeight] = mapDetails.dimensions;
        this.grid = this.buildGrid();
    }

    setDimensions(dimensions: number[]) {
        [this.mapWidth, this.mapHeight] = dimensions;
    }

    getAdjacent(direction: string, currentTile: TileModel) {
        const [currX, currY] = currentTile.getTileCoord();
        switch (direction.toLowerCase()) {
            case 'north':
                return this.getTile(currX, currY - 1);
                break;
            case 'east':
                return this.getTile(currX + 1, currY);
                break;
            case 'south':
                return this.getTile(currX, currY + 1);
                break;
            case 'west':
                return this.getTile(currX - 1, currY);
                break;
        }
        return null;
    }

    getAdjacentTiles(currentTile: TileModel): TileStepNullable[] {
        const adjacentTiles: TileStepNullable[] = [];

        ['north', 'east', 'south', 'west'].forEach((dir) => {
            const adjacentTile = this.getAdjacent(dir, currentTile);
            adjacentTiles.push({
                direction: dir,
                tile: adjacentTile,
            });
        });

        return adjacentTiles;
    }

    getAdjacentTilesNonNull(currentTile: TileModel): TileStep[] {
        const adjacentTiles: TileStep[] = [];

        this.getAdjacentTiles(currentTile).forEach((step) => {
            if (step.tile !== null) {
                adjacentTiles.push({
                    direction: step.direction,
                    tile: step.tile,
                });
            }
        });

        return adjacentTiles;
    }

    getTile(tileX: number, tileY: number) {
        if (this.isInBounds(tileX, tileY)) {
            return this.grid[tileX][tileY];
        } else {
            console.log('tile value out of bounds:  ', tileX, tileY);
            return null;
        }
    }

    buildGrid() {
        const grid = [...Array(this.mapWidth)].map((column, tileX) => {
            return [...Array(this.mapHeight)].map((cell, tileY) => {
                const newTile = new TileModel(tileX, tileY);
                return newTile;
            });
        });

        return grid;
    }

    removeEntityAtPoint(tileX: number, tileY: number) {
        this.grid[tileX][tileY].removeEntity();
    }

    setupObservers(viewTiles: TilePixel[][]) {
        this.grid.forEach((column, tileX) => {
            column.forEach((cell, tileY) => {
                cell.subscribe(viewTiles[tileX][tileY]);
            });
        });
    }

    toggleWallAtTile(tileX: number, tileY: number) {
        if (this.isInBounds(tileX, tileY)) {
            this.grid[tileX][tileY].toggleWall();
        }
    }

    createEntityAtTile(tileX: number, tileY: number, entity: Entity) {
        this.grid[tileX][tileY].setEntity(entity);
    }

    clearAllSearchFlags() {
        this.grid.forEach((column, tileX) => {
            column.forEach((cell, tileY) => {
                cell.setConsidered(false);
                cell.setInPath(false);
            });
        });
    }

    checkerboard() {
        this.grid.map((column, tileX) => {
            column.map((cell, tileY) => {
                //  CHECKERBOARD PATTERN  //
                // if (tileX % 2 == 0) {
                //     if (tileY % 2 == 0) {
                //         cell.toggleWall();
                //     } else {
                //         cell.toggleWall();
                //     }
                // } else {
                //     if (tileY % 2 == 0) {
                //         cell.toggleWall();
                //     } else {
                //         cell.toggleWall();
                //     }
                // }
                // PERIMETER FILL //
                // if (
                //     tileX == 0 ||
                //     tileY == 0 ||
                //     tileX == this.mapWidth - 1 ||
                //     tileY == this.mapHeight - 1
                // ) {
                //     cell.toggleWall();
                // }
                // WINDOW PATTERN //
                if (
                    tileX == 0 ||
                    tileY == 0 ||
                    tileX == Math.round(this.mapWidth / 2 - 1) ||
                    tileY == Math.round(this.mapHeight / 2 - 1) ||
                    tileX == this.mapWidth - 1 ||
                    tileY == this.mapHeight - 1
                ) {
                    cell.toggleWall();
                }
            });
        });
    }
}

export default TilemapModel;

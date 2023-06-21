import Tile from './Tile';

class Tilemap {
    mapWidth: number;
    mapHeight: number;
    grid: Tile[][];

    constructor() {
        this.grid = [];
    }

    getDistance(a: Tile, b: Tile) {
        const [aX, aY] = a.getTileCoord();
        const [bX, bY] = b.getTileCoord();
        const xDistance = Math.abs(aX - bX);
        const yDistance = Math.abs(aY - bY);
        return xDistance + yDistance;
    }

    getTileDimensions() {
        return [this.mapWidth, this.mapHeight];
    }

    isInBounds(tileX: number, tileY: number) {
        if (tileX >= this.mapWidth || tileX < 0) {
            return false;
        }

        if (tileY >= this.mapHeight || tileY < 0) {
            return false;
        }

        return true;
    }
}

export default Tilemap;

import Entity from '../Model/Entities/Entity';

class Tile {
    tileX: number;
    tileY: number;
    entity: Entity | null;
    considered: boolean;
    inPath: boolean;
    inPathEntrance: string;
    inPathExit: string;
    isClosed: boolean;
    fScore: number;

    constructor(tileX: number, tileY: number) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.entity = null;
        this.considered = false;
        this.inPath = false;
        this.inPathEntrance = '';
        this.inPathExit = '';
        this.isClosed = false;
        this.fScore = -1;
    }

    getTileCoord() {
        return [this.tileX, this.tileY];
    }
}

export default Tile;

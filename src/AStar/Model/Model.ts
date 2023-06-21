import TilemapModel from './TilemapModel';
import Wall from './Entities/Wall';
import StartPoint from './Entities/StartPoint';
import EndPoint from './Entities/EndPoint';
import Searcher from './Search';
import TilePixel from '../View/TilePixel';
import SearchPath from './SearchPath';
import Entity from './Entities/Entity';

class Model {
    tilemap: TilemapModel;
    isSearching: boolean;
    lastSearch: SearchPath | null;
    searcher: Searcher | null;
    startPoint: StartPoint;
    endPoint: EndPoint;

    constructor(mapDetails: { dimensions: number[] }) {
        this.tilemap = new TilemapModel(mapDetails);
        this.isSearching = false;
        this.lastSearch = null;
        this.searcher = null;
        this.startPoint = new StartPoint(8, 12);
        this.endPoint = new EndPoint(24, 4);
    }

    createInitialState() {
        this.tilemap.createEntityAtTile(
            ...this.getStartPointCoords(),
            new StartPoint(0, 0)
        );
        this.tilemap.createEntityAtTile(
            ...this.getEndPointCoords(),
            new EndPoint(0, 0)
        );
    }

    getStartPointCoords() {
        const points: [number, number] = [this.startPoint.x, this.startPoint.y];
        return points;
    }

    getEndPointCoords() {
        const points: [number, number] = [this.endPoint.x, this.endPoint.y];
        return points;
    }

    entityExistsAtPoint(tileX: number, tileY: number): boolean {
        return !!this.tilemap.getTile(tileX, tileY)?.entity;
    }

    placeEntityAtPoint(tileX: number, tileY: number, entity: Entity): void {
        this.tilemap.createEntityAtTile(tileX, tileY, entity);
    }

    placeStartAtPoint(tileX: number, tileY: number) {
        const newStart = new StartPoint(0, 0);
        this.placeEntityAtPoint(tileX, tileY, newStart);
        this.removeStartPoint();
        this.startPoint = newStart;
    }

    removeStartPoint() {
        this.tilemap.getTile(...this.getStartPointCoords())?.removeEntity();
    }

    placeEndAtPoint(tileX: number, tileY: number) {
        const newEnd = new EndPoint(0, 0);
        this.placeEntityAtPoint(tileX, tileY, newEnd);
        this.removeEndPoint();
        this.endPoint = newEnd;
    }

    removeEndPoint() {
        this.tilemap.getTile(...this.getEndPointCoords())?.removeEntity();
    }

    toggleWallAtPoint(tileX: number, tileY: number) {
        this.tilemap.toggleWallAtTile(tileX, tileY);
    }

    setupObservers(viewTiles: TilePixel[][]) {
        this.tilemap.setupObservers(viewTiles);
    }

    startSearch() {
        this.isSearching = true;
        const startTile = this.tilemap.getTile(...this.getStartPointCoords());
        const endtile = this.tilemap.getTile(...this.getEndPointCoords());

        // return searchDetails;
        if (startTile && endtile) {
            this.searcher = new Searcher(startTile, endtile, this.tilemap);
        } else {
            //this should be unreachable
            console.log('Error:  problem with start and/or endpoint');
        }
    }

    nextSearchStep() {
        if (this.searcher) {
            this.searcher.aStarSearch_step();
            if (this.searcher.searchComplete) {
                this.isSearching = false;
                this.searcher = null;
                //TODO - reset all toConsidered and inPath values here
            }
        }
    }
}

export default Model;

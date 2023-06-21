import SearchPath from './SearchPath';
import TileModel from './TileModel';
import TilemapModel from './TilemapModel';
import { TileStep } from '../Interfaces/TileUtilities';

class Searcher {
    start: TileModel;
    end: TileModel;
    map: TilemapModel;
    toConsider: SearchPath[];
    alreadyConsidered: SearchPath[];
    currentPath: SearchPath;
    currentTile: TileModel;
    searchComplete: boolean;
    numSteps: number;

    constructor(start: TileModel, end: TileModel, map: TilemapModel) {
        this.start = start;
        this.end = end;
        this.map = map;
        this.toConsider = [];
        this.alreadyConsidered = [];
        this.currentPath = new SearchPath(start);
        this.currentTile = this.currentPath.getEndpoint();
        this.searchComplete = false;
        console.log('beginning search...');
        this.numSteps = 0;
    }

    //this is the main search algorithm
    //each call of this function is one step of the search
    //each step will end with the selection of a new path
    //eventually the new path chosen will be the shortest(?) path
    //between the start and end points.
    aStarSearch_step() {
        console.log(`search step #${this.numSteps}`);

        const adjacentTiles: TileStep[] = this.getAdjacentTiles();

        //iterate through adjacent tiles,
        //make new paths from them,
        //and add those paths to the consider list
        adjacentTiles.forEach((step) => {
            const pathIsNew = this.isTileNew(step.tile);

            if (pathIsNew) {
                //create a new path from an adjacent tile
                const newPath = SearchPath.copyPath(this.currentPath);
                newPath.addStep(
                    step,
                    this.map.getDistance(step.tile, this.end)
                );

                if (!this.alreadyConsidered.includes(newPath)) {
                    this.toConsider.push(newPath);
                }
            }
        });

        //find the path with the best F-score
        const bestScoreIdx = this.getBestFScoreIdx();

        //that path will now be the new currentPath
        this.assignNewPath(this.toConsider[bestScoreIdx], bestScoreIdx);

        //clear and re-assign search flags
        this.setTileSearchFlags();

        //check for completion
        if (this.currentTile == this.end) {
            console.log(this.currentPath.steps);
            this.searchComplete = true;
        }
    }

    //get all tiles adjacent to current
    //and filter out out-of-bounds and impassable tiles.
    getAdjacentTiles(): TileStep[] {
        return this.map
            .getAdjacentTilesNonNull(this.currentTile)
            .filter((step) => {
                return step.tile.entity === null || step.tile.entity.isPassable;
            });
    }

    getBestFScoreIdx(): number {
        let bestScore = 999999;
        let bestScoreIdx = 0;

        //find the best Fscore out of all open paths
        this.toConsider.forEach((path, idx) => {
            if (path.fScore < bestScore) {
                bestScore = path.fScore;
                bestScoreIdx = idx;
            }
        });

        return bestScoreIdx;
    }

    //checks that a new tile isn't already in our lists
    //TODO - probably need to refactor how i'm handling this "already in list" case
    isTileNew(tile: TileModel): boolean {
        let pathIsNew = true;

        //this is slow, but the tilemaps aren't big so it should be fine
        this.toConsider.forEach((existingPath) => {
            if (existingPath.getEndpoint() == tile) {
                pathIsNew = false;
            }
        });

        this.alreadyConsidered.forEach((closedPath) => {
            if (closedPath.getEndpoint() == tile) {
                pathIsNew = false;
            }
        });

        return pathIsNew;
    }

    setTileSearchFlags() {
        this.map.clearAllSearchFlags();
        this.toConsider.forEach((path) => {
            path.getEndpoint().setConsidered(true);
        });
        this.getAdjacentTiles().forEach((step) => {
            step.tile.setConsidered(true);
        });
        this.currentPath.steps.forEach((step, stepIdx) => {
            step.tile.setConsidered(false);
            // console.log(step);
            let entranceDir = '';
            if (step.direction == 'north') entranceDir = 'south';
            if (step.direction == 'east') entranceDir = 'west';
            if (step.direction == 'south') entranceDir = 'north';
            if (step.direction == 'west') entranceDir = 'east';

            // if (stepIdx - 1 >= 0 && stepIdx + 1 < this.currentPath.steps.length) {
            //     const prevStep = this.currentPath.steps[stepIdx - 1];

            // }
            let exitDir = '';
            if (stepIdx + 1 < this.currentPath.steps.length) {
                exitDir = this.currentPath.steps[stepIdx + 1].direction;
            }
            step.tile.setInPath(true, entranceDir, exitDir);
        });
    }

    assignNewPath(newPath: SearchPath, idx: number): void {
        this.alreadyConsidered.push(this.currentPath);
        this.currentPath.steps.forEach((step) => {
            step.tile.isClosed = true;
        });
        this.currentPath.getEndpoint().fScore = this.currentPath.fScore;
        this.currentPath = newPath;
        this.currentTile = this.currentPath.getEndpoint();
        this.toConsider.splice(idx, 1);
        // console.log(this.alreadyConsidered);
    }
}

export default Searcher;

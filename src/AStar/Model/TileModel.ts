import Tile from '../Superclasses/Tile';
import TilePixel from '../View/TilePixel';
import { TileState } from '../Interfaces/TileUtilities';
import Entity from './Entities/Entity';
import Wall from './Entities/Wall';

class TileModel extends Tile {
    tileX: number;
    tileY: number;
    entity: Entity | null;
    considered: boolean;
    inPath: boolean;
    observers: TilePixel[];

    constructor(tileX: number, tileY: number) {
        super(tileX, tileY);
        this.observers = [];
        this.inPath = false;
    }

    setConsidered(bool: boolean) {
        this.considered = bool;
        this.notifyObservers();
    }

    toggleWall() {
        if (this.entity != null && this.entity.getEntityType() == 'Wall') {
            this.removeEntity();
        } else {
            this.createWall();
        }
        this.notifyObservers();
    }

    createWall() {
        const wall = new Wall(this.tileX, this.tileY);
        this.entity = wall;
        this.notifyObservers();
    }

    setEntity(entity: Entity) {
        entity.setX(this.tileX);
        entity.setY(this.tileY);
        this.entity = entity;
        this.notifyObservers();
    }

    removeEntity() {
        this.entity = null;
        this.notifyObservers();
    }

    //if setting inPath to true, it's expected that you provide entrance and exit directions
    setInPath(bool: boolean, entrance = '', exit = '') {
        this.inPath = bool;
        if (bool) {
            this.inPathEntrance = entrance;
            this.inPathExit = exit;
        }
        this.notifyObservers();
    }

    notifyObservers() {
        this.observers.forEach((obs) => {
            obs.notify(this.getState());
        });
    }

    getState() {
        const state: TileState = {
            entity: this.entity,
            considered: this.considered,
            inPath: this.inPath,
            inPathEntrance: this.inPathEntrance,
            inPathExit: this.inPathExit,
            isClosed: this.isClosed,
            fScore: this.fScore,
        };
        return state;
    }

    subscribe(observer: TilePixel) {
        this.observers.push(observer);
    }

    unsubscribe(observer: any) {
        const idx = this.observers.indexOf(observer);
        if (idx != -1) this.observers.splice(idx, 1);
    }
}

export default TileModel;

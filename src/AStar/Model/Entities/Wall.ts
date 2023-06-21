import Entity from './Entity';

class Wall extends Entity {
    isPassable: boolean;

    constructor(x: number, y: number) {
        super(x, y);
        this.isPassable = false;
    }
}

export default Wall;

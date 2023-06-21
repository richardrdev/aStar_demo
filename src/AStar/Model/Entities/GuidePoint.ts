import Entity from './Entity';

class GuidePoint extends Entity {
    constructor(x: number, y: number) {
        super(x, y);
        this.isPassable = true;
    }
}

export default GuidePoint;

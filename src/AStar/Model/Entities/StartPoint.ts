import Entity from './Entity';
import GuidePoint from './GuidePoint';

class StartPoint extends GuidePoint {
    constructor(x: number, y: number) {
        super(x, y);
    }
}

export default StartPoint;

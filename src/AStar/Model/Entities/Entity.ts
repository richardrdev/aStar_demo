class Entity {
    x: number;
    y: number;
    isPassable: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.isPassable = false;
    }

    getPosition() {
        return [this.x, this.y];
    }

    getEntityType() {
        return this.constructor.name;
    }

    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }

    move(direction: string, magnitude = 1) {
        let yDirection = 0;
        let xDirection = 0;
        switch (direction.toUpperCase()) {
            case 'UP':
                yDirection = -1;
                break;
            case 'DOWN':
                yDirection = 1;
                break;
            case 'LEFT':
                xDirection = -1;
                break;
            case 'RIGHT':
                xDirection = 1;
                break;
        }

        this.x += xDirection * magnitude;
        this.y += yDirection * magnitude;
    }
}

export default Entity;

import View from './View/View';
import Model from './Model/Model';
import p5 from 'p5';

// ? should app and controller be merged?

class Controller {
    view: View;
    model: Model;
    setupComplete: boolean;
    placingState: string;
    animationActive: boolean;
    animationDelay: number;

    constructor() {
        this.setupComplete = false;
    }

    /*
    all this stuff has to be initialized outside of the constuctor 
    because of how the p5 object works.  Could be worked around, but
    not really worth it
    */
    setup(sketch: p5) {
        this.view = new View(sketch);
        this.model = new Model(this.view.getMapDetails());
        this.model.setupObservers(this.view.tilemap.grid);
        this.model.createInitialState();
        //this.model.tilemap.checkerboard();
        this.placingState = 'START';
        animationActive: false;
        animationSpeed: 60 / 1;

        this.setupComplete = true;
    }

    startSearch() {
        if (!this.model.isSearching) {
            if (this.animationActive) {
                this.model.startSearch();
            } else {
                this.model.startSearch();
            }
        }
    }

    nextSearchStep() {
        if (this.model.isSearching) {
            this.model.nextSearchStep();
        }
    }

    updatePlacingState(newState: string) {
        this.placingState = newState;
    }

    draw(sketch: p5) {
        if (this.model.isSearching && this.animationActive) {
            if (sketch.frameCount % this.animationDelay == 0) {
                this.nextSearchStep();
            }
        }
        this.view.draw(sketch);
        // console.log(sketch.frameCount);
    }

    changeAnimationState(isActive: boolean, speed: number) {
        this.animationActive = isActive;
        this.animationDelay = 60 / speed;
    }

    mousePressed(mouseX: number, mouseY: number): void {
        const [tileX, tileY] = this.view.getTileFromMouse(mouseX, mouseY);

        if (!this.model.tilemap.isInBounds(tileX, tileY)) {
            return;
        }

        switch (this.placingState) {
            case 'START':
                if (!this.model.entityExistsAtPoint(tileX, tileY)) {
                    this.model.placeStartAtPoint(tileX, tileY);
                }
                break;
            case 'END':
                if (!this.model.entityExistsAtPoint(tileX, tileY)) {
                    this.model.placeEndAtPoint(tileX, tileY);
                }
                break;
            case 'WALL':
                this.model.toggleWallAtPoint(tileX, tileY);
                break;
            default:
                console.log(
                    'somehow an unauthorized placing state value got through?'
                );
                break;
        }
    }
}

export default Controller;

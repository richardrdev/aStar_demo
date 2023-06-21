import p5 from 'p5';
import Controller from './Controller';

class AStarDemo {
    sketch: p5;
    controller: Controller;

    setup() {
        this.sketch = new p5((sketch) => {
            this.buildSketch(sketch);
        });
        this.controller = new Controller();
    }

    buildSketch(sketch: p5) {
        sketch.setup = () => {
            this.controller.setup(this.sketch);
        };

        sketch.draw = () => {
            this.controller.draw(this.sketch);
        };

        sketch.mousePressed = () => {
            this.controller.mousePressed(sketch.mouseX, sketch.mouseY);
        };

        // ///TODO - implement dynamically changing the display on resize.  Maybe?
        // sketch.windowResize = () => {
        //     this.controller.windowResized();
        // };
    }

    // attachButtonEvents(elements: {
    //     startButton: HTMLElement | null;
    //     nextButton: HTMLElement | null;
    // }) {
    //     if (elements.startButton != null) {
    //         elements.startButton.addEventListener('click', () => {
    //             this.controller.startSearch();
    //         });
    //     } else {
    //         console.log('ERROR:  start button element not found');
    //     }
    //     if (elements.nextButton != null) {
    //         elements.nextButton.addEventListener('click', () => {
    //             this.controller.continueSearch();
    //         });
    //     } else {
    //         console.log('ERROR:  start button element not found');
    //     }
    // }

    //the rest of the methods are state update methods from the react app
    beginSearch() {
        if (this.controller.setupComplete) {
            this.controller.startSearch();
        }
    }

    nextSearchStep() {
        if (this.controller.setupComplete) {
            this.controller.nextSearchStep();
        }
    }

    changePlacingState(newState: string) {
        if (this.controller.setupComplete) {
            this.controller.updatePlacingState(newState);
        }
    }

    changeAnimationState(isActive: boolean, speed: number) {
        if (this.controller.setupComplete) {
            this.controller.changeAnimationState(isActive, speed);
        }
    }
}

export default AStarDemo;

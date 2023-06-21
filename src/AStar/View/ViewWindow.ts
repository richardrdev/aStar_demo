import p5 from 'p5';
import resolutions from './resolutions';

class ViewWindow {
    resolutions: { width: number; height: number }[];
    WIDTH_MAX: number;
    breakpoints: number[];
    width: number;
    height: number;
    canvas: p5.Renderer;

    constructor() {
        this.resolutions = resolutions;
        this.WIDTH_MAX = 1000;
        this.breakpoints = [];

        this.resolutions.forEach((resolution) => {
            this.breakpoints.push(resolution.width / 2);
        });

        [this.width, this.height] = [800, 600];
    }

    getDimensions() {
        const dimensions: [number, number] = [this.width, this.height];
        return dimensions;
    }
}

export default ViewWindow;

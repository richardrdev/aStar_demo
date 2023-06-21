import { createContext } from 'react';

export const placing = {
    start: 'START',
    end: 'END',
    wall: 'WALL',
};

export const MouseClickContext = createContext(placing.start);

import { createContext } from 'react';

//animationSpeed is the number of search steps rendered in a 60 frame second
//1 is the minimum, equivalent to 1 frame per second, 60 is the maximum.
export const animationDefaults = {
    isActive: false,
    speed: 20,
};

export const AnimationContext = createContext(animationDefaults);

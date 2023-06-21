import React from 'react';
import Controls from './Components/Controls';
import Header from './Components/Header';
import CanvasAppConnector from './Components/CanvasAppConnector';
import { SearchContext } from './Components/SearchContext';
import { useState } from 'react';
import { MouseClickContext, placing } from './Components/MouseClickContext';
import {
    AnimationContext,
    animationDefaults,
} from './Components/AnimationContext';

export default function App() {
    const [isSearching, setIsSearching] = useState(false);
    const [stepCount, setStepCount] = useState(0);
    const [currentlyPlacing, setCurrentlyPlacing] = useState(placing.start);
    const [animationState, setAnimation] = useState(animationDefaults);

    console.log(animationState);

    return (
        <div className="container">
            <SearchContext.Provider
                value={{
                    isSearching: isSearching,
                    toggleIsSearching: () => {
                        setIsSearching(!isSearching);
                    },
                    stepCount: stepCount,
                    setStepCount: setStepCount,
                }}
            >
                <MouseClickContext.Provider
                    value={{
                        currentlyPlacing: currentlyPlacing,
                        setCurrentlyPlacing: setCurrentlyPlacing,
                    }}
                >
                    <AnimationContext.Provider
                        value={{
                            isActive: animationState.isActive,
                            speed: animationState.speed,
                            setAnimation: setAnimation,
                        }}
                    >
                        <div id="app-ui">
                            <Header />
                            <Controls />
                        </div>
                        <CanvasAppConnector />
                    </AnimationContext.Provider>
                </MouseClickContext.Provider>
            </SearchContext.Provider>
        </div>
    );
}

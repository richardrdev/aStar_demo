import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../SearchContext';
import { AnimationContext } from '../AnimationContext';
import { MouseClickContext, placing } from '../MouseClickContext';
import { RangeSlider } from './RangeSlider';

export default function DefaultControls() {
    function handleRadioChange(event) {
        if (placingState.currentlyPlacing != event.target.value) {
            placingState.setCurrentlyPlacing(event.target.value);
        }
    }

    function handleCheckboxChange(event) {
        animationState.setAnimation({
            isActive: event.target.checked,
            speed: animationState.speed,
        });
    }

    function updateSpeed(newSpeed) {
        animationState.setAnimation({
            isActive: animationState.isActive,
            speed: newSpeed,
        });
    }

    const search = useContext(SearchContext);
    const placingState = useContext(MouseClickContext);
    const animationState = useContext(AnimationContext);

    return (
        <div id="default-controls">
            <div className="control columns">
                <label className="btn-column column">
                    <input
                        id="place-start-radio"
                        type="radio"
                        value={placing.start}
                        name="placement-selection"
                        checked={
                            placingState.currentlyPlacing === placing.start
                        }
                        onChange={handleRadioChange}
                    ></input>
                    &nbsp;Place Start Point
                </label>
                <label className="btn-column column">
                    <input
                        id="place-end-radio"
                        type="radio"
                        value={placing.end}
                        name="placement-selection"
                        checked={placingState.currentlyPlacing === placing.end}
                        onChange={handleRadioChange}
                    ></input>
                    &nbsp;Place End Point
                </label>
                <label className="btn-column column">
                    <input
                        id="place-walls-radio"
                        type="radio"
                        value={placing.wall}
                        name="placement-selection"
                        checked={placingState.currentlyPlacing === placing.wall}
                        onChange={handleRadioChange}
                    ></input>
                    &nbsp;Place Walls
                </label>
            </div>
            <div className="columns">
                <div className="btn-column column">
                    <button
                        id="start-btn"
                        className="button"
                        onClick={search.toggleIsSearching}
                    >
                        Begin Search
                    </button>
                </div>
                <div className="btn-column column">
                    <label className="checkbox">
                        <input
                            id="animation-checkbox"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                        ></input>
                        &nbsp;Animate Results?
                    </label>
                </div>
                <div className="btn-column column">
                    <RangeSlider getValueUpdate={updateSpeed} />
                </div>
            </div>
        </div>
    );
}

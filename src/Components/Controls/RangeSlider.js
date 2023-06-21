import React, { useEffect, useState } from 'react';
import { AnimationContext } from '../AnimationContext';

export const RangeSlider = (props) => {
    const [value, setValue] = useState(30);

    function handleChange(event) {
        setValue(parseInt(event.target.value));
    }

    useEffect(() => {
        props.getValueUpdate(value);
    }, [value]);

    return (
        <label className="">
            <input
                type="range"
                min="10"
                max="60"
                step="10"
                value={value}
                onChange={handleChange}
            ></input>
            Animation Speed
        </label>
    );
};

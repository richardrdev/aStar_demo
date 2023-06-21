import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../SearchContext';

export default function SearchControls() {
    const search = useContext(SearchContext);

    return (
        <div id="search-controls">
            <div className="columns">
                <div className="column">
                    <button id="skip-btn" className="button">
                        Skip to End
                    </button>
                </div>
                <div className="column">
                    <button
                        id="next-btn"
                        className="button"
                        onClick={() => {
                            search.setStepCount(search.stepCount + 1);
                        }}
                    >
                        Next Step
                    </button>
                </div>
                <div className="column">
                    <button
                        id="next-btn"
                        className="button"
                        onClick={search.toggleIsSearching}
                    >
                        (Temp) End Search
                    </button>
                </div>
            </div>
        </div>
    );
}

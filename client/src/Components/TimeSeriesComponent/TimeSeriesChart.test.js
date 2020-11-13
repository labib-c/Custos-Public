import React from 'react';
import ReactDOM, { render } from 'react-dom';
import TimeSeries from './TimeSeriesChart';

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TimeSeries></TimeSeries>, div)
})
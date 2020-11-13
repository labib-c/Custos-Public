import React from 'react';
import ReactDOM, { render } from 'react-dom';
import TimeSeries from './TimeSeriesChart';
import {data} from './../../mockData/timeData'

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TimeSeries data={data}></TimeSeries>, div)
})
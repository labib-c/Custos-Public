import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Doughnut from '../../Components/DoughnutChart'
import {doughnutData} from '../../mockData/doughnutData'

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Doughnut data={doughnutData}></Doughnut>, div)
})
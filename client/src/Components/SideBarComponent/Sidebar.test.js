import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Sidebar from './Sidebar';

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Sidebar></Sidebar>, div)
})
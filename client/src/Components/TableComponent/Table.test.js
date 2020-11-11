import React from 'react';
import ReactDOM, { render } from 'react-dom';
import DataTable from './DataTable';

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DataTable></DataTable>, div)
})
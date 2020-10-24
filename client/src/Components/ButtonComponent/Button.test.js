import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Button from './Button';

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div)
})

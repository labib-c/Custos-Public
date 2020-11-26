import React from 'react';
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar';

it("renders", () => {
    window.history.pushState({}, 'Test page', '/')
    render(<Sidebar></Sidebar>, {wrapper: MemoryRouter})
})
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from './Sidebar';

it("renders", () => {
    window.history.pushState({}, 'Test page', '/')
    render(<Sidebar></Sidebar>, {wrapper: MemoryRouter})
})
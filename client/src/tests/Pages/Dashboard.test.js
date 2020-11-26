import React from 'react'
import { render } from '@testing-library/react'
import Dashboard from '../../Pages/Dashboard'
import { MemoryRouter } from 'react-router-dom'

it("renders", () => {
    window.history.pushState({}, 'Dash', '/')
    render(<Dashboard></Dashboard>, {wrapper: MemoryRouter})
})
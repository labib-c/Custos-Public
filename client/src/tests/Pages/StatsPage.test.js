import React from 'react'
import { render } from '@testing-library/react'
import StatsPage from '../../Pages/StatsPage'
import { MemoryRouter } from 'react-router-dom'

it("renders", () => {
    window.history.pushState({}, 'Stats Page', '/stats')
    render(<StatsPage></StatsPage>, {wrapper: MemoryRouter})
})
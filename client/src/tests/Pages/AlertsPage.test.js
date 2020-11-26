import React from 'react'
import { render } from '@testing-library/react'
import AlertsPage from '../../Pages/AlertsPage'
import { MemoryRouter } from 'react-router-dom'

it("renders", () => {
    window.history.pushState({}, 'Alert Page', '/alerts')
    render(<AlertsPage></AlertsPage>, {wrapper: MemoryRouter})
})
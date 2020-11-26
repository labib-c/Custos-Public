import React from 'react'
import { render } from '@testing-library/react'
import DataPage from '../../Pages/DataPage'
import { MemoryRouter } from 'react-router-dom'

it("renders", () => {
    window.history.pushState({}, 'Data Page', '/data')
    render(<DataPage></DataPage>, {wrapper: MemoryRouter})
})
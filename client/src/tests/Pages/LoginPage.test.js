import React from 'react'
import { render } from '@testing-library/react'
import LoginPage from '../../Pages/LoginPage'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../Components/Login', () => {
    const Mock = () => <div />;
    return Mock;
});

it("renders", () => {
    window.history.pushState({}, 'Login Page', '/login')
    render(<LoginPage></LoginPage>, {wrapper: MemoryRouter})
})
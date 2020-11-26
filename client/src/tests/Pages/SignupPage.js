import React from 'react'
import { render } from '@testing-library/react'
import SignupPage from '../../Pages/SignupPage'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../Components/Signup', () => {
    const Mock = () => <div />;
    return Mock;
});

it("renders", () => {
    window.history.pushState({}, 'Sign Up Page', '/signup')
    render(<SignupPage></SignupPage>, {wrapper: MemoryRouter})
})
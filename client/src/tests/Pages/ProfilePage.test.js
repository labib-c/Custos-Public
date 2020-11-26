import React from 'react'
import { render } from '@testing-library/react'
import ProfilePage from '../../Pages/ProfilePage'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../Components/ProfileCard', () => {
    const ProfileCard = () => <div />;
    return ProfileCard;
});

it("renders", () => {
    window.history.pushState({}, 'Profile Page', '/profile')
    render(<ProfilePage></ProfilePage>, {wrapper: MemoryRouter})
})
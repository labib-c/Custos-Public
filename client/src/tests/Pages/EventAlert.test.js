import React from 'react'
import { render } from '@testing-library/react'
import EventAlert from '../../Pages/EventAlert'
import { MemoryRouter } from 'react-router-dom'

it("renders", () => {
    const path = `/alerts/:eventId`;

    const match = {
        isExact: false,
        path,
        url: path.replace(':eventId', 'test'),
        params: { eventId: "test" }
    };
    window.history.pushState({}, 'Event Alert', '/alerts/test')
    render(<EventAlert match={match}></EventAlert>, {wrapper: MemoryRouter})
})
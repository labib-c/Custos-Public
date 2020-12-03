import React from 'react';
import { render } from '@testing-library/react'
import EventProfile from '../../Components/EventProfile'

it("renders", () => {
    render(<EventProfile match={38}></EventProfile>)
})
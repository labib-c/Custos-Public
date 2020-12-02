import React from 'react';
import { render } from '@testing-library/react'
import ShapValueChart from '../../Components/ShapValueChart'
import {shapData} from '../../mockData/shapData'

it("renders", () => {
    render(<ShapValueChart data={shapData}></ShapValueChart>)
})
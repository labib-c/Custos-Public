import React from 'react';
import { render } from '@testing-library/react'
import TimeSeries from '../../Components/TimeSeriesChart';
import {data} from '../../mockData/timeData'
import {  mount, } from 'enzyme';
import Button from '@material-ui/core/Button';
import { ResponsiveLine } from '@nivo/line'

it("renders", () => {
    const div = document.createElement("div");
    render(<TimeSeries data={data}></TimeSeries>, div)
})

it("Filters", () => {
    const wrapper = mount(<TimeSeries data={data}></TimeSeries>)
    const firstButton = wrapper.find(Button).at(0)
    firstButton.simulate('click')
    expect(wrapper.find(ResponsiveLine).props().data.length).toBe(5)
    const secondButton = wrapper.find(Button).at(1)
    secondButton.simulate('click')
    expect(wrapper.find(ResponsiveLine).props().data.length).toBe(5)
    const thirdButton = wrapper.find(Button).at(2)
    thirdButton.simulate('click')
    expect(wrapper.find(ResponsiveLine).props().data.length).toBe(5)

})
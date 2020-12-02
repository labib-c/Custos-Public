import React from 'react';
import { render } from '@testing-library/react'
import Doughnut from '../../Components/DoughnutChart'
import {doughnutData} from '../../mockData/doughnutData'
import {  mount, } from 'enzyme';
import { ResponsivePie } from '@nivo/pie'
import Button from '@material-ui/core/Button';

it("renders", () => {
    const div = document.createElement("div");
    render(<Doughnut data={doughnutData}></Doughnut>, div)
})

it("Filters", () => {
    const wrapper = mount(<Doughnut data={doughnutData}></Doughnut>)
    const firstButton = wrapper.find(Button).at(0)
    firstButton.simulate('click')
    expect(wrapper.find(ResponsivePie).props().data.length).toBe(5)
    const secondButton = wrapper.find(Button).at(1)
    secondButton.simulate('click')
    expect(wrapper.find(ResponsivePie).props().data.length).toBe(5)
    const thirdButton = wrapper.find(Button).at(2)
    thirdButton.simulate('click')
    expect(wrapper.find(ResponsivePie).props().data.length).toBe(5)

})
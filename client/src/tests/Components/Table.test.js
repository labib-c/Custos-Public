import React from 'react';
import { render } from '@testing-library/react'
import DataTable from '../../Components/DataTable';
import { MemoryRouter } from 'react-router-dom'
import {rows, columns} from '../../mockData/tableData'
import TableRow from '@material-ui/core/TableRow';
import {  mount, } from 'enzyme';

describe("Table Component Tests", () => {

    it("renders", () => {
        render(<DataTable rows={rows} columns={columns}></DataTable>, {wrapper: MemoryRouter})
    })
    
    it("Filters Anomalies on button click", () => {
        const wrapper = mount(
        <MemoryRouter>
            <DataTable rows={rows} columns={columns} />
        </MemoryRouter>)

        expect(wrapper.find(TableRow).length).toBe(11)
        wrapper.find('#table-filter').at(1).simulate('click')
        expect(wrapper.find(TableRow).length).toBe(3)
        wrapper.unmount()
    })
})

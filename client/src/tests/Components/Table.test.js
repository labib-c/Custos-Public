import React from 'react';
import { render } from '@testing-library/react'
import DataTable from '../../Components/DataTable';
import { MemoryRouter } from 'react-router-dom'
import {rows, columns} from '../../mockData/tableData'

it("renders", () => {
    const div = document.createElement("div");
    render(<DataTable rows={rows} columns={columns}></DataTable>, {wrapper: MemoryRouter})
})
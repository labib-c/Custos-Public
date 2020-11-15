import React from 'react';
import ReactDOM, { render } from 'react-dom';
import DataTable from './DataTable';
import {rows, columns} from './../../mockData/tableData'

it("renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DataTable rows={rows} columns={columns}></DataTable>, div)
})
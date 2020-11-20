import React from 'react'
import Sidebar from "./../Components/SideBarComponent/Sidebar";
import DataTable from "./../Components/TableComponent/DataTable";
import {rows, columns} from './../mockData/tableData';

export default function DataPage() {
    return (
        <Sidebar>
            <DataTable rows={rows} columns={columns} header={"Data"}></DataTable>
        </Sidebar>
    )
}

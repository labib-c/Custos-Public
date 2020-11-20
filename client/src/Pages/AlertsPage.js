import React from 'react'
import Sidebar from "./../Components/SideBarComponent/Sidebar";
import DataTable from "./../Components/TableComponent/DataTable"; //only for mock data we import filterArray
import {rows, columns} from './../mockData/tableData';

export default function AlertsPage() {
    function filterArray(array) {
        const filteredArray = array.filter(item => item.anomaly === true );
        return filteredArray;
    }

    return (
        <Sidebar>
            <DataTable rows={filterArray(rows)} columns={columns} header={"Alerts"} removeFilter={true}></DataTable>
        </Sidebar>
    )
}

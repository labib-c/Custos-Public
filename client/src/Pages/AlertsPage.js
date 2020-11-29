import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable"; //only for mock data we import filterArray
import {rows, columns} from './../mockData/tableData';

export default function AlertsPage() {
    React.useEffect(() => {
        document.title = "Custos | Alerts Page";
      }, []);

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

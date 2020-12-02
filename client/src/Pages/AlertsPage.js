import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable"; //only for mock data we import filterArray
// import {rows, columns} from './../mockData/tableData';
import {getData, columns} from '../util/firebaseHelpers'

export default function AlertsPage() {
    // const [rows, setRows] = React.useState([])
    React.useEffect(() => {
        document.title = "Custos | Alerts Page";
        document.body.style.backgroundColor = "#F4F4F3"
        // setRows(filterArray(getData()))
      }, []);

    function filterArray(array) {
        const filteredArray = array.filter(item => item.Anomaly === true );
        return filteredArray;
    }

    return (
        <Sidebar>
            <DataTable rows={filterArray(getData())} columns={columns} header={"Alerts"} ></DataTable>
        </Sidebar>
    )
}

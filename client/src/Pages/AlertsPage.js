import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import {getData, columns} from '../util/firebaseHelpers'

export default function AlertsPage() {
    const [rows, setRows] = React.useState([])
    React.useEffect(() => {
        document.title = "Custos | Alerts Page";
        document.body.style.backgroundColor = "#F4F4F3"
        async function data() {
            let data = await getData()
            setRows(data)
        }
        data()
      }, []);

    function filterArray(array) {
        const filteredArray = array.filter(item => item.Anomaly === true );
        return filteredArray;
    }

    return (
        <Sidebar>
            <DataTable rows={filterArray(rows)} columns={columns} header={"Alerts"}  removeFilter={true}></DataTable>
        </Sidebar>
    )
}

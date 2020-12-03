import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import {getData, columns} from './../util/firebaseHelpers'

export default function DataPage() {
    const [tableData, setTableData] = React.useState([])

    React.useEffect(() => {
        document.title = "Custos | Data Page";
        document.body.style.backgroundColor = "#F4F4F3"
        async function data() {
            let data = await getData()
            setTableData(data)
        }
        data()
      }, []);

    return (
        <Sidebar>
            <DataTable rows={tableData} columns={columns} header={"Data"}></DataTable>
        </Sidebar>
    )
}

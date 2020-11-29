import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import {rows, columns} from './../mockData/tableData';

export default function DataPage() {
    React.useEffect(() => {
        document.title = "Custos | Data Page";
      }, []);

    return (
        <Sidebar>
            <DataTable rows={rows} columns={columns} header={"Data"}></DataTable>
        </Sidebar>
    )
}

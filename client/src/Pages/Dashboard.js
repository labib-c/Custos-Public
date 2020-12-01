import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import TimeSeries from "./../Components/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChart";
import {data} from './../mockData/timeData';
import {getData, columns, anomaliesToRegular} from './../util/firebaseHelpers'

export default function Dashboard(props) {
    const [tableData, setTableData] = React.useState([])
    React.useEffect( () => {
        document.title = "Custos | Dashboard";
        setTableData(getData())

      }, []);

    return(
        <Sidebar>
            <div style={{display: "flex", flexDirection: "row"}}>
                <TimeSeries data={data}></TimeSeries>
                <Doughnut data={anomaliesToRegular(tableData)}></Doughnut>
            </div>
            <DataTable rows={tableData} columns={columns} header={"Data"}></DataTable>
        </Sidebar>
      );
}
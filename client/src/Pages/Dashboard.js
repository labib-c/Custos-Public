import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import TimeSeries from "./../Components/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChart";
import {data} from './../mockData/timeData';
import {rows, columns} from './../mockData/tableData';
import {doughnutData} from './../mockData/doughnutData';

export default function Dashboard(props) {
    React.useEffect(() => {
        document.title = "Custos | Dashboard";
      }, []);

    return (
        <Sidebar>
            <div style={{display: "flex", flexDirection: "row"}}>
                <TimeSeries data={data}></TimeSeries>
                <Doughnut data={doughnutData}></Doughnut>
            </div>
            <DataTable rows={rows} columns={columns} header={"Data"}></DataTable>
        </Sidebar>
      );
}
import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import TimeSeries from "./../Components/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChart";
import {getData, columns, anomaliesToRegular, getActivity} from './../util/firebaseHelpers'

export default function Dashboard() {
    const [data, setData] = React.useState([])
    React.useEffect( () => {
        document.title = "Custos | Dashboard";
        document.body.style.backgroundColor = "#F4F4F3"
        async function data() {
            let data = await getData()
            setData(data)
        }
        data()
        
    }, []);
    
    return(
        <Sidebar>
            <div style={{display: "flex", flexDirection: "row"}}>
                <TimeSeries data={[getActivity(data)]} xAxis={"Time"} yAxis={"Number of Events"} header={"Activity"}></TimeSeries>
                <Doughnut data={anomaliesToRegular(data)} header={"Distribution of Anomalies"}></Doughnut>
            </div>
            <DataTable rows={data} columns={columns} header={"Data"} ></DataTable>
        </Sidebar>
      );
}

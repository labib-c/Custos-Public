import React from 'react'
import Sidebar from "./../Components/Sidebar";
import DataTable from "./../Components/DataTable";
import TimeSeries from "./../Components/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChart";
import {getData, columns, anomaliesToRegular, getActivity} from './../util/firebaseHelpers'

export default function Dashboard() {

    React.useEffect( () => {
        document.title = "Custos | Dashboard";
        document.body.style.backgroundColor = "#F4F4F3"
    }, []);
    
    return(
        <Sidebar>
            <div style={{display: "flex", flexDirection: "row"}}>
                <TimeSeries data={[getActivity(getData())]}></TimeSeries>
                <Doughnut data={anomaliesToRegular(getData())} ></Doughnut>
            </div>
            <DataTable rows={getData()} columns={columns} header={"Data"} ></DataTable>
        </Sidebar>
      );
}

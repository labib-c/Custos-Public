import Sidebar from "./../Components/SideBarComponent/Sidebar";
import DataTable from "./../Components/TableComponent/DataTable";
import TimeSeries from "./../Components/TimeSeriesComponent/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChartComponent/DoughnutChart";
import {data} from './../mockData/timeData';
import {rows, columns} from './../mockData/tableData';
import {doughnutData} from './../mockData/doughnutData';

export default function Dashboard(props) {
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
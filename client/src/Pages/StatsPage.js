import React from 'react'
import Sidebar from "./../Components/Sidebar";
import TimeSeries from "./../Components/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChart";
import { makeStyles } from '@material-ui/core/styles';
import {
    getData, 
    anomaliesToRegular, 
    getActivity, 
    successVsFailures, 
    getAnomalies
} from './../util/firebaseHelpers'

const useStyle = makeStyles((theme) => ({
    row: {
        display: "flex", 
        flexDirection: "row"
    }
}))

export default function StatsPage() {
    const classes = useStyle()
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        document.title = "Custos | Statistics Page";
        document.body.style.backgroundColor = "#F4F4F3"
        async function data() {
            let data = await getData()
            setData(data)
        }
        data()
      }, []);

    return (
        <Sidebar>
            <div className={classes.row}>
                <Doughnut data={successVsFailures(data)} header={"Successful vs. Failed Events"} ></Doughnut>
                <TimeSeries data={[getAnomalies(data)]} xAxis={"Time"} yAxis={"Number of Anomalies"} header={"Total Anomalies"}></TimeSeries>
            </div>
            <div className={classes.row}>
                <TimeSeries data={[getActivity(data)]} xAxis={"Time"} yAxis={"Number of Events"} header={"Activity"}></TimeSeries>
                <Doughnut data={anomaliesToRegular(data)} header={"Distribution of Anomalies"}></Doughnut>
            </div>
        </Sidebar>
    )
}

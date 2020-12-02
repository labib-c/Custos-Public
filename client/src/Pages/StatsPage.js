import React from 'react'
import Sidebar from "./../Components/Sidebar";
import TimeSeries from "./../Components/TimeSeriesChart";
import Doughnut from "./../Components/DoughnutChart";
import {data} from './../mockData/timeData';
import {doughnutData} from './../mockData/doughnutData';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    row: {
        display: "flex", 
        flexDirection: "row"
    }
}))

export default function StatsPage() {
    const classes = useStyle()

    React.useEffect(() => {
        document.title = "Custos | Statistics Page";
        document.body.style.backgroundColor = "#F4F4F3"
      }, []);

    return (
        <Sidebar>
            <div className={classes.row}>
                <TimeSeries data={data}></TimeSeries>
                <Doughnut data={doughnutData} ></Doughnut>
            </div>
            <div className={classes.row}>
                <Doughnut data={doughnutData} ></Doughnut>
                <TimeSeries data={data}></TimeSeries>
            </div>
        </Sidebar>
    )
}

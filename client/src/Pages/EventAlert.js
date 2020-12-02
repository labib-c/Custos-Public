import React from 'react'
import Sidebar from '../Components/Sidebar'
import ShapValueChart from '../Components/ShapValueChart'
import DataTable from '../Components/DataTable'
import {shapData} from '../mockData/shapData'
import {rows, columns} from './../mockData/tableData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header: {
        paddingLeft: "15px"
    }
});

export default function EventAlert(props) {
    const classes = useStyles()

    React.useEffect(() => {
        document.title = `Custos | Alert: ${props.match.params.eventId}`;
        document.body.style.backgroundColor = "#F4F4F3"
      }, [props.match.params.eventId]);

    return (
        <Sidebar>
            <h1 className={classes.header}>Event Key: {props.match.params.eventId}</h1>
            <p className={classes.header} >----- Explanation about SHAP Values can go here -----</p>
            <ShapValueChart data={shapData} header={"Custos Scores"}></ShapValueChart>
            <DataTable rows={rows} columns={columns} header={"Related Events"}></DataTable>

        </Sidebar>
    )
}

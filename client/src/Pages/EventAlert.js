import React from 'react'
import Sidebar from '../Components/Sidebar'
import ShapValueChart from '../Components/ShapValueChart'
import DataTable from '../Components/DataTable'
import EventProfile from '../Components/EventProfile'
import { makeStyles } from '@material-ui/core/styles';
import {getCustosScore, getRelatedEvents, columns, getData} from './../util/firebaseHelpers'

const useStyles = makeStyles({
    header: {
        paddingLeft: "15px"
    }
});

export default function EventAlert(props) {
    const classes = useStyles()
    const [scores, setScores] = React.useState([])
    const [rows, setRows] = React.useState([])
    React.useEffect(() => {
        document.title = `Custos | Event Alert`;
        document.body.style.backgroundColor = "#F4F4F3"
        window.scrollTo(0, 0)
        async function custosScore() {
            let data = await getCustosScore(props.match.params.eventId)
            let rows = await getData()
            setScores(data)
            setRows(rows)
        }
        custosScore()

      }, [props.match.params.eventId]);

    return (
        <Sidebar>
            <h1 className={classes.header}>Event Alert </h1>
            <p className={classes.header} >Custos scores are a unique value that allows analysts to determine what features have contributed most to a security alert. Our threat detection model uses an autoencoder to detect anomalous behaviour amongst our feature inputs which then triggers an alert. 
            <br></br>We compute the unique SHAP values for all features for each prediction made and then aggregate and scale those values to generate our custom Custos score. 
            <br></br>This score is then used to rank the feature importance from high to low adding explainability to our threat detection model. 
            <br></br><br></br>Features that contribute to a prediction being anomalous have a highly positive Custos score. Features that contribute to a prediction not being anomalous have a negative Custos score. Features with a score close to zero do not influence the prediction one way or another.</p>

            <div style={{display: "flex", flexDirection: "row"}}>
                {scores.length > 0 && <ShapValueChart data={scores} header={"Custos Scores"}></ShapValueChart>}
                <EventProfile match={parseInt(props.match.params.eventId)}></EventProfile>
            </div>
            {rows.length > 0 && <DataTable rows={getRelatedEvents(rows, rows[parseInt(props.match.params.eventId)].time)} columns={columns} header={"Related Events"}></DataTable>}

        </Sidebar>
    )
}

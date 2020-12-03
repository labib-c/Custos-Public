import React from 'react'
import Sidebar from '../Components/Sidebar'
import ShapValueChart from '../Components/ShapValueChart'
import DataTable from '../Components/DataTable'
import {shapData} from '../mockData/shapData'
import {rows, columns} from './../mockData/tableData';
import { makeStyles } from '@material-ui/core/styles';
import {getCustosScore} from './../util/firebaseHelpers'

const useStyles = makeStyles({
    header: {
        paddingLeft: "15px"
    }
});

export default function EventAlert(props) {
    const classes = useStyles()
    const [scores, setScores] = React.useState([])
    React.useEffect(() => {
        document.title = `Custos | Alert: ${props.match.params.eventId}`;
        document.body.style.backgroundColor = "#F4F4F3"
        async function custosScore() {
            let data = await getCustosScore(props.match.params.eventId)
            setScores(data)
        }
        custosScore()

      }, [props.match.params.eventId]);

    return (
        <Sidebar>
            <h1 className={classes.header}>Event Key: {props.match.params.eventId}</h1>
            <p className={classes.header} >Custos scores are a unique value that allows analysts to determine what features have contributed most to a security alert. Our threat detection model uses an autoencoder to detect anomalous behaviour amongst our feature inputs which then triggers an alert. 
            <br></br>We compute the unique SHAP values for all features for each prediction made and then aggregate and scale those values to generate our custom Custos score. This score is then used to rank the feature importance from high to low adding explainability to our threat detection model. 
            <br></br><br></br>Features that contribute to a prediction being anomalous have a highly positive Custos score. Features that contribute to a prediction not being anomalous have a negative Custos score. Features with a score close to zero do not influence the prediction one way or another.</p>
            {scores.length > 0 && <ShapValueChart data={scores} header={"Custos Scores"}></ShapValueChart>}
            <DataTable rows={rows} columns={columns} header={"Related Events"}></DataTable>

        </Sidebar>
    )
}

import React from 'react'
import {getData} from '../util/firebaseHelpers'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        height: "20em",
        width: "30em",
        padding: "10px",
        paddingTop: "20px",
        margin: "15px"
    },
    item: {
        display: "flex"
    }
});

export default function EventProfile(props) {
    const [event, setEvent] = React.useState()
    const classes = useStyles()
    React.useEffect(() => {
        async function data(){
            let data = await getData()
            data.map((item) => {
                if (parseInt(item.key) === props.match){
                    setEvent(item)
                }
            })
        }
        data()
    }, [])

    return (
        <div>
            {event && 
            <Paper className={classes.root} variant={'outlined'}>
                
                <div className={classes.item}><strong>Auth Orientation:</strong> {event['authentication orientation']}</div>
                <br></br>
                <div className={classes.item}><strong>Auth Type:</strong> {event['authentication type']}</div>
                <br></br>
                <div className={classes.item}><strong>Dest. Computer:</strong> {event['destination computer']}</div>
                <br></br>
                <div className={classes.item}><strong>Dest. User:</strong> {event['destination user@domain']}</div>
                <br></br>
                <div className={classes.item}><strong>Logon Type:</strong> {event['logon type']}</div>
                <br></br>
                <div className={classes.item}><strong>Source Computer:</strong> {event['source computer']}</div>
                <br></br>
                <div className={classes.item}><strong>Source User:</strong> {event['source user@domain']}</div>
                <br></br>
                <div className={classes.item}><strong>Success/Fail:</strong> {event['success/failure']}</div>
                <br></br>
                <div className={classes.item}><strong>Time:</strong> {event['time']}</div>
            </Paper>}
        </div>
    )
}

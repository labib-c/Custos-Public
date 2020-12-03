import React from 'react'
import {getData} from '../util/firebaseHelpers'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        height: "27em",
        width: "40em",
        padding: "30px",
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
                return 0
            })
        }
        data()
    }, [props.match])

    return (
        <div>
            {event && 
            <Paper className={classes.root} variant={'outlined'}>
                
                <div className={classes.item}><strong>Auth Orientation: &nbsp;</strong> {event['authentication orientation']}</div>
                <br></br>
                <div className={classes.item}><strong>Auth Type: &nbsp;</strong> {event['authentication type']}</div>
                <br></br>
                <div className={classes.item}><strong>Dest. Computer: &nbsp;</strong> {event['destination computer']}</div>
                <br></br>
                <div className={classes.item}><strong>Dest. User: &nbsp;</strong> {event['destination user@domain']}</div>
                <br></br>
                <div className={classes.item}><strong>Logon Type: &nbsp;</strong> {event['logon type']}</div>
                <br></br>
                <div className={classes.item}><strong>Source Computer: &nbsp;</strong> {event['source computer']}</div>
                <br></br>
                <div className={classes.item}><strong>Source User: &nbsp;</strong> {event['source user@domain']}</div>
                <br></br>
                <div className={classes.item}><strong>Success/Fail: &nbsp;</strong> {event['success/failure']}</div>
                <br></br>
                <div className={classes.item}><strong>Time: &nbsp;</strong> {event['time']}</div>
            </Paper>}
        </div>
    )
}

import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        height: "30em",
        width: "60em",
        padding: "10px",
        margin: "15px",
    }
});

export default function ShapValueChart(props) {
    const classes = useStyles()
    const getColour = value => value > 0 ? '#abc5fe' : '#ff6961';
    return (
        <Paper className={classes.root} variant="outlined">
            <h2 style={{textAlign: 'left'}} > {props.header} </h2>
            <ResponsiveBar
                data={props.data.sort((a,b) => (a.ShapValue > b.ShapValue ? -1 : 1))}
                keys={["ShapValue"]}
                indexBy={"featureName"}
                margin={{right: 130, bottom: 100, left: 130 }}
                padding={0.3}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={d => getColour(d.value)}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Custos Score',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Feature Name',
                    legendPosition: 'middle',
                    legendOffset: -120
                }}
                enableGridX={true}
                enableGridY={false}
                gridXValues={[0]}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </Paper>
    )
}

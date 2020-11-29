import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ResponsiveLine } from '@nivo/line'

const useStyles = makeStyles({
    root: {
        height: "30em",
        width: "45em",
        padding: "10px",
        margin: "15px",
    }
});

export default function TimeSeries(props) {
    const classes = useStyles()
    const [filter, setFilter] = React.useState("1m")

    const handleToggle = (event) => {
        setFilter(event.currentTarget.value)
    }

    const selectData = (data) => {
        switch(filter) {
            case "1m": {
                return data.slice(2);
            }
            case "6m": {
                return data.slice(0,4);
            }
            case "1y": {
                return data;
            }
            default: {
                return data;
            }
        }
    }
    return(
        <Paper className={classes.root} variant="outlined">
            <h2 style={{textAlign: 'left'}} > Activity  
            <ButtonGroup style={{display: "flex"}} size="small" aria-label="small outlined button group">
                <Button aria-label="one month" disabled={filter === '1m'} value="1m" onClick={e => {handleToggle(e)}}>1M</Button>
                <Button aria-label="six months" disabled={filter === '6m'} value="6m" onClick={e => {handleToggle(e)}}>6M</Button>
                <Button aria-label="one year" disabled={filter === '1y'} value="1y" onClick={e => {handleToggle(e)}}>1Y</Button>
            </ButtonGroup>
            </h2>
            <div style={{height: "80%", width: "100%"}}>
            <ResponsiveLine
                data={selectData(props.data)}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'category10' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
            </div>
        </Paper>)
}
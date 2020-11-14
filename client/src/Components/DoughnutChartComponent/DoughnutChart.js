import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ResponsivePie } from '@nivo/pie'

const useStyles = makeStyles({
    root: {
        height: "30em",
        width: "30em",
        padding: "10px",
        margin: "15px",
    }
});

export default function Doughnut(props) {
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
            <h2 style={{textAlign: 'left'}} > Distribution
            <ButtonGroup style={{display: "flex"}} size="small" aria-label="small outlined button group">
                <Button disabled={filter == '1m'} value="1m" onClick={e => {handleToggle(e)}}>1M</Button>
                <Button disabled={filter == '6m'} value="6m" onClick={e => {handleToggle(e)}}>6M</Button>
                <Button disabled={filter == '1y'} value="1y" onClick={e => {handleToggle(e)}}>1Y</Button>
            </ButtonGroup>
            </h2>
            <div style={{height: "80%", width: "100%"}}>
            <ResponsivePie
                data={selectData(props.data)}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                startAngle={-4}
                sortByValue={true}
                innerRadius={0.55}
                padAngle={4}
                colors={{ scheme: 'pastel1' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
            </div>
        </Paper>)
}
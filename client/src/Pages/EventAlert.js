import React from 'react'
import Sidebar from '../Components/Sidebar'
import ShapValueChart from '../Components/ShapValueChart'
import DataTable from '../Components/DataTable'
import {shapData} from '../mockData/shapData'
import {rows, columns} from './../mockData/tableData';

export default function EventAlert(props) {

    return (
        <Sidebar>
            <h1 style={{paddingLeft: "15px"}}>Event: {props.match.params.eventId}</h1>
            <ShapValueChart data={shapData} header={"SHAP Scores"}></ShapValueChart>
            <DataTable rows={rows} columns={columns} header={"Related Events"}></DataTable>

        </Sidebar>
    )
}

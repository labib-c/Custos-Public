import React from 'react';
import logo from './logo.svg';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Sidebar from "./Components/SideBarComponent/Sidebar"
import DataTable from "./Components/TableComponent/DataTable"
import TimeSeries from "./Components/TimeSeriesComponent/TimeSeriesChart"
import './App.css';
import {data} from './mockData/timeData'
import {rows, columns} from './mockData/tableData'

Sentry.init({
  dsn: "https://5dbbf50c14ee4124ad7a7e5124be414a@o358880.ingest.sentry.io/5450618",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

function App() {
  return (
    <div className="App">
      <Sidebar>
        <TimeSeries data={data}></TimeSeries>
        <DataTable rows={rows} columns={columns}></DataTable>
      </Sidebar>
    </div>
  );
}

export default App;

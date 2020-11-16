import React from 'react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import './App.css';
import Dashboard from "./Pages/Dashboard";


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
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;

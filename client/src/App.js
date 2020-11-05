import React from 'react';
import logo from './logo.svg';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Sidebar from "./Components/SideBarComponent/Sidebar"
import './App.css';

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

      </Sidebar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Custos Web Application
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

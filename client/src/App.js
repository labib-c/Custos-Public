import React from 'react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter, 
  useLocation
} from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard";
import Sidebar from './Components/SideBarComponent/Sidebar';


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
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/data" exact component={Dashboard}></Route>
        <Route path="/alerts" exact component={Home}></Route>
        <Route path="/stat" exact component={Home}></Route>
        <Route path="/profile" exact component={Home}></Route>
        <Route path="/alerts/:eventId" component={withRouter(Event)}></Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return(
    <Sidebar></Sidebar>
  )
}

function Event(props) {
  const location = useLocation();
  return(
    <Sidebar>
      {location.pathname}
    </Sidebar>
  )
}
export default App;

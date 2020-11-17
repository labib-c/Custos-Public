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
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import { AuthProvider } from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRouteComponent/PrivateRoute'

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
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Home}></PrivateRoute>
          <Route path="/signup" exact component={SignupPage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
          <PrivateRoute path="/data" exact component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/alerts" exact component={Home}></PrivateRoute>
          <PrivateRoute path="/stat" exact component={Home}></PrivateRoute>
          <PrivateRoute path="/profile" exact component={Home}></PrivateRoute>
          <PrivateRoute path="/alerts/:eventId" component={withRouter(Event)}></PrivateRoute>
        </Switch>
      </AuthProvider>
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

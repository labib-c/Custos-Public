import React from 'react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard";
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import DataPage from './Pages/DataPage';
import AlertsPage from './Pages/AlertsPage';
import StatsPage from './Pages/StatsPage';
import EventAlert from './Pages/EventAlert';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

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
          <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>
          <Route path="/signup" exact component={SignupPage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
          <PrivateRoute path="/data" exact component={DataPage}></PrivateRoute>
          <PrivateRoute path="/alerts" exact component={AlertsPage}></PrivateRoute>
          <PrivateRoute path="/stat" exact component={StatsPage}></PrivateRoute>
          <PrivateRoute path="/profile" exact component={ProfilePage}></PrivateRoute>
          <PrivateRoute path="/alerts/:eventId" component={withRouter(EventAlert)}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

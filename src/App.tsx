import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { SurveyDataPage } from "./Data";
import Survey from "./Survey";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact={true} path="/">
            <Survey />
          </Route>
          <Route exact={true} path="/data">
            <SurveyDataPage />
          </Route>
        </Switch>
    </Router>
  );
}
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../component";
import { Login } from "../Page";
import MainApp from "../MainApp";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <MainApp />{" "}
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

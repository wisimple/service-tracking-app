import React from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "pages/Website";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "pages/Website";
import Dashboard from "pages/Dashboard";
import Signin from "pages/Signin";
import PrivateRoute from "PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="*" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;

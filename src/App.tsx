import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import LandingPage from "pages/Website";
import Dashboard from "pages/Dashboard";
import Signin from "pages/Signin";
import PrivateRoute from "PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "store";

function App() {
  const token = useSelector((state: RootState) => state.userState.token);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin">
          {token ? <Redirect to="/dashboard" /> : <Signin />}
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="*" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;

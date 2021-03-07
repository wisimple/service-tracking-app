import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "pages/Website";
import Dashboard from "pages/Dashboard";
import Signin from "pages/Signin";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;

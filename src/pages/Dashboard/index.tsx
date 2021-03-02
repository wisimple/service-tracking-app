import DashboardLayout from "layouts/DashboardLayout";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Summary from "pages/Dashboard/Summary";
import TechnicalService from "pages/Dashboard/TechnicalService";
import TechnicalServiceCreate from "pages/Dashboard/TechnicalService/Create";

import Settings from "pages/Dashboard/Settings";
import Customers from "pages/Dashboard/Customer";

const Dashboard = () => {
  const { url } = useRouteMatch();
  return (
    <DashboardLayout>
      <Route path={url}>
        <Switch>
          <Route path={`${url}/settings`} component={Settings} />
          <Route path={`${url}/technical-service/create`} component={TechnicalServiceCreate} />
          <Route path={`${url}/technical-service`} component={TechnicalService} />
          <Route path={`${url}/customers`} component={Customers} />
          <Route path={`${url}`} component={Summary} />
        </Switch>
      </Route>
    </DashboardLayout>
  );
};

export default Dashboard;

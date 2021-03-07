import DashboardLayout from "layouts/DashboardLayout";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Summary from "pages/Dashboard/Summary";

import TechnicalServiceList from "pages/Dashboard/TechnicalService/List";
import TechnicalServiceCreate from "pages/Dashboard/TechnicalService/Create";
import TechnicalServiceShow from "pages/Dashboard/TechnicalService/Show";

import CustomersList from "pages/Dashboard/Customer/List";
import CustomerCreate from "pages/Dashboard/Customer/Create";
import CustomerShow from "pages/Dashboard/Customer/Show";

import Settings from "pages/Dashboard/Settings";

const Dashboard = () => {
  const { url } = useRouteMatch();
  return (
    <DashboardLayout>
      <Route path={url}>
        <Switch>
          <Route exact path={`${url}`} component={Summary} />

          <Route exact path={`${url}/technical-service`} component={TechnicalServiceList} />
          <Route exact path={`${url}/technical-service/create`} component={TechnicalServiceCreate} />
          <Route exact path={`${url}/technical-service/:id`} component={TechnicalServiceShow} />

          <Route exact path={`${url}/customers`} component={CustomersList} />
          <Route exact path={`${url}/customers/create`} component={CustomerCreate} />
          <Route path={`${url}/customers/:id`} component={CustomerShow} />

          <Route path={`${url}/settings`} component={Settings} />
        </Switch>
      </Route>
    </DashboardLayout>
  );
};

export default Dashboard;

import DashboardLayout from "layouts/DashboardLayout";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Summary from "pages/Dashboard/Summary";

import TechnicalServiceList from "pages/Dashboard/TechnicalService/List";
import TechnicalServiceCreate from "pages/Dashboard/TechnicalService/Create";
import TechnicalServiceShow from "pages/Dashboard/TechnicalService/Show";

import CustomersList from "pages/Dashboard/Customer/List";
import CustomerCreate from "pages/Dashboard/Customer/Create";
import CustomerShow from "pages/Dashboard/Customer/Show";
import CustomerEdit from "pages/Dashboard/Customer/Edit";

import InventoryList from "pages/Dashboard/Inventory/List";

import ShowcaseList from "pages/Dashboard/Showcase/List";

import Settings from "pages/Dashboard/Settings";

const Dashboard = () => {
  const { url } = useRouteMatch();
  return (
    <DashboardLayout>
      <Route path={url}>
        <Switch>
          <Route exact path={`${url}`} component={Summary} />

          <Route exact path={`${url}/technical-services`} component={TechnicalServiceList} />
          <Route exact path={`${url}/technical-services/create`} component={TechnicalServiceCreate} />
          <Route exact path={`${url}/technical-services/:id`} component={TechnicalServiceShow} />

          <Route exact path={`${url}/customers`} component={CustomersList} />
          <Route exact path={`${url}/customers/create`} component={CustomerCreate} />
          <Route path={`${url}/customers/:id/edit`} component={CustomerEdit} />
          <Route path={`${url}/customers/:id`} component={CustomerShow} />

          <Route path={`${url}/inventory`} component={InventoryList} />
          <Route path={`${url}/showcase`} component={ShowcaseList} />

          <Route path={`${url}/settings`} component={Settings} />
        </Switch>
      </Route>
    </DashboardLayout>
  );
};

export default Dashboard;

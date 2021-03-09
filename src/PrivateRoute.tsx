import React from "react";
import { useSelector } from "react-redux";
import { RouteProps, Route, Redirect } from "react-router";
import { RootState } from "store";

interface Props extends RouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
  const token = useSelector((state: RootState) => state.userState.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? children : <Redirect to={{ pathname: "/signin", state: { from: location } }} />
      }
    />
  );
};

export default PrivateRoute;

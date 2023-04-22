/* eslint-disable react/jsx-no-undef */
import React from "react";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import { Auth, Private } from "./Router";

import { AuthRoute, PrivateRoute } from "./AllRoute";
import NotFound from "../pages/NotFound";
import { useSelector } from "react-redux";
import Layout from "../containers/Layout";


export const history = createBrowserHistory();


const RouterConfig = () => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <Router history={history}>
      <Switch>
        {Auth.map((R, k) => {
          return <AuthRoute key={k} {...R} />;
        })}
        {/* {Public.map((R, k) => {
          return <PublicRoute key={k} {...R} />;
        })} */}
        {!isAuthenticated ? <Redirect to="/" /> : <BasePage />}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export const AppRouter = RouterConfig;

const BasePage = () => {
  // const role = useSelector((state) => state?.auth?.user?.role);
  // let redirectUrl = null;
  // const roles = [UserRole.User, UserRole.MTGroup, UserRole.ContractorPM, UserRole.ContractorRequestor];
  // if (roles.includes(role)) {
  //   redirectUrl = "/permits";
  // }

  return (
    <Layout>
      <Switch>
        {/* {redirectUrl && <Redirect exact from="/" to={redirectUrl} />} */}
        {Private.map((R, k) => {
          return <PrivateRoute key={k} {...R} />;
        })}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

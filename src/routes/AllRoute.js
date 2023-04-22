import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthLayout } from "../containers";

// auth component
export const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route
      {...rest}
      component={(props) => (
        <AuthLayout>
          <Component {...props} />
        </AuthLayout>
      )}
    />
  );
};

// authenticated route
export const PrivateRoute = ({
  component: Component,
  role: Role = [],
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const { role } = useSelector((state) => state.auth?.user);
  const AuthorizedPage = () => {
    if (Role.includes(role)) {
      return (
        <Route {...rest} component={(props) => <Component {...props} />} />
      );
    } else {
      return <Redirect to="/404" />;
    }
  };
  return isAuthenticated ? (
    <AuthorizedPage />
  ) : (
    <AuthLayout>
      <Redirect to="/" from={rest.path} />
    </AuthLayout>
  );
};
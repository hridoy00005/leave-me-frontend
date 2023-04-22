import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import { apollo } from "../graphql";
import { store } from "../store";
import AppRouter from "../routes";

import "antd/dist/antd.min.css";
import "../styles/index.scss";

const CustomApp = () => (
  <ApolloProvider client={apollo}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ApolloProvider>
);

export default CustomApp;

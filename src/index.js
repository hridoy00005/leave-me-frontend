import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/_app";
import * as serviceWorker from "./serviceWorker";

// __DEV__ Not found issue fixed
global.__DEV__ = true;

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();

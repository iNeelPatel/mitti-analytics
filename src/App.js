import React from "react";
import NavRoute from "./config/navRoute";
import "antd/dist/antd.css";
import { HashRouter, Route } from "react-router-dom";
import "./index.css";

var Parse = require("parse");
Parse.initialize(
  "mitti-backend",
  "vMvvybc1z4*Q$!J*k4P4NNx",
  "vMvvybc1z4*Q$!J*k4P4NNx"
);
Parse.serverURL = "https://mitti-backend-monorepo.herokuapp.com/api";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact component={NavRoute} />
      <Route path="/chart" component={NavRoute} />
    </HashRouter>
  );
}

export default App;

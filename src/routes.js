import React from "react";
import {Route, Switch} from "react-router-dom";
import Main from "./components/Main";
import Favor from "./components/Favor";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/favorites" component={Favor} />
  </Switch>
)

export default Routes

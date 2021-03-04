import { Switch, Route } from "react-router-dom";
import React from "react";

import Form from "./Form";
import Dashboard from "./Dashboard";

const ComponentRouting = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/log"
          render={(props) => <Form {...props} type="login" />}
        />
        <Route
          exact
          path="/reg"
          render={(props) => <Form {...props} type="register" />}
        />
        <Route exact path="/user/:user" component={Dashboard} />
        <Route path="/" render={(props) => <h1>Hello Guest User</h1>} />
      </Switch>
    </div>
  );
};

export default ComponentRouting;

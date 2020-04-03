/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { createStore } from 'redux'
import allReducers from './reducers';
import { Provider } from 'react-redux'


// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import SignIn from "views/SignIn/SignIn"
import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();
const store = createStore(allReducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/console" component={Admin} />
        <Route exact={true} path="/sign-in" component={SignIn}/>
        {/* <Route path="/rtl" component={RTL} /> */}
        <Redirect from="/" to="/console/dashboard" />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById("root")
);

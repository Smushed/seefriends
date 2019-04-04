import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import * as Routes from './constants/Routes';

import "./App.css";
import Home from './components/Home';
import NotFound from './components/404';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      currentUser: {}
    }

  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={Routes.home}
            render={() =>
              <Home />}
          />
          <Route
            path={Routes.signin}
            render={() =>
              <SignIn />}
          />
          <Route
            path={Routes.signup}
            render={() =>
              <SignUp />}
          />
          <Route
            path='/*'
            render={() =>
              <NotFound />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

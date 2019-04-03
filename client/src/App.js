import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, BrowserRouter } from 'react-router-dom';
import * as Routes from './constants/Routes';

import "./App.css";
import Home from './components/Home';
import SignUp from './componenets/SignUp';
import SignIn from './componenets/SignIn';

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
        <Route
          exact path={Routes.home}
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
      </BrowserRouter>
    );
  }
}

export default App;

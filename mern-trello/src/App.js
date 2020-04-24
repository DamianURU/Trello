import Main from "./components/welcomepage/homepage.component"
import Home from "./components/dashboard/home.component"
import GlobalStyle from './styles/Global';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



export default function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route path="/home">
            <Home/>
          </Route>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </div>
      <GlobalStyle/>
    </Router>
  );
}
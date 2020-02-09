import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

// import Bill from './components/Bills/bill';
import Home from './components/Home/Home';
import BillBuilder from './components/BillBuilder/BillBuilder';
import Biller from './components/Biller/Biller'

class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/build">
            <BillBuilder />
          </Route>
          <Route path="/bill">
            <Biller />
          </Route>
        </Switch>
        {/* <Bill/> */}
      </div>
      </Router>
    );
  }
}

export default App;

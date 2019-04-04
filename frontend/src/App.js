import React, { Component } from 'react';
import './App.css';
import Supplies from './Components/Supplies/Supplies';
import Redirect from 'react-router-dom'

import {
BrowserRouter as Router,
Route,
Link
} from 'react-router-dom';

import Authentication from './Authentication';

class App extends Component {
render() {
    return (
        <Router>
         <div className="App">
          <Switch>
          <Route exact path="/Authentication" component={Authentication} />
          <Route exact path="/Supplies" component={Supplies} />
          </Switch>
         </div>
        </Router>
        );
    }
}

export default App;

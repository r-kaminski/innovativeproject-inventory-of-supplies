import React, { Component } from 'react';
import './App.css';
import Supplies from './Components/Supplies/Supplies';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Authentication from './Authentication';

class App extends Component {
render() {
    return (
        <Router>
         <div className="App">
          <Route exact path="/Authentication" component={Authentication} />
          <Route exact path="/Supplies" component={Supplies} />
         </div>
        </Router>
        );
    }
}

export default App;

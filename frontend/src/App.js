import React, { Component } from 'react';

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
         <div className="container">
          <Route exact path="/Authentication" component={Authentication} />
         </div>
        </Router>
        );
    }
}

export default App;

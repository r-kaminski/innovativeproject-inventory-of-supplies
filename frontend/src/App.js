import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Authentication from './Authentication';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path="/Authentication" component={Authentication} />
                        <Redirect from="/" to="/Authentication" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

import React, { Component } from 'react';
import { SnackbarProvider } from 'notistack';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Authentication from './Authentication';

class App extends Component {
    render() {
        return (
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <div className="container">
                        <Switch>
                            <Route path="/Authentication" component={Authentication} />
                            <Redirect from="/" to="/Authentication" />
                        </Switch>
                    </div>
                </Router>
            </SnackbarProvider>
        );
    }
}

export default App;

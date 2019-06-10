import React, { Component } from 'react';
import { SnackbarProvider } from 'notistack';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Supplies from './Components/Supplies/Supplies';
import Authentication from './Components/Authentication/Authentication';
import Reports from './Components/Reports/Reports';
import ReportDetails from './Components/ReportDetails/ReportDetails';
import PrintView from './Components/Printing/PrintView';
import AdminPanel from './Components/Admin/AdminPanel';
import Backup from './Components/Admin/Backup/Backup';

class App extends Component {
    render() {
        return (
            <SnackbarProvider maxSnack={4}>
                <Router>
                    <Switch>
                        <Route path="/Authentication" component={Authentication} />
                        <Redirect exact from="/" to="/Authentication" />
                    </Switch>
                    <Route exact path="/Supplies" component={Supplies} />
                    <Route exact path="/Reports" component={Reports} />
                    <Route exact path="/ReportDetails/:report_id" component={ReportDetails} />
                    <Route exact path="/Printing" component={PrintView} />
                    <Route exact path="/Admin" component={AdminPanel} />
                    <Route exact path="/Backup" component={Backup} />
                </Router>
            </SnackbarProvider>
        );
    }
}

export default App;

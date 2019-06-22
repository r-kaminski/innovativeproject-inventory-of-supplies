import React from 'react';
import styles from './AdminPanel.module.css';
import { withSnackbar } from 'notistack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackupIcon from '@material-ui/icons/Backup';
import ImportIcon from '@material-ui/icons/ImportExport';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import ButtonImportCSV from './CsvBackup/ButtonImportCSV';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';

class AdminPanel extends React.Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <header>
                    MAKERSPACE
                </header>

                <List component="nav" className={styles.list} aria-label="Contacts">
                    <ListItem button onClick={() => this.props.history.push('backup')}>
                        <ListItemText primary="Backup" />
                        <ListItemIcon>
                            <BackupIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push('CsvBackup')}>
                        <ListItemText primary="Import CSV" />
                        <ListItemIcon>
                            <ImportIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={this.props.history.goBack}>
                        <ListItemIcon>
                            <BackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Go back" />
                    </ListItem>
                </List>
            </div>
        );
    };
}

export default withSnackbar(AdminPanel);
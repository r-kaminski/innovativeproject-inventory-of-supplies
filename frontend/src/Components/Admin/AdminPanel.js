import React from 'react';
import styles from './AdminPanel.module.css';
import { withSnackbar } from 'notistack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackupIcon from '@material-ui/icons/Backup';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BackIcon from "@material-ui/icons/KeyboardBackspace";


class AdminPanel extends React.Component {

    render() {

        return (
            <div className={styles.wrapper}>
                <header>
                    MAKERSPACE
                </header>

                <List component="nav" className={styles.list} aria-label="Contacts">
                    <ListItem button onClick={() => this.props.history.push('backup')}>
                        <ListItemIcon>
                            <BackupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Backup" />
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
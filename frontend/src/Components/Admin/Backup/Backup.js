import React from 'react';
import styles from './Backup.module.css';
import { withSnackbar } from 'notistack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import BackupService from '../../../services/backupService';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreateBackupDialog from './CreateBackupDialog';

class Backup extends React.Component {

    state = {
        data: [],
        showForm: false,
    }

    async fetchData() {
        let response = await BackupService.getBackups();
        this.setState({ data: response.data });
    }

    componentWillMount() {
        this.fetchData();
    }

    async createBackup() {
        await BackupService.createBackup();
        this.fetchData();
        this.setState({ showForm: false });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <header>
                    MAKERSPACE
                </header>

                <List
                    subheader={
                        <ListSubheader component="div">
                            <IconButton onClick={this.props.history.goBack}>
                                <BackIcon />
                            </IconButton>
                            Backups
                            <Tooltip className={styles.button} title={"Create new"}>
                                <IconButton onClick={() => this.setState({ showForm: true })}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </ListSubheader>}
                    component="nav"
                    className={styles.list}
                    aria-label="Contacts">
                    {this.state.data.map((row, idx) => {
                        return <ListItem button key={idx}><ListItemText primary={row.name} secondary={new Date(row.date).toLocaleDateString(undefined, {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })} /></ListItem>
                    })}
                </List>

                <CreateBackupDialog onAccept={this.createBackup.bind(this)} onDeny={() => { this.setState({ showForm: false }) }} open={this.state.showForm} />

            </div>
        );
    };
}

export default withSnackbar(Backup);
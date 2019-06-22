import React from 'react';
import styles from './CsvBackup.module.css';
import { withSnackbar } from 'notistack';
import ButtonImportCSV from './ButtonImportCSV';
import {
    Paper,
    Button,
    ListItemText,
    ListItem,
    ListItemIcon
} from '@material-ui/core';
import { importCSV } from '../../../services/inventoryService';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import SendCsvDialog from './SendCsvDialog';

class Backup extends React.Component {
    state = {
        file: null,
        showForm: false
    };

    handleButtonClick() {
        if (this.state.file === null) {
            this.props.enqueueSnackbar('No file selected', {
                variant: 'error'
            });
        } else {
            this.setState({ showForm: true });
        }
    }

    async sendFile() {
        if (this.state.file === null) {
            this.props.enqueueSnackbar('No file selected', {
                variant: 'error'
            });
        } else {
            try {
                let response = await importCSV(this.state.file);
                if (response.status !== 201) {
                    this.props.enqueueSnackbar('Error while sending csv file', {
                        variant: 'error'
                    });
                } else {
                    this.props.enqueueSnackbar('Success', { variant: 'info' });
                }
            } catch (error) {
                this.props.enqueueSnackbar('Error while sending csv file', {
                    variant: 'error'
                });
            }
        }
        this.setState({ showForm: false });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <header>MAKERSPACE</header>
                <Paper className={styles.paper}>
                    <div>
                        <ButtonImportCSV
                            onSelect={file => this.setState({ file: file })}
                        />
                    </div>
                    <Button onClick={this.handleButtonClick.bind(this)}>
                        Send
                    </Button>
                    <ListItem button onClick={this.props.history.goBack}>
                        <ListItemIcon>
                            <BackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Go back" />
                    </ListItem>
                </Paper>
                <SendCsvDialog
                    onAccept={this.sendFile.bind(this)}
                    onDeny={() => {
                        this.setState({ showForm: false });
                    }}
                    open={this.state.showForm}
                />
            </div>
        );
    }
}

export default withSnackbar(Backup);

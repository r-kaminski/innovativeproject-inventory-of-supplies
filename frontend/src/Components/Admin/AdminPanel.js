import React from 'react';
import styles from './AdminPanel.module.css';
import { withSnackbar } from 'notistack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackupIcon from '@material-ui/icons/Backup';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import ButtonImportCSV from '../Supplies/ButtonImportCSV/ButtonImportCSV';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';

class AdminPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      snackbarMessage: "",
      snackbarVariant: "",
    }
  }

  snackbarMessage(message, variant) {
    this.setState({
      snackbarMessage: message,
      snackbarVariant: variant,
      openSnackbar: true
    });
  }


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
                    <ListItem >
                        <ListItemText primary="Import CSV" />
                        <ButtonImportCSV
                            onFailure={ () => this.setState({
                              snackbarMessage: 'Wrong file format! Input CSV.',
                              snackbarVariant: 'error',
                              openSnackbar: true
                            })}
                            onSuccess={ () => this.setState({
                              snackbarMessage: 'Database populated!',
                              snackbarVariant: 'success',
                              openSnackbar: true
                            })}
                        />

                    </ListItem>
                    <ListItem button onClick={this.props.history.goBack}>
                        <ListItemIcon>
                            <BackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Go back" />
                    </ListItem>
                </List>
                
                <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.openSnackbar}
                autoHideDuration={4000}
                onClose={() => this.setState({ openSnackbar: false })}
                >
                <SnackbarContentWrapper
                    onClose={() => this.setState({ openSnackbar: false })}
                    variant={this.state.snackbarVariant}
                    message={this.state.snackbarMessage}
                />
                </Snackbar>
            </div>
        );
    };
}

export default withSnackbar(AdminPanel);
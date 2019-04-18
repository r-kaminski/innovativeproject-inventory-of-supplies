import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AfterPrintDialog extends React.Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Printing finished</DialogTitle>
                <DialogContent>
                    <h5>Do you want to clear current printing queue?</h5>
                    <Button onClick={this.props.onAccept} color="primary">yes</Button>
                    <Button onClick={this.props.onDeny} color="secondary">no</Button>
                </DialogContent>
            </Dialog>
        );
    }
}
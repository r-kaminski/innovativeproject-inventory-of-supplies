import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AfterPrintDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Printing finished</DialogTitle>
            <DialogContent>
                <h5>Do you want to clear current printing queue?</h5>
                <Button onClick={props.onAccept} color="primary">yes</Button>
                <Button onClick={props.onDeny} color="secondary">no</Button>
            </DialogContent>
        </Dialog>
    );
}
export default AfterPrintDialog;
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class LoadingDialog extends React.Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Generating QR codes</DialogTitle>
                <DialogContent>
                    <img src="http://oh.no.ms/dog.gif" width="200px" />
                </DialogContent>
            </Dialog>
        );
    }
}
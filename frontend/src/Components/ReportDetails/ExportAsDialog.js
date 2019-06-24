import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ExportAsDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Export as...</DialogTitle>
            <DialogContent>
                <h5>To which format do you want to export?</h5>
                <Button onClick={props.exit} download={`report_${props.reportId}`} href={props.pdf} color="primary">PDF</Button>
                <Button onClick={props.exit} download={`report_${props.reportId}.csv`} href={props.csv} color="primary">CSV</Button>
                <Button onClick={props.exit} color="secondary">cancel</Button>
            </DialogContent>
        </Dialog>
    );
}
export default ExportAsDialog;
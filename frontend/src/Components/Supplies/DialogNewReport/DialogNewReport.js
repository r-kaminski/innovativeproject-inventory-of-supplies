import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './DialogNewReport.module.css';
import { createReport } from '../../../services/inventoryService';

export default class DialogNewReport extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name : '',
      //date: null,
    }
  }

  onChangeHandler = (event, propName) => {
    switch(propName){
      case "name":
        this.setState({name : event.target.value})
        break;

      // case "date":
      //   this.setState({date : event.target.value})
      //   break;

      default:
        //do sth
        break;
    }
  }

  clearState = ()=>{
    this.setState({
      name : '',
      //date : null,
    })
  };

  onClickCreate = () => {
    let item = {
      name : this.state.name,
      //date : this.state.date,
    }

    createReport(item)
      .then((res)=>{
        this.props.onSuccess(res.data);
      })
      .catch((error)=>{
        this.props.onFailure();
        console.error(error)
      });

    this.clearState();
    this.props.onCancel();
  }

  render() {
    return (
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New report</DialogTitle>
          <DialogContent>
            <div className={styles.dialogContentWrapper}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Report name"
                variant="outlined"
                value={this.state.name}
                onChange={(event) => this.onChangeHandler(event, "name")}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onClickCreate}  color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

DialogNewReport.defaultProps = {
  open : false,
  onSuccess : () => void(0),
  onFailure : () => void(0),
  onCancel : () => void(0)
}
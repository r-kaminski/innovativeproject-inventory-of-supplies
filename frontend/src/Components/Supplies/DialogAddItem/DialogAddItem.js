import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './DialogAddItem.module.css';
import { insertItem } from '../../../services/inventoryService';

export default class DialogAddItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name : '',
      state : '',
      description : ''
    }
  }

  onChangeHandler = (event, propName) => {
    switch(propName){
      case "name":
        this.setState({name : event.target.value})
        break;

      case "state":
        this.setState({state : event.target.value})
        break;

      case "description":
        this.setState({description : event.target.value})
        break;

      default:
        //do sth
        break;
    }
  }

  clearState = ()=>{
    this.setState({
      name : '',
      state : '',
      description : ''
    })
  };

  onClickAdd = () => {
    let item = {
      name : this.state.name,
      state : this.state.state,
      description: this.state.description
    }

    insertItem(item)
      .then((res)=>{
        this.props.onSuccess();
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
          <DialogTitle id="form-dialog-title">Nowy element</DialogTitle>
          <DialogContent>
            <div className={styles.dialogContentWrapper}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nazwa"
                variant="outlined"
                value={this.state.name}
                onChange={(event) => this.onChangeHandler(event, "name")}
              />
              <TextField
                margin="dense"
                id="state"
                label="Stan"
                variant="outlined"
                value={this.state.state}
                onChange={(event) => this.onChangeHandler(event, "state")}
              />
              <TextField
                margin="dense"
                id="description"
                label="Opis"
                variant="outlined"
                value={this.state.description}
                onChange={(event) => this.onChangeHandler(event, "description")}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onClickAdd}  color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

DialogAddItem.defaultProps = {
  open : false,
  onSuccess : () => void(0),
  onFailure : () => void(0),
  onCancel : () => void(0)
}
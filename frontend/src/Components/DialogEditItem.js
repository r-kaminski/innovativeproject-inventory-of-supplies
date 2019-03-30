import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './DialogEditItem.module.css';
import { partialUpdateItem } from '../DummyInventoryApi';

class DialogEditItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: '',
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
  };

  onClickUpdate = () => {
    let itemBody = {
      name : this.state.name,
      state : this.state.state,
      description: this.state.description
    }

    partialUpdateItem(this.props.item.id, itemBody).then(()=>{this.props.onUpdateSuccess()})
    .catch((err)=>{this.props.onUpdateFail(); console.error(err)});

    this.props.onCancel()
  };

  onEnterPrepareView = () => {
    this.setState(this.props.item);
  }

  render() {
    return (
        <Dialog
          open={this.props.open}
          onEnter={this.onEnterPrepareView}
          onClose={this.props.onClosing}
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
              Anuluj
            </Button>
            <Button onClick={this.onClickUpdate}  color="primary">
              Zapisz
            </Button>
          </DialogActions>

        </Dialog>
    );
  }
}

DialogEditItem.defaultProps = {
  open : false,
  item: {name:"spoko", state:"tak", descrition: "ok"},
  onClosing : ()=>void(0),
  onUpdateSuccess : ()=>void(0),
  onUpdateFail : ()=>void(0),
  onCancel : ()=>void(0),
}

export default DialogEditItem;
import React from "react";
import Input from '@material-ui/core/Input';
import Tooltip from "@material-ui/core/Tooltip";
import ImportCSVIcon from "@material-ui/icons/Input";
import { importCSV } from '../../../services/inventoryService';
import AdminPanel from '../../Admin/AdminPanel'

class ButtonImportCSV extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
  }

  render() {
    return (
        <Input
          type="file"
          placeholder="xd"
          onChange={event => {
            if (event.target.files) {
              importCSV(event.target.files[0]).then((res) => {
                this.props.onSuccess();
              })
              .catch((error) => {
                this.props.onFailure();
              });
            }
          }}
        />
    );
  }

}

export default ButtonImportCSV;
ButtonImportCSV.defaultProps = {
  onSuccess: () => void (0),
  onFailure: () => void (0)
}
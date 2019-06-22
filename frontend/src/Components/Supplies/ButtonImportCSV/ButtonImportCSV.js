import React from "react";
import Input from '@material-ui/core/Input';
import Tooltip from "@material-ui/core/Tooltip";
import ImportCSVIcon from "@material-ui/icons/Input";
import { importCSV } from '../../../services/inventoryService';

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
        onChange={event => {
          importCSV(event.target.files[0]);
        }}
      />
    );
  }

}

export default ButtonImportCSV;
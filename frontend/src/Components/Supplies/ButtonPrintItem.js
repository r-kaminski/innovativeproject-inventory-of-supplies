import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from '@material-ui/icons/Print';

class ButtonPrintItem extends React.Component {

  render() {
    return (
      <Tooltip title={"Add QR code to print queue"}>
        <IconButton onClick={this.props.onClick}>
          <PrintIcon />
        </IconButton>
      </Tooltip>
    )
  }
}

export default ButtonPrintItem;
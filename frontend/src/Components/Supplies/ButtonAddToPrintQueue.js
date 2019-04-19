import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from '@material-ui/icons/Print';

const ButtonAddToPrintQueue = (props) => {
  return (
    <Tooltip title={"Add QR code to print queue"}>
      <IconButton onClick={props.onClick}>
        <PrintIcon />
      </IconButton>
    </Tooltip>
  )
}

export default ButtonAddToPrintQueue;
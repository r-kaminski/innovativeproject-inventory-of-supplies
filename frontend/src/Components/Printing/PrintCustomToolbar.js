import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from '@material-ui/icons/Print';

const PrintCustomToolbar = (props) => {
  return (
    <React.Fragment>
      <Tooltip title={"Print QR codes"}>
        <IconButton onClick={props.onClickPrint}>
          <PrintIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
export default PrintCustomToolbar;
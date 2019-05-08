import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from '@material-ui/icons/Print';
import ButtonGoBack from '../GoBackButton';

const PrintCustomToolbar = (props) => {
  return (
    <React.Fragment>
      <ButtonGoBack history={props.history} />
      <Tooltip title={"Print QR codes"}>
        <IconButton onClick={props.onClickPrint}>
          <PrintIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
export default PrintCustomToolbar;
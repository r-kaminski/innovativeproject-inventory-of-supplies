import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from '@material-ui/icons/Print';

class PrintCustomToolbar extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Tooltip title={"Print QR codes"}>
          <IconButton onClick={this.props.onClickPrint}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

PrintCustomToolbar.defaultProps = {
  onClickAddItem: () => void (0),
}

export default PrintCustomToolbar;
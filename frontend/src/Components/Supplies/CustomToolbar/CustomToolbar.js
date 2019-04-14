import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/Add";
import PrintIcon from '@material-ui/icons/PrintTwoTone';

class CustomToolbar extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Tooltip title={"QR print queue"}>
          <IconButton onClick={this.props.onClickPrint}>
            <PrintIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={"Add item"}>
          <IconButton onClick={this.props.onClickAddItem}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

CustomToolbar.defaultProps = {
  onClickAddItem: () => void (0),
}

export default CustomToolbar;
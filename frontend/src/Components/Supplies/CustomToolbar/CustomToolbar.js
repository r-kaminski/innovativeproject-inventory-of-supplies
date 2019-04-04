import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/Add";

class CustomToolbar extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Tooltip title={"Nowa pozycja"}>
          <IconButton onClick={this.props.onClickAddItem}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

CustomToolbar.defaultProps = {
  onClickAddItem : () => void(0),
}

export default CustomToolbar;
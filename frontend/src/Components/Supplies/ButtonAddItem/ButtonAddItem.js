import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleOutlineIcon from "@material-ui/icons/Add";

class ButtonAddItem extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Tooltip 
          title="Nowa pozycja"
          placement="bottom-start">
          <IconButton onClick={this.props.onClickAddItem}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

ButtonAddItem.defaultProps = {
  onClickAddItem : () => void(0),
}

export default ButtonAddItem;
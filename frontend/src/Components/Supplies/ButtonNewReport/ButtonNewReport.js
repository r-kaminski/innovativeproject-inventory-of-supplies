import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NewReportIcon from "@material-ui/icons/LibraryAdd";

class ButtonNewReport extends React.Component {

  render() {

    return (
        <Tooltip 
          title="New report"
          placement="bottom-start">
          <IconButton onClick={this.props.onClick}>
            <NewReportIcon />
          </IconButton>
        </Tooltip>
    );
  }

}

ButtonNewReport.defaultProps = {
  onClick : () => void(0),
}

export default ButtonNewReport;
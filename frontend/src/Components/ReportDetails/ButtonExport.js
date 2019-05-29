import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DownloadIcon from "@material-ui/icons/GetApp";

export default function ButtonGetCSV(props) {
  const { onClick, tooltip, tooltipPlacement } = props;

  return (
    <React.Fragment>
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        <IconButton onClick={onClick}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

ButtonGetCSV.defaultProps = {
  onClick: () => void 0,
  tooltip: "",
  tooltipPlacement: "bottom-start"
};

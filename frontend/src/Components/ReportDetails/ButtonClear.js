import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ClearIcon from "@material-ui/icons/Clear";

export default function ButtonClear(props){
    const { onClick, tooltip, tooltipPlacement } = props;


    return (
        <React.Fragment>
            <Tooltip 
            title={tooltip}
            placement={tooltipPlacement}>
                <IconButton 
                onClick={onClick}>
                    <ClearIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
};

ButtonClear.defaultProps = {
  onClick : () => void(0),
  tooltip : "",
  tooltipPlacement : "bottom-start"
}
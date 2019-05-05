import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/Check";

export default function ButtonCheck(props){
    const { onClick, tooltip, tooltipPlacement } = props;

    return (
        <React.Fragment>
            <Tooltip 
            title={tooltip}
            placement={tooltipPlacement}>
                <IconButton 
                onClick={onClick}>
                    <CheckIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>   
    );

}

ButtonCheck.defaultProps = {
  onClick : () => void(0),
  tooltip : "",
  tooltipPlacement : "bottom-start"
}
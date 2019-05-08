import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/icons/KeyboardBackspace";


const GoBackButton = (props) => {
    return (<React.Fragment>
        <Tooltip title={"Go back"}>
            <IconButton onClick={props.history.goBack}>
                <Icon />
            </IconButton>
        </Tooltip>
    </React.Fragment>)
}

export default GoBackButton;
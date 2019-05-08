import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from '@material-ui/icons/PowerSettingsNew';

const ButtonPrintQueue = (props) => {
    return (
        <React.Fragment>
            <Tooltip title={"Logout"}>
                <IconButton onClick={props.onClick}>
                    <Icon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )
}
export default ButtonPrintQueue;
import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/icons/Settings";

class ButtonAdminPanel extends React.Component {
    render() {
        return (
            <Tooltip title={"Admin"}>
                <IconButton onClick={this.props.onClick}>
                    <Icon />
                </IconButton>
            </Tooltip>
        )
    }
}

export default ButtonAdminPanel;
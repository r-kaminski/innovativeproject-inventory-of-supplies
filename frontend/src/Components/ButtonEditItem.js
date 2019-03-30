import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";

class ButtonEditItem extends React.Component{
    
    render(){
        return(
            <Tooltip title={"Usuń"}>
              <IconButton onClick={this.props.onClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
        )
    }
}

export default ButtonEditItem;
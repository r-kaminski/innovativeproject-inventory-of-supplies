import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

class ButtonRemoveItem extends React.Component{
    
    render(){
        return(
            <Tooltip title={"Usuń"}>
              <IconButton onClick={this.props.onClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
        )
    }
}

export default ButtonRemoveItem;
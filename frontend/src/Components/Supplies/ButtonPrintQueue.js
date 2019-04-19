import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from '@material-ui/icons/PrintTwoTone';

const ButtonPrintQueue = (props) => {
    return (
        <React.Fragment>
            <Tooltip title={"QR print queue"}>
                <IconButton onClick={props.onClickPrint}>
                    <PrintIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )
}
export default ButtonPrintQueue;
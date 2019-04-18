import React, { useState } from 'react';
import classNames from 'classnames';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./SearchTool.module.css";

export default function SearchTool(props){
    let [active, setActive] = useState(false);
    let [text, setText] = useState("");

    let containterClasses = classNames({
        [styles.toolbar] : true,
        [styles.active] : active
    });
    
    return (
        <div className={containterClasses}>
        { active ? (
            <React.Fragment>
                <SearchIcon className={styles.padding12px} />
                <input
                    type="text"
                    className={styles.textInput}
                    id="txt_search"
                    placeholder="Search away!"
                    value={text}
                    onChange={(event)=>{
                        setText(event.target.value)
                        props.onChange(event.target.value);
                    }}
                    />
                <Tooltip title={"Close"}>
                    <IconButton 
                        onClick={()=>{
                            setActive(false)
                            setText("");
                            props.onClose();
                            }}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        ) : (
            <Tooltip title={"Search"}>
                <IconButton onClick={()=>{
                    setActive(true)
                    props.onOpen();
                    }}>
                    <SearchIcon />
                </IconButton>
            </Tooltip>
        )}
        </div>
    );
}

SearchTool.defaultProps = {
    onOpen : () => void(0),
    onChange : (value) => void(0),
    onClose : () => void(0)
}
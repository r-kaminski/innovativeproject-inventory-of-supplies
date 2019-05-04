import React, { useEffect } from 'react';
import styles from './ConfirmSwitch.module.css';
import classNames from 'classnames';

export default function ConfirmSwitch(props){
    const { confirmed, onClick } = props;

    let contentClasses = classNames({
        [styles.confirm_content] : true,
        [styles.confirm_content_confirmed] : confirmed,
    })
    
    useEffect(()=>{    
        contentClasses = classNames({
            [styles.confirm_content] : true,
            [styles.confirm_content_confirmed] : confirmed,
        })

    }, [confirmed])

    return(
        <div 
            className={styles.confirm_container}
            onClick={ onClick }
        >
            <div className={contentClasses}>confirmed<div className={styles.confirm_blob}></div>unconfirmed</div>
        </div>
    );
}

ConfirmSwitch.defaultProps = {
    onClick : ()=>void(0),
    confirmed : false,
}
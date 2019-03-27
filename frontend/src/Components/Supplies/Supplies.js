import React, { Component } from 'react';
import styles from './Supplies.module.css';

class Supplies extends Component{
    render(){
        //console.log(styles.pagewrapper)
        return(
            <div class={styles.wrapper}>
                <header>
                    STOCK
                </header>
                <div class={styles.tablePlaceholder}>
                    TABELA
                </div>
            </div>            
        );
    }
}

export default Supplies;
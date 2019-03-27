import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';

class Supplies extends Component{
    columns = ["Name", "Company", "City", "State"];

    data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ];
    
    options = {
    filterType: 'checkbox',
    };

    render(){
        //console.log(styles.pagewrapper)
        return(
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>
                <MUIDataTable
                        className={styles.table}
                        title={"Employee List"}
                        data={this.data}
                        columns={this.columns}
                        options={this.options} />
            </div>            
        );
    };
}

export default Supplies;
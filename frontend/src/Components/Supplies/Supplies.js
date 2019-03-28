import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';
import { getItems } from '../../DummyInventoryApi';
import CustomToolbar from './CustomToolbar/CustomToolbar'


class Supplies extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: []
        };
    }

    columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: true
            }
        }, 
        {
            name: "name",
            label: "Nazwa",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "state",
            label: "Stan",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "description",
            label: "Opis",
            options: {
                filter: false,
                sort: false
            }
        },
    ];
    
    options = {
        filterType: 'dropdown',
        customToolbar: () => {
            return(
                <CustomToolbar />
            )
        }
    };

    componentDidMount(){
        try{
            getItems().then((data) => {
                this.setState({data : data})
            });
        }catch(error){
            console.error(error);
        }
        
    }

    render(){
        return(
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>
                <MUIDataTable
                        className={styles.table}
                        title={"Wypozażenie"}
                        data={this.state.data}
                        columns={this.columns}
                        options={this.options}
                         />
            </div>            
        );
    };
}

export default Supplies;
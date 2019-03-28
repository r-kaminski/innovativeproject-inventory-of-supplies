import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';
import { getItems } from '../../DummyInventoryApi';


class Supplies extends Component{
    constructor(props){
        super(props);

        this.state = {
            data:[
                [1, "czarny worek", "idealny", "opis"],
                [2, "lina", "dobry", "opis"],
                [3, "taśma izolacyjna", "idealny", "brak opisu"],
                [4, "łopata", "idealny", "brak opisu"],
                [5, "ręcznik", "zły", "also opis"]
            ]
        };
    }

    columns = [
        {
            name: "ID",
            options: {
                filter: false,
                sort: true
            }
        }, 
        {
            name: "Nazwa",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "Stan",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "Opis",
            options: {
                filter: false,
                sort: false
            }
        },
    ];
    
    options = {
        filterType: 'dropdown',
    };

    componentDidMount(){
        getItems().then((data) => this.setState({data : data}));

    //     let token;
    //     getToken().then(
    //         (token) => {
    //             if(token){
    //                 let response = fetch(
    //                     `${API_URL}/supplies/`, {
    //                         method: 'GET',
    //                         headers: {
    //                             'Accept': 'application/json',
    //                             'Content-Type': 'application/json',
    //                             'Authorization': `JWT ${token}`,
    //                         }
    //                     }
    //                 );
    //                 return response;
    //             }
    //         }
    //     ).then((res) => {
    //         let resJson = res.json();
    //         let newData = [];
    //         resJson.map((item) => {
    //             newData.push([item.id, item.name, item.state, item.description]);
    //         })
    //         this.setState({data : newData});
    //     });
    }

    render(){
        //console.log(styles.pagewrapper)
        return(
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>
                <MUIDataTable
                        className={styles.table}
                        title={"Supplies"}
                        data={this.state.data}
                        columns={this.columns}
                        options={this.options} />
            </div>            
        );
    };
}

export default Supplies;
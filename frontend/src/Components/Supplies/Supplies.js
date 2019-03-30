import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';
import { getItems, deleteItem } from '../../DummyInventoryApi';
import CustomToolbar from './CustomToolbar/CustomToolbar'
import ButtonRemoveItem from '../ButtonRemoveItem';
import ButtonEditItem from '../ButtonEditItem';
import DialogEditItem from '../DialogEditItem';


class Supplies extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            itemToEdit: {},
            openDialogEdit : false
        };
    }

    updateData = () => {
        try{
            getItems().then((data) => {
                this.setState({data : data})
            });
        }catch(error){
            console.error(error);
        }
    }

    onClickDeleteRow = (rowId) => {
        try{
            deleteItem(this.state.data[rowId].id);

            let newData = [...this.state.data];
            newData.splice(rowId)
            this.setState({
                data: newData
            });
        }catch(error){
            console.error(error);
        }
    }

    onClickEditRow = (rowId) => {
        this.setState({
            itemToEdit : this.state.data[rowId],
            openDialogEdit : true
        })
    }

    onEditDialogUpdateFail = () => {
        //show message
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
        {

            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <React.Fragment>
                            <ButtonRemoveItem 
                            onClick={()=>this.onClickDeleteRow(tableMeta.rowIndex)}
                            />
                            <ButtonEditItem 
                            onClick={()=>this.onClickEditRow(tableMeta.rowIndex)}
                            />
                        </React.Fragment>
                    );
        }, 
            }
        }
    ];
    
    options = {
        filterType: 'dropdown',
        customToolbar: () => (<CustomToolbar />),
        onRowsDelete: (rows) => this.onSelectedRemove(rows.data)
    };

    componentDidMount(){
        this.updateData();
    }

    onSelectedRemove = (rowsDeleted) => {
        try{
            for(let key in rowsDeleted){
                console.log("To chce wywalić: "+this.state.data[key].id)
                deleteItem(this.state.data[key].id);
            }
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
                    options={this.options} />
                <DialogEditItem
                    open={this.state.openDialogEdit}
                    item={this.state.itemToEdit}
                    onCancel={()=>{this.setState({openDialogEdit : false})}}
                    onUpdateSuccess={()=>{this.updateData()}}
                    onUpdateFail={()=>console.log("dupło się")}
                    onClosing={()=>void(0)}
                />
            </div>            
        );
    };
}

export default Supplies;
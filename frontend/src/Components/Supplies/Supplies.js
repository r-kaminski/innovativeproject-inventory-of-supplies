import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';
import { getItems, deleteItem } from '../../API/InventoryAPI';
import CustomToolbar from './CustomToolbar/CustomToolbar'
import ButtonRemoveItem from './ButtonRemoveItem';
import ButtonEditItem from './ButtonEditItem';
import DialogEditItem from './DialogEditItem/DialogEditItem';
import DialogAddItem from './DialogAddItem/DialogAddItem';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';
import Snackbar from '@material-ui/core/Snackbar';


class Supplies extends Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            itemToEdit: {},
            openDialogEdit : false,
            openDialogAdd : false,
            openSnackbar : false,
            snackbarMessage : "",
            snackbarVariant : "info"
        };
    }

    updateData = () => {
        try{
            getItems().then((res) => {
                if(res.ok){
                    res.json().then((data)=>{
                        this.setState({data : data})
                    });
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    onClickAddItem = () => {
        this.setState({
            openDialogAdd : true
        })
    }

    onClickDeleteRow = (rowId) => {
        try{
            deleteItem(this.state.data[rowId].id).then((res)=>{
                if(res.ok){
                    let newData = [...this.state.data];
                    newData.splice(rowId,1);

                    this.setState({
                        data: newData,
                        openSnackbar : true,
                        snackbarMessage : "Usunięto pomyślnie!",
                        snackbarVariant : "success"
                    });
                }else{
                    this.setState({
                        openSnackbar : true,
                        snackbarMessage : "Wystąpił błąd!",
                        snackbarVariant : "error"
                    });
                }
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

    onClickDeleteSelected = (rowsDeleted) => {
        try{
            let allOk = true;
            let someOk = true;
            for(let key in rowsDeleted){
                deleteItem(this.state.data[key].id).then((res)=>{
                    allOk = allOk && res.ok;
                    someOk = someOk || res.ok;
                });
            }

            if(allOk){
                this.setState({
                    snackbarMessage : "Usunięto pomyślnie!",
                    snackbarVariant : "success",
                    openSnackbar : true
                })
            }else if(someOk){
                this.setState({
                    snackbarMessage : "Wystąpił częściowy błąd!",
                    snackbarVariant : "error",
                    openSnackbar : true
                })
            }else{
                this.setState({
                    snackbarMessage : "Wystąpił błąd!",
                    snackbarVariant : "error",
                    openSnackbar : true
                })
            }
        }catch(error){
            console.error(error);
        }
    }

    componentDidMount(){
        this.updateData();
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
        customToolbar: () => (<CustomToolbar onClickAddItem={()=>this.onClickAddItem()}/>),
        onRowsDelete: (rows) => this.onClickDeleteSelected(rows.data)
    };

    render(){
        return(
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>

                <MUIDataTable
                    className={styles.table}
                    title={"Wyposażenie"}
                    data={this.state.data}
                    columns={this.columns}
                    options={this.options} />

                <DialogAddItem
                    open={this.state.openDialogAdd}
                    onCancel={()=>this.setState({openDialogAdd : false})}
                    onSuccess={()=>{
                        this.updateData()
                        this.setState({
                            snackbarMessage : "Dodano pomyślnie!",
                            snackbarVariant : "success",
                            openSnackbar : true
                        })
                    }}
                    onFailure={()=>{this.setState({
                        snackbarMessage : "Wystąpił błąd!",
                        snackbarVariant : "error",
                        openSnackbar : true
                    })}}
                    />

                <DialogEditItem
                    open={this.state.openDialogEdit}
                    item={this.state.itemToEdit}
                    onCancel={()=>{this.setState({openDialogEdit : false})}}
                    onSuccess={()=>{
                        this.updateData()
                        this.setState({
                            snackbarMessage : "Zapisano pomyślnie!",
                            snackbarVariant : "success",
                            openSnackbar : true
                        })
                    }}
                    onFailure={()=>{this.setState({
                        snackbarMessage : "Wystąpił błąd!",
                        snackbarVariant : "error",
                        openSnackbar : true
                    })}}
                />

                <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnackbar}
                        autoHideDuration={4000}
                        onClose={()=>this.setState({openSnackbar : false})}
                        >
                        <SnackbarContentWrapper
                            onClose={()=>this.setState({openSnackbar : false})}
                            variant={this.state.snackbarVariant}
                            message={this.state.snackbarMessage}
                        />
                </Snackbar>
            </div>            
        );
    };
}

export default Supplies;
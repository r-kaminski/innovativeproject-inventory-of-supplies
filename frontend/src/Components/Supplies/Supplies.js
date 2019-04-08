import React from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';
import CustomToolbar from './CustomToolbar/CustomToolbar'
import ButtonRemoveItem from './ButtonRemoveItem';
import ButtonEditItem from './ButtonEditItem';
import ButtonPrintItem from './ButtonPrintItem';
import DialogEditItem from './DialogEditItem/DialogEditItem';
import DialogAddItem from './DialogAddItem/DialogAddItem';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';
import { getItems, deleteItem } from '../../services/inventoryService';
import PrintService from '../../services/PrintService';
import { withSnackbar } from 'notistack';



class Supplies extends React.Component{
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
        getItems()
            .then((res)=>{
                this.setState({data : res.data.results});
            }).catch((err)=>{
                console.error(err);
            })
    }

    onClickAddItem = () => {
        this.setState({
            openDialogAdd : true
        })
    }

    onClickDeleteRow = (rowId) => {
        deleteItem(this.state.data[rowId].id)
            .then((res)=>{
                let newData = [...this.state.data];
                    newData.splice(rowId,1);

                    this.setState({
                        data: newData,
                        openSnackbar : true,
                        snackbarMessage : "Usunięto pomyślnie!",
                        snackbarVariant : "success"
                    });
            }).catch((err)=>{
                console.error(err);
                this.setState({
                    openSnackbar : true,
                    snackbarMessage : "Wystąpił błąd!",
                    snackbarVariant : "error"
                });
            });
    }

    onClickEditRow = (rowId) => {
        this.setState({
            itemToEdit : this.state.data[rowId],
            openDialogEdit : true
        })
    }

    onClickDeleteSelected = (rowsDeleted) => {
        let allOk = true;
        let someOk = false;
        for(let key in rowsDeleted){
            deleteItem(this.state.data[key].id)
                .then((res)=>{
                    someOk = true;
                }).catch((err)=>{
                    console.error(err);
                    allOk = false;
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
    }

    onClickPrint(rowId) {
        try{
            PrintService.addToQueue(this.state.data[rowId].id);
            this.props.enqueueSnackbar('Added to print queue', { variant: 'info' });
        } catch {
            this.props.enqueueSnackbar('Failed to add to print queue', { variant: 'error' });
        }
    }

    showSnackbar = (type, message) => {
        switch (type){
            case "success":
                this.setState({
                    snackbarMessage : message,
                    snackbarVariant : "success",
                    openSnackbar : true
                });
                break;
            case "error":
                this.setState({
                    snackbarMessage : message,
                    snackbarVariant : "error",
                    openSnackbar : true
                });
                break;
            default:
                console.error(`Snackbar type: '${type}' not supported!`)
                break;
        }
        
    };

    componentDidMount(){
        this.updateData();
    }

    columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: false
            }
        }, 
        {
            name: "name",
            label: "Nazwa",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "state",
            label: "Stan",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "description",
            label: "Opis",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    if(value.length > 20)
                        return value.slice(0, 17)+'...';
                    return value;
                }
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
                            <ButtonPrintItem 
                            onClick={()=>this.onClickPrint(tableMeta.rowIndex)}
                            />
                        </React.Fragment>
                    );
        }, 
            }
        }
    ];
    
    options = {
        filter: false,
        sort: false,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        customToolbar: () => (<CustomToolbar onClickAddItem={()=>this.onClickAddItem()} onClickPrint={()=>this.props.history.push('/printing')}/>),
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
                        this.updateData();
                        this.showSnackbar("success", "Dodano pomyślnie!");
                    }}
                    onFailure={()=>this.showSnackbar("error", "Wystąpił błąd!")}
                    />

                <DialogEditItem
                    open={this.state.openDialogEdit}
                    item={this.state.itemToEdit}
                    onCancel={()=>{this.setState({openDialogEdit : false})}}
                    onSuccess={()=>{
                        this.updateData();
                        this.showSnackbar("success", "Zapisano pomyślnie!");
                    }}
                    onFailure={()=>this.showSnackbar("error", "Wystąpił błąd!")}
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

export default withSnackbar(Supplies);
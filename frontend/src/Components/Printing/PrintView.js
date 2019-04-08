import React from 'react';
import { Component } from 'react';
import { withSnackbar } from 'notistack';
import PrintService from '../../services/PrintService';
import ButtonRemoveItem from '../Supplies/ButtonRemoveItem';
import MUIDataTable from "mui-datatables";
import styles from '../Supplies/Supplies.module.css';
import PrintCustomToolbar from './PrintCustomToolbar';
import print from 'print-js'

class PrintView extends Component {
    
    state = {
        data:[]
    };

    componentDidMount() {
        this.refreshTable();
    }

    async onClickDeleteRow(rowId) {
        await PrintService.removeFromQueue(this.state.data[rowId].id);
        this.refreshTable();
    }

    printCodes() {
        let ids = this.state.data.map(item=>item.supplyId)
        print('https://printjs.crabbly.com/images/print-01.jpg','image')
    }
    
    onClickDeleteSelected = (rowsDeleted) => {
        let allOk = true;
        let someOk = false;
        for(let key in rowsDeleted){
            this.onClickDeleteRow(key)
                .then((res)=>{
                    someOk = true;
                }).catch((err)=>{
                    console.error(err);
                    allOk = false;
                });
        }

        if(allOk){
            this.props.enqueueSnackbar('Removed successfully', { variant: 'info' });
        }else if(someOk){
            this.props.enqueueSnackbar('Failed to remove some of elements', { variant: 'error' });
        }else{
            this.props.enqueueSnackbar('Failed to remove', { variant: 'error' });
        }
    }

    async refreshTable() {
        try{
            let response = await PrintService.getQueue()
            let data = response.data.map(printObject=>{return {id:printObject.id,supplyId:printObject.supply.id,name:printObject.supply.name};})
            this.setState({data:data})
        } catch {
            this.props.enqueueSnackbar('Failed to refresh table', { variant: 'error' });
        }        
    }

    columns = [
        {
            name: "supplyId",
            label: "ID",
            options: {
                filter: false,
                sort: false
            }
        }, 
        {
            name: "name",
            label: "Name",
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
        onRowsDelete: rows => this.onClickDeleteSelected(rows.data),
        customToolbar: () => (<PrintCustomToolbar onClickPrint={this.printCodes.bind(this)}/>),
    };

    render(){
        return(
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>

                <MUIDataTable
                    className={styles.table}
                    title={"Print QR codes"}
                    data={this.state.data}
                    columns={this.columns}
                    options={this.options} />
            </div>            
        );
    };
}
export default withSnackbar(PrintView);

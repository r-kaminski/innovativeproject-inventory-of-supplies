import React from 'react';
import styles from './Reports.module.css';

import MUIDataTable from "mui-datatables";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';



export default class Reports extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],

            pageNumber : 1,
            itemsPerPage : 10,
            totalItemCount: 0,

            openSnackbar : false,
            snackbarMessage : "",
            snackbarVariant : "info"
        };
    }

    updateData = () => {
        
    }

    onChangePage = (pageNumber) => {
        pageNumber += 1;
        this.setState({
            pageNumber : pageNumber
        });
        this.updateData({pageNumber});
    }

    onChangeRowsPerPage = (changeRowsPerPage) => {
        this.setState({
            pageNumber : 1,
            itemsPerPage : changeRowsPerPage
        })
        this.updateData({pageNumber: 1, itemsPerPage: changeRowsPerPage});
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
        }, 
        {
            name: "date",
            label: "Date",
        },
        {
            name: "name",
            label: "Name",
        },
        {
            name: "total_count",
            label: "Quantity",
        },
        {
            name: "recorded_count",
            label: "Confirmed",
        }
    ];
    


    render(){
        const {data, itemsPerPage, totalItemCount}  = this.state;

        const options = {
            filter: false,
            sort: false,
            search: false,
            print: false,
            download: false,
            viewColumns: false,

            serverSide: true,
            pagination: true,
            count: totalItemCount,
            rowsPerPage: itemsPerPage,
            onChangePage: this.onChangePage,
            onChangeRowsPerPage: this.onChangeRowsPerPage,
        };

        return(
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>

                <MUIDataTable
                    className={styles.table}
                    title={"Reports"}
                    data={data}
                    columns={this.columns}
                    options={options} />

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
import React, { useState , useEffect } from 'react';
import styles from './ReportDetails.module.css';
import classNames from 'classnames';

import MUIDataTable from "mui-datatables";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';
import ButtonRemoveItem from '../Supplies/ButtonRemoveItem/ButtonRemoveItem';

import { getReportsItems } from '../../services/inventoryService';



export default class ReportDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            reportId: Number(this.props.match.params.report_id),

            pageNumber : 1,
            itemsPerPage : 10,
            totalItemCount: 0,

            openSnackbar : false,
            snackbarMessage : "",
            snackbarVariant : "info"
        };
    }

    updateData = ({pageNumber, itemsPerPage}={}) => {
        if(pageNumber === undefined) pageNumber = this.state.pageNumber;    
        if(itemsPerPage === undefined) itemsPerPage = this.state.itemsPerPage;

        let { reportId } = this.state;
        
        getReportsItems({reportId, pageNumber, itemsPerPage})
                .then((res)=>{
                    let data = [];
                    for (const elem of res.data.results) {
                        let {id : rsid, supply, is_checked} = elem;
                        let {id, name, state, description} = supply;
                        data.push({rsid, id, name, state, description, is_checked});
                    }
                    
                    this.setState({
                        data : data,
                        totalItemCount : res.data.count,
                    });
                }).catch((err)=>{
                    if(err.response !== undefined){
                        if(err.response.data.detail === "Invalid page." && this.state.pageNumber > 1){
                            let prevPage = this.state.pageNumber - 1;
                            this.setState({pageNumber: prevPage});
                            this.updateData({pageNumber: prevPage});    
                        }
                    }else{
                        console.error(err);
                    }
                });
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

    onClickDeleteRow = (rowId) => {
        // deleteReport(this.state.data[rowId].id)
        //     .then((res)=>{
        //             this.updateData();
        //             this.setState({
        //                 openSnackbar : true,
        //                 snackbarMessage : "Usunięto pomyślnie!",
        //                 snackbarVariant : "success"
        //             });
        //     }).catch((err)=>{
        //         console.error(err);
        //         this.setState({
        //             openSnackbar : true,
        //             snackbarMessage : "Wystąpił błąd!",
        //             snackbarVariant : "error"
        //         });
        //     });
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
        if(this.state.reportId === undefined) return;
        
        this.updateData();        
    }

    columns = [
        {
            name: "rsid",
            options : { display: 'false'}
        }, 
        {
            name: "id",
            label: "ID",
        },
        {
            name: "name",
            label: "Date",
        },
        {
            name: "state",
            label: "Contidion",
        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "is_checked",
            label: " ",
            options: {
                customBodyRender: (value, rowMeta, updateValue)=> {
                    return (<ConfirmField confirmed={value}/>);
                }
            }
            
        },
        // {

        //     options: {
        //         filter: false,
        //         sort: false,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <ButtonRemoveItem 
        //                     onClick={()=>this.onClickDeleteRow(tableMeta.rowIndex)}
        //                 />
        //             );
        //         }, 
        //     }
        // }
    ];
    


    render(){
        const {data, itemsPerPage, totalItemCount, reportId}  = this.state;

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
                    title={`Details of report #${reportId}`}
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

ReportDetails.defaultProps = {
    reportId : -1,
}

function ConfirmField(props){
    //const [confirmed, setConfirmed] = useState(false);

    const containerClasses = classNames({
        [styles.confirm_container] : true,
        [styles.confirm_container_confirmed] : props.confirmed
    })

    const contentClasses = classNames({
        [styles.confirm_content] : true,
        [styles.confirm_content_confirmed] : props.confirmed
    })

    return(
        <div className={containerClasses}>
            <div className={contentClasses}>confirmed <div className={styles.confirm_blob}>&nbsp;</div> unconfirmed</div>
        </div>
    );
}
import React from 'react';
import styles from './Reports.module.css';

import MUIDataTable from "mui-datatables";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';
import ButtonRemoveItem from '../Supplies/ButtonRemoveItem/ButtonRemoveItem';

import { getReports, deleteReport } from '../../services/inventoryService';
import { displayIfAdmin, isAdmin } from '../../services/authService';

import ButtonGoBack from '../GoBackButton';


export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],

            pageNumber: 1,
            itemsPerPage: 10,
            totalItemCount: 0,

            openSnackbar: false,
            snackbarMessage: "",
            snackbarVariant: "info"
        };
    }

    updateData = ({ pageNumber, itemsPerPage } = {}) => {
        if (pageNumber === undefined) pageNumber = this.state.pageNumber;
        if (itemsPerPage === undefined) itemsPerPage = this.state.itemsPerPage;

        getReports({ pageNumber, itemsPerPage })
            .then((res) => {
                this.setState({
                    data: res.data.results,
                    totalItemCount: res.data.count,
                });
            }).catch((err) => {
                if (err.response.data.detail === "Invalid page." && this.state.pageNumber > 1) {
                    let prevPage = this.state.pageNumber - 1;
                    this.setState({ pageNumber: prevPage });
                    this.updateData({ pageNumber: prevPage });
                } else {
                    console.error(err.response.data);
                }
            });
    }

    onChangePage = (pageNumber) => {
        pageNumber += 1;
        this.setState({
            pageNumber: pageNumber
        });
        this.updateData({ pageNumber });
    }

    onChangeRowsPerPage = (changeRowsPerPage) => {
        this.setState({
            pageNumber: 1,
            itemsPerPage: changeRowsPerPage
        })
        this.updateData({ pageNumber: 1, itemsPerPage: changeRowsPerPage });
    }

    onClickDeleteRow = (rowId) => {
        deleteReport(this.state.data[rowId].id)
            .then((res) => {
                this.updateData();
                this.setState({
                    openSnackbar: true,
                    snackbarMessage: "Usunięto pomyślnie!",
                    snackbarVariant: "success"
                });
            }).catch((err) => {
                console.error(err);
                this.setState({
                    openSnackbar: true,
                    snackbarMessage: "An error occured!",
                    snackbarVariant: "error"
                });
            });
    }

    showSnackbar = (type, message) => {
        switch (type) {
            case "success":
                this.setState({
                    snackbarMessage: message,
                    snackbarVariant: "success",
                    openSnackbar: true
                });
                break;
            case "error":
                this.setState({
                    snackbarMessage: message,
                    snackbarVariant: "error",
                    openSnackbar: true
                });
                break;
            default:
                console.error(`Snackbar type: '${type}' not supported!`)
                break;
        }
    };

    componentDidMount() {

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
            name: "supplies_total",
            label: "Quantity",
        },
        {
            name: "supplies_checked_out",
            label: "Confirmed",
        },
        {

            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return displayIfAdmin(<ButtonRemoveItem onClick={() => this.onClickDeleteRow(tableMeta.rowIndex)} />
                    );
                },
            }
        }
    ];



    render() {
        const { data, itemsPerPage, totalItemCount } = this.state;

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

            onRowClick: (rowData, rowMeta, e) => {
                let targetTag = e.target.tagName;
                if (targetTag !== "TD") return;

                this.props.history.push(`/ReportDetails/${rowData[0]}`)
            },
            selectableRows: isAdmin,
            customToolbar: () => (<ButtonGoBack history={this.props.history} />)
        };

        return (
            <div className={styles.wrapper}>
                <header>
                    MAKERSPACE
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
                    onClose={() => this.setState({ openSnackbar: false })}
                >
                    <SnackbarContentWrapper
                        onClose={() => this.setState({ openSnackbar: false })}
                        variant={this.state.snackbarVariant}
                        message={this.state.snackbarMessage}
                    />
                </Snackbar>
            </div>
        );
    };
}

Reports.defaultProps = {
    reportId: -1,
}

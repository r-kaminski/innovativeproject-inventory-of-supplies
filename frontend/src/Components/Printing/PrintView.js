import React from 'react';
import { Component } from 'react';
import { withSnackbar } from 'notistack';
import PrintService from '../../services/PrintService';
import ButtonRemoveItem from '../Supplies/ButtonRemoveItem';
import MUIDataTable from "mui-datatables";
import styles from '../Supplies/Supplies.module.css';
import PrintCustomToolbar from './PrintCustomToolbar';
import print from 'print-js'
import LoadingDialog from './LoadingDialog'
import AfterPrintDialog from './AfterPrintDialog'

class PrintView extends Component {

    MaxQRCodesPerPage = 110

    state = {
        data: [],
        loading: false,
        finished: false,
    };

    componentDidMount() {
        this.refreshTable();
    }

    async onClickDeleteRow(id) {
        await PrintService.removeFromQueue(id);
        this.refreshTable();
    }

    /** 
     * Function converts array of ids to strings of parameters
     * to pass to /printing
     */
    createIdLists(ids) {
        let parts = []
        while (ids.length > 0) {
            let part;
            if (ids.length > 100) {
                part = ids.slice(0, 100)
                ids = ids.slice(100)
            } else {
                part = ids
                ids = []
            }
            parts.push(part)
        }
        let lists = []
        for (let part of parts) {
            let parameters = `?id=${part[0]}`
            for (let id of part.slice(1)) {
                parameters += `&id=${id}`
            }
            lists.push(parameters)
        }
        return lists
    }

    printCodes() {
        let ids = this.state.data.map(item => item.supplyId)
        if (ids.length == 0) {
            this.props.enqueueSnackbar('Queue is empty', { variant: 'warning' })
            return
        }
        const parameters = this.createIdLists(ids)

        print({
            printable: parameters.map(params => `/api/printing/${params}`),
            type: 'image',
            onLoadingEnd: () => {
                this.setState({
                    loading: false,
                    finished: true
                })

            },
            onLoadingStart: () => {
                this.setState({ loading: true })
            }
        })
    }

    async onClickDeleteSelected(rowsDeleted) {
        let allOk = true;
        let someOk = false;
        let promises = [];
        for (let row of rowsDeleted) {
            let promise = PrintService.removeFromQueue(this.state.data[row.dataIndex].id);
            promises.push(promise);
        }
        for (let promise of promises) {
            try {
                await promise;
                someOk = true;
            } catch {
                allOk = false;
            }
        }

        if (allOk) {
            this.props.enqueueSnackbar('Removed successfully', { variant: 'info' });
        } else if (someOk) {
            this.props.enqueueSnackbar('Failed to remove some of elements', { variant: 'error' });
        } else {
            this.props.enqueueSnackbar('Failed to remove', { variant: 'error' });
        }
    }

    async refreshTable() {
        try {
            let response = await PrintService.getQueue()
            let data = response.data.map(printObject => { return { id: printObject.id, supplyId: printObject.supply.id, name: printObject.supply.name }; })
            this.setState({ data: data })
        } catch {
            this.props.enqueueSnackbar('Failed to refresh table', { variant: 'error' });
        }
    }

    columns = [
        {
            name: "id",
            options: {
                display: false,
            }
        },
        {
            name: "supplyId",
            label: "ID",
        },
        {
            name: "name",
            label: "Name",
        },
        {
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        < React.Fragment >
                            <ButtonRemoveItem
                                onClick={() => this.onClickDeleteRow(tableMeta.rowData[0])}
                            />
                        </React.Fragment >
                    );
                },
            }
        }
    ];

    options = {
        filter: false,
        sort: true,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        onRowsDelete: rows => this.onClickDeleteSelected(rows.data),
        customToolbar: () => (<PrintCustomToolbar onClickPrint={this.printCodes.bind(this)} />),
        textLabels: {
            body: {
                noMatch: "Queue is empty"
            }
        }
    };

    clearQueue() {
        PrintService.clearQueue()
        this.setState({ finished: false })
    }

    render() {
        return (
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

                <LoadingDialog open={this.state.loading} />
                <AfterPrintDialog onAccept={this.clearQueue.bind(this)} onDeny={() => { this.setState({ finished: false }) }} open={this.state.finished} />
            </div>
        );
    };
}
export default withSnackbar(PrintView);

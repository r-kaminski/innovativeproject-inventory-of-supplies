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
        data: []
    };

    componentDidMount() {
        this.refreshTable();
    }

    async onClickDeleteRow(id) {
        await PrintService.removeFromQueue(id);
        this.refreshTable();
    }

    printCodes() {
        let ids = this.state.data.map(item => item.supplyId)
        print({
            printable: [
                'https://printjs.crabbly.com/images/print-01.jpg',
                'https://printjs.crabbly.com/images/print-01.jpg',
                'https://printjs.crabbly.com/images/print-01.jpg',
            ], type: 'image'
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
                    console.log(tableMeta)
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
    };

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
            </div>
        );
    };
}
export default withSnackbar(PrintView);

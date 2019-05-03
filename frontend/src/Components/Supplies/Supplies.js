import React from 'react';
import MUIDataTable from "mui-datatables";
import styles from './Supplies.module.css';
import ButtonAddToPrintQueue from './ButtonAddToPrintQueue';
import ButtonAddItem from './ButtonAddItem/ButtonAddItem'
import ButtonRemoveItem from './ButtonRemoveItem/ButtonRemoveItem';
import ButtonEditItem from './ButtonEditItem/ButtonEditItem';
import DialogEditItem from './DialogEditItem/DialogEditItem';
import DialogAddItem from './DialogAddItem/DialogAddItem';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '../Snackbar/SnackbarContentWrapper';
import PrintService from '../../services/PrintService';
import { withSnackbar } from 'notistack';
import { getItems, deleteItem, searchItems } from '../../services/inventoryService';
import SearchTool from './SearchTool/SearchTool';
import ButtonPrintQueue from './ButtonPrintQueue';



class Supplies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pageNumber: 1,
            itemsPerPage: 10,
            totalItemCount: 0,
            search: false,
            searchPhase: "",
            itemToEdit: {},
            openDialogEdit: false,
            openDialogAdd: false,
            openSnackbar: false,
            snackbarMessage: "",
            snackbarVariant: "info"
        };
    }

    updateData = ({ searchPhase, pageNumber, itemsPerPage } = {}) => {
        //if any of parameters not provided, use params of last update from state
        if (searchPhase === undefined && this.state.search) searchPhase = this.state.searchPhase;
        if (pageNumber === undefined) pageNumber = this.state.pageNumber;
        if (itemsPerPage === undefined) itemsPerPage = this.state.itemsPerPage;

        if (searchPhase === undefined || searchPhase === "") {
            getItems({ pageNumber, itemsPerPage })
                .then((res) => {
                    this.setState({
                        data: res.data.results,
                        totalItemCount: res.data.count,
                    });
                }).catch((err) => {
                    if (err.response.data.detail === "Invalid page." && this.state.pageNumber > 1) {
                        this.setState({
                            pageNumber: this.state.pageNumber - 1
                        }, this.updateData);
                    } else {
                        console.error(err);
                    }
                });
        } else {
            searchItems({ searchPhase, pageNumber, itemsPerPage })
                .then((res) => {
                    this.setState({
                        data: res.data.results,
                        totalItemCount: res.data.count,
                    });
                }).catch((err) => {
                    if (err.response.data.detail === "Invalid page." && pageNumber > 1) {
                        pageNumber -= 1;
                        this.setState({ pageNumber: pageNumber });
                        this.updateData({ searchPhase, pageNumber, itemsPerPage });
                    } else {
                        console.error(err);
                    }
                });
        }
    }

    onClickAddItem = () => {
        this.setState({
            openDialogAdd: true
        })
    }

    onClickDeleteRow = (rowId) => {
        deleteItem(this.state.data[rowId].id)
            .then((res) => {
                this.updateData();
                this.setState({
                    openSnackbar: true,
                    snackbarMessage: "Removed successfully!",
                    snackbarVariant: "success"
                });
            }).catch((err) => {
                console.error(err);
                this.setState({
                    openSnackbar: true,
                    snackbarMessage: "An error occurred!",
                    snackbarVariant: "error"
                });
            });
    }

    onClickEditRow = (rowId) => {
        this.setState({
            itemToEdit: this.state.data[rowId],
            openDialogEdit: true
        })
    }

    onClickDeleteSelected = (rowsDeleted) => {
        let allOk = true;
        let someOk = false;
        for (let key in rowsDeleted) {
            deleteItem(this.state.data[key].id)
                .then((res) => {
                    someOk = true;
                }).catch((err) => {
                    console.error(err);
                    allOk = false;
                });
        }

        this.updateData();

        if (allOk) {
            this.setState({
                snackbarMessage: "Removed successfully!",
                snackbarVariant: "success",
                openSnackbar: true
            })
        } else if (someOk) {
            this.setState({
                snackbarMessage: "A partial error occurred!",
                snackbarVariant: "error",
                openSnackbar: true
            })
        } else {
            this.setState({
                snackbarMessage: "An error occurred!",
                snackbarVariant: "error",
                openSnackbar: true
            })
        }
    }

    onClickPrint(rowId) {
        try {
            PrintService.addToQueue(this.state.data[rowId].id);
            this.props.enqueueSnackbar('Added to print queue', { variant: 'info' });
        } catch {
            this.props.enqueueSnackbar('Failed to add to print queue', { variant: 'error' });
        }
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

    onSearchOpen = () => {
        this.setState({ search: true })
    }

    onSearchChange = (searchPhase) => {
        this.setState({ searchPhase });
        this.updateData({ searchPhase });
    }

    onSearchClose = () => {
        this.setState({ searchPhase: "", search: false });
        this.updateData({ searchPhase: undefined });
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
            name: "state",
            label: "State",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    if (value.length > 20)
                        return value.slice(0, 17) + '...';
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
                                onClick={() => this.onClickDeleteRow(tableMeta.rowIndex)}
                            />
                            <ButtonEditItem
                                onClick={() => this.onClickEditRow(tableMeta.rowIndex)}
                            />
                            <ButtonAddToPrintQueue
                                onClick={() => this.onClickPrint(tableMeta.rowIndex)}
                            />
                        </React.Fragment>
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
            onSearchChange: this.onSearch,
            onSearchOpen: this.onSearchOpen,
            print: false,
            download: false,
            viewColumns: false,
            serverSide: true,

            pagination: true,
            count: totalItemCount,
            rowsPerPage: itemsPerPage,
            onChangePage: this.onChangePage,
            onChangeRowsPerPage: this.onChangeRowsPerPage,

            customToolbar: () => (
                <div className={styles.toolbar}>
                    <ButtonAddItem onClickAddItem={() => this.onClickAddItem()} />
                    <ButtonPrintQueue onClickPrint={() => this.props.history.push('/printing')} />
                    <SearchTool
                        onOpen={this.onSearchOpen}
                        onChange={this.onSearchChange}
                        onClose={this.onSearchClose}
                    />
                </div>
            ),
            onRowsDelete: (rows) => this.onClickDeleteSelected(rows.data)
        };

        return (
            <div className={styles.wrapper}>
                <header>
                    STOCK
                </header>

                <MUIDataTable
                    className={styles.table}
                    title={"Equipment"}
                    data={data}
                    columns={this.columns}
                    options={options} />

                <DialogAddItem
                    open={this.state.openDialogAdd}
                    onCancel={() => this.setState({ openDialogAdd: false })}
                    onSuccess={() => {
                        this.updateData();
                        this.showSnackbar("success", "Added successfully!");
                    }}
                    onFailure={() => this.showSnackbar("error", "An error occured!")}
                />

                <DialogEditItem
                    open={this.state.openDialogEdit}
                    item={this.state.itemToEdit}
                    onCancel={() => { this.setState({ openDialogEdit: false }) }}
                    onSuccess={() => {
                        this.updateData();
                        this.showSnackbar("success", "Saved successfully!");
                    }}
                    onFailure={() => this.showSnackbar("error", "An error occured!")}
                />

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

export default withSnackbar(Supplies);
import React from "react";
import styles from "./ReportDetails.module.css";

import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../Snackbar/SnackbarContentWrapper";
import ButtonGoBack from '../GoBackButton';
import ButtonCheck from "./ButtonCheck";
import ButtonExport from "./ButtonExport";
import ButtonClear from "./ButtonClear";
import ConfirmSwitch from "./ConfirmSwitch/ConfirmSwitch";
import ExportAsDialog from "./ExportAsDialog";

import {
  getReportsItems,
  partialUpdateReportItem,
  lastUpdated
} from "../../services/inventoryService";

export default class ReportDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      rowsSelected: [],
      reportId: Number(this.props.match.params.report_id),

      pageNumber: 1,
      itemsPerPage: 10,
      totalItemCount: 0,

      openSnackbar: false,
      snackbarMessage: "",
      snackbarVariant: "info",
      last_update: null,
      showExportDialog: false,
    };
  }

  pdfLocation = '/api/inventories/pdf/';
  csvLocation = '/api/inventories/csv/';

  updateData = ({ pageNumber, itemsPerPage } = {}) => {
    if (pageNumber === undefined) pageNumber = this.state.pageNumber;
    if (itemsPerPage === undefined) itemsPerPage = this.state.itemsPerPage;

    let { reportId } = this.state;

    getReportsItems({ reportId, pageNumber, itemsPerPage })
      .then(res => {
        //console.log(res);
        let data = [];
        for (const elem of res.data.results) {
          let { is_checked, supply, checked_by } = elem;
          checked_by = checked_by===null?"": checked_by.username;
          let { id, name, state, description } = supply;
          data.push({ id, name, state, description, is_checked, checked_by });
        }

        this.setState({
          data: data,
          totalItemCount: res.data.count
        });
      })
      .catch(err => {
        if (err.response !== undefined) {
          if (
            err.response.data.detail === "Invalid page." &&
            this.state.pageNumber > 1
          ) {
            let prevPage = this.state.pageNumber - 1;
            this.setState({ pageNumber: prevPage });
            this.updateData({ pageNumber: prevPage });
          }
        } else {
          console.error(err);
        }
      });
  };

  /*
  Method for automatic refresh of table content
  */
  async refresh() {
    let last_update = (await lastUpdated(this.state.reportId)).data.last_update
    if (last_update !== this.state.last_update) {
      this.setState({ last_update: last_update })
      this.updateData()
    }
    setTimeout(() => this.refresh(), 1000)
  }

  onChangePage = pageNumber => {
    pageNumber += 1;
    this.setState({
      pageNumber: pageNumber
    });
    this.updateData({ pageNumber });
  };

  onChangeRowsPerPage = changeRowsPerPage => {
    this.setState({
      pageNumber: 1,
      itemsPerPage: changeRowsPerPage
    });
    this.updateData({ pageNumber: 1, itemsPerPage: changeRowsPerPage });
  };

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
        console.error(`Snackbar type: '${type}' not supported!`);
        break;
    }
  };

  componentDidMount() {
    if (this.state.reportId === undefined) return;

    this.refresh()
  }

  setCheckedUnchecked = (row, value) => {
    let { reportId, data } = this.state;
    let supplyId = data[row].id;
    let newValue = !value;
    partialUpdateReportItem({ reportId, supplyId, is_checked: newValue })
      .then(res => {
        this.updateData();
      })
      .catch(err => {
        console.error(err);
        this.setState({
          openSnackbar: true,
          snackbarMessage: "An error occured!",
          snackbarVariant: "error"
        });
      });
  };

  setIsCheckedSelected = newValue => {
    let { reportId, data, rowsSelected } = this.state;

    let allOk = true;
    let someOk = false;
    for (let key in rowsSelected) {
      //Ommit API call if already checked
      if (data[rowsSelected[key].index].is_checked == newValue) continue;

      let supplyId = data[rowsSelected[key].index].id;
      partialUpdateReportItem({ reportId, supplyId, is_checked: newValue })
        .then(res => {
          someOk = true;
          this.updateData();
        })
        .catch(err => {
          console.error(err);
          allOk = false;
        });
    }

    if (allOk) {
      //nothing
    } else if (someOk) {
      this.setState({
        snackbarMessage: "Wystąpił częściowy błąd!",
        snackbarVariant: "error",
        openSnackbar: true
      });
    } else {
      this.setState({
        snackbarMessage: "An error occured!",
        snackbarVariant: "error",
        openSnackbar: true
      });
    }
  };


  showExportAsDialog() {
    this.setState({ showExportDialog: true });
  }

  columns = [
    {
      name: "is_checked",
      label: "State",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ConfirmSwitch
              confirmed={value}
              onClick={() =>
                this.setCheckedUnchecked(tableMeta.rowIndex, value)
              }
            />
          );
        }
      }
    },
    {
      name: "checked_by",
      label: "checked by"
    },
    {
      name: "id",
      label: "ID"
    },
    {
      name: "name",
      label: "Name"
    },
    {
      name: "state",
      label: "Contidion"
    },
    {
      name: "description",
      label: "Description"
    }
  ];

  render() {
    const { data, itemsPerPage, totalItemCount, reportId } = this.state;

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

      customToolbar: () => (
        <div className={styles.toolbar}>
          <ButtonGoBack history={this.props.history} />
          <ButtonExport
            tooltip="Export as..."
            onClick={() => this.showExportAsDialog()}
          />

        </div>
      ),
      customToolbarSelect: () => (
        <div className={styles.toolbar}>
          <ButtonCheck
            tooltip="Check all"
            onClick={() => this.setIsCheckedSelected(true)}
          />
          <ButtonClear
            tooltip="Uncheck all"
            onClick={() => this.setIsCheckedSelected(false)}
          />
        </div>
      ),
      onRowsSelect: (currentRowsSelected, allRowsSelected) => {
        this.setState({ rowsSelected: allRowsSelected });
      }
    };

    return (
      <div className={styles.wrapper}>
        <header>MAKERSPACE</header>
        <MUIDataTable
          className={styles.table}
          title={`Details of report #${reportId}`}
          data={data}
          columns={this.columns}
          options={options}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
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
        <ExportAsDialog reportId={this.state.reportId} open={this.state.showExportDialog} pdf={`${this.pdfLocation}${this.state.reportId}`} csv={`${this.csvLocation}${this.state.reportId}`} exit={() => this.setState({ showExportDialog: false })} />
      </div>
    );
  }
}

ReportDetails.defaultProps = {
  reportId: -1
};
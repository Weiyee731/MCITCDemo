import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import MerchantDetails from "./merchantDetails.component";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchBox from "../../components/SearchBox/SearchBox";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/lab/TabPanel';
// import TabContext from "@mui/lab/TabContext";
import Button from '@mui/material/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function mapStateToProps(state) {
  return {
    allpromocodes: state.counterReducer["promoCodes"],
    allstocks: state.counterReducer["products"],
    allmerchants: state.counterReducer["merchant"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetPromoCode: () => dispatch(GitAction.CallGetPromoCode()),
    CallDeletePromoCode: (promoCodeData) =>
      dispatch(GitAction.CallDeletePromoCode(promoCodeData)),
    // CallAllProductsByProductStatus: (prodData) =>
    //   dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    CallMerchants: () => dispatch(GitAction.CallMerchants()),
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    margin: "auto",
    padding: "1%",
    // paddingRight: "1%",
    marginTop: "15px",
  },
  table: {
    // margin: "20px",
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const headCells = [
  {
    id: "FirstName",
    numeric: false,
    disablePadding: true,
    label: "Representative Name",
  },
  {
    id: "CompanyName",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "CompanyContactNo",
    numeric: false,
    disablePadding: false,
    label: "Contact No.",
  },
  // {
  //   id: "CompanyPoscode",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Postcode",
  // },
  { id: "CompanyCity", numeric: false, disablePadding: false, label: "City" },
  {
    id: "CompanyState",
    numeric: false,
    disablePadding: false,
    label: "State",
  },
];

function DisplayTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DeletableTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DeletableTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
DisplayTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const DisplayTableToolbar = (props) => {
  const classes = useStyles();
  const { numSelected } = props;

  return <Toolbar className={clsx(classes.root)}></Toolbar>;
};

DisplayTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
class DisplayTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "PromoCodeID",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      deleteActive: false,
      searchFilter: "",
      tabvalue: "0"
    };

    this.ToggleDeletable = this.ToggleDeletable.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  onRowClick = (event, row, index) => {
    this.setState({
      name: row.CompanyName,
      companyContactNo: row.CompanyContactNo,
      firstName: row.FirstName,
      lastName: row.LastName,
      companyDescription: row.CompanyDescription,
      companyWebsite: row.CompanyWebsite,
      companyAddressLine1: row.CompanyAddressLine1,
      companyAddressLine2: row.CompanyAddressLine2,
      companyPoscode: row.CompanyPoscode,
      companyCity: row.CompanyCity,
      companyState: row.CompanyState,
      UserStatus: row.UserStatus,
      row: index,
      detailsShown: false,
    });

    if (this.state.detailsShown) {
      this.setState({
        detailsShown: false,
      });
    } else {
      this.setState({
        detailsShown: true,
      });
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangeDense = (event) => {
    this.setState({ dense: event.target.checked });
  };

  isSelected = (name) => {
    // this.state.selected.indexOf(name) !== -1;
  };

  ToggleDeletable() {
    this.setState((prevState, props) => {
      return { deleteActive: !prevState.deleteActive };
    });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ tabvalue: newValue });
  };

  render() {
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.Data.length - this.state.page * this.state.rowsPerPage
      );

    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",
      marginTop: "15px",
    };

    const table = {
      minWidth: 750,
    };

    var filteredProduct = [];

    const classes2 = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    };
    const setDetailsShown = (value) => {
      this.setState({
        detailsShown: value,
      });
    };

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
          <MerchantDetails
            data={this.state}
            data2={this.props}
            history={this.props.history}
            setDetailsShown={setDetailsShown}
          />
        ) : (
          <div>
            <h1>Merchants List</h1>
            <div>

              <SearchBox
                style={divStyle}
                placeholder="Search..."
                onChange={(e) => this.setState({ searchFilter: e.target.value })}
              />

              <div>
                {/* <TabContext value={this.state.tabvalue}>
                  <Tabs
                    // value={this.state.tabvalue}
                    value={this.state.tabvalue}
                    onChange={this.handleTabChange}
                  >
                    <Tab
                      value="0"
                      label="Approved Merchant"
                    />
                    <Tab label="Pending Merchant" value="1" />
                  </Tabs>

                  <TabPanel value="0" index={0}>
                    <Paper style={divStyle}>
                      <TableContainer>
                        <Table
                          className={table}
                          aria-labelledby="tableTitle"
                          size={this.state.dense ? "small" : "medium"}
                          aria-label="enhanced table"
                        >
                          <DisplayTableHead
                            classes={classes2}
                            numSelected={this.state.selected.length}
                            order={this.state.order}
                            orderBy={this.state.orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.Data.length}
                          />
                          {
                            this.props.Data.length > 0 && this.props.Data.filter((searchedItem) => (searchedItem.FirstName + " " + searchedItem.LastName).toLowerCase()
                              .includes(this.state.searchFilter))
                              .map((filteredItem) => { filteredProduct.push(filteredItem) })
                          }
                          <TableBody>
                            {stableSort(
                              filteredProduct,
                              getComparator(this.state.order, this.state.orderBy)
                            )
                              .slice(
                                this.state.page * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage +
                                this.state.rowsPerPage
                              )
                              .map((row, index) => {
                                const isItemSelected = this.isSelected(
                                  row.PromotionID
                                );
                                // const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                  <TableRow
                                    hover
                                    onClick={(event) =>
                                      this.onRowClick(event, row, index)
                                    }
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.UserID}
                                    selected={isItemSelected}
                                  >
                                    <TableCell align="left">
                                      {row.FirstName + " " + row.LastName}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyName}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyContactNo}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyCity}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyState}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow
                                style={{
                                  height: (this.state.dense ? 33 : 53) * emptyRows,
                                }}
                              >
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.props.Data.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                      />
                    </Paper>
                  </TabPanel>

                  <TabPanel value="1" index={1}>
                    <Paper style={divStyle}>
                      <TableContainer>
                        <Table
                          className={table}
                          aria-labelledby="tableTitle"
                          size={this.state.dense ? "small" : "medium"}
                          aria-label="enhanced table"
                        >
                          <DisplayTableHead
                            classes={classes2}
                            numSelected={this.state.selected.length}
                            order={this.state.order}
                            orderBy={this.state.orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.Data.length}
                          />
                          {
                            this.props.Data.length > 0 && this.props.Data.filter((searchedItem) => (searchedItem.FirstName + " " + searchedItem.LastName).toLowerCase()
                              .includes(this.state.searchFilter))
                              .map((filteredItem) => { filteredProduct.push(filteredItem) })
                          }
                          <TableBody>
                            {stableSort(
                              filteredProduct,
                              getComparator(this.state.order, this.state.orderBy)
                            )
                              .slice(
                                this.state.page * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage +
                                this.state.rowsPerPage
                              )
                              .map((row, index) => {
                                const isItemSelected = this.isSelected(
                                  row.PromotionID
                                );
                                return (
                                  <TableRow
                                    hover
                                    onClick={(event) =>
                                      this.onRowClick(event, row, index)
                                    }
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.UserID}
                                    selected={isItemSelected}
                                  >
                                    <TableCell align="left">
                                      {row.FirstName + " " + row.LastName}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyName}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyContactNo}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyCity}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.CompanyState}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow
                                style={{
                                  height: (this.state.dense ? 33 : 53) * emptyRows,
                                }}
                              >
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.props.Data.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                      />
                    </Paper>
                  </TabPanel>
                </TabContext> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class ViewMerchantsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      selection: [],
      selectAll: false,
      height: "300px",
      detailsShown: false,
      index: null,
      name: null,
      category: null,
      supplier: null,
      width: null,
      depth: null,
      weight: null,
      description: null,
      sku: null,
      brand: null,
      model: null,
      tags: null,
      grid: null,
      shoplot: null,
      productCategory: null,
      productSupplier: null,
      productGrid: null,
      productShoplot: null,
      productStatus: "Endorsed",
      backPage: "viewProduct",
    };

    this.props.CallGetPromoCode();
    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: this.state.productStatus,
    //   UserID: window.localStorage.getItem("id"),
    // });
    this.props.CallMerchants();
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <DisplayTable
          Data={this.props.allmerchants.length > 0 ? this.props.allmerchants : []}
          ProductProps={this.props}
          history={this.props.history}
        ></DisplayTable>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMerchantsComponent);

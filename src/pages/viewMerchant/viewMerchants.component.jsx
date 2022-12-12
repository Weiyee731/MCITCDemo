import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import MerchantDetails from "./merchantDetails.component";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBox from "../../components/SearchBox/SearchBox";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/core/TabPanel';
// import TabContext from "@mui/core/TabContext";

import { TabContext, TabPanel } from '@mui/lab';
import Button from '@mui/material/Button';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function mapStateToProps(state) {
  return {
    // allpromocodes: state.counterReducer["promoCodes"],
    // allstocks: state.counterReducer["products"],
    allmerchants: state.counterReducer["merchant"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // CallGetPromoCode: () => dispatch(GitAction.CallGetPromoCode()),
    // CallDeletePromoCode: (promoCodeData) =>
    //   dispatch(GitAction.CallDeletePromoCode(promoCodeData)),
    // CallAllProductsByProductStatus: (prodData) =>
    //   dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    CallMerchants: (prodData) => dispatch(GitAction.CallMerchants(prodData)),
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
        backgroundColor: theme.palette.secondary.light,
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
    label: "Shop Name",
  },
  {
    id: "CompanyContactNo",
    numeric: false,
    disablePadding: false,
    label: "Contact No.",
  },
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
      tabvalue: "0",
      filteredProduct: [],
      isFiltered: false
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
      userId: row.UserID,
      name: row.ShopName,
      companyContactNo: row.UserContactNo,
      firstName: row.FirstName,
      lastName: row.LastName,
      companyDescription: row.ShopDescription,
      companyWebsite: row.CompanyWebsite,
      companyAddressLine1: row.CompanyAddressLine1,
      companyAddressLine2: row.CompanyAddressLine2,
      companyPoscode: row.ShopPoscode,
      companyCity: row.ShopCity,
      companyState: row.ShopState,
      UserStatus: row.Userstatus,
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

  searchSpace = (value) => {
    this.state.filteredProduct.splice(0, this.state.filteredProduct.length)

    this.props.Data.filter((searchedItem) =>
      searchedItem.UserContactNo !== null && searchedItem.UserContactNo.includes(
        value
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    this.props.Data.filter((searchedItem) =>
      searchedItem.ShopName !== null && searchedItem.ShopName.toLowerCase().includes(
        value.toLowerCase()
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    this.props.Data.filter((searchedItem) => (searchedItem.FirstName + " " + searchedItem.LastName).toLowerCase()
      .includes(value.toLowerCase())).map((filteredItem) => {
        this.state.filteredProduct.push(filteredItem);
      })

    let removeDeplicate = this.state.filteredProduct.filter((ele, ind) => ind === this.state.filteredProduct.findIndex(elem => elem.UserID === ele.UserID))
    this.setState({ isFiltered: true, filteredProduct: removeDeplicate })
  }

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

    const TableHeading = () => {

      // let filteredList = []
      return (
        <>
          <DisplayTableHead
            classes={classes2}
            numSelected={this.state.selected.length}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
            rowCount={this.props.Data.length}
          />         
        </>
      )
    }
    const TableListing = (status) => {
      return (
        <TableBody>
          {stableSort(
            this.state.isFiltered === true ? this.state.filteredProduct : this.props.Data,
            getComparator(this.state.order, this.state.orderBy)
          )
            .slice(
              this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage +
              this.state.rowsPerPage
            )
            .filter((x) => x.Userstatus === status)
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
                    {row.ShopName}
                  </TableCell>
                  <TableCell align="left">
                    {row.UserContactNo}
                  </TableCell>
                  <TableCell align="left">
                    {row.ShopCity}
                  </TableCell>
                  <TableCell align="left">
                    {row.ShopState}
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
      )
    }

    const TableListingPagination = () => {
      return (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.props.Data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      )
    }

    return (
      <div style={{ margin: "2%" }}>
        {
          this.state.detailsShown ? (
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
                  placeholder="Search By Representive Name, Shop Name and Contact..."

                  onChange={e => this.searchSpace(e.target.value)}
                // onChange={(e) => this.setState({ searchFilter: e.target.value })}
                />

                <div>
                  <TabContext value={this.state.tabvalue}>
                    <Tabs
                      // value={this.state.tabvalue}
                      value={this.state.tabvalue}
                      onChange={this.handleTabChange}
                    >
                      <Tab value="0" label="Approved Merchant" />
                      <Tab label="Pending Merchant" value="1" />
                      <Tab label="Rejected Merchant" value="2" />
                      <Tab label="Terminated Merchant" value="3" />
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
                            {TableHeading()}
                            {TableListing("Endorsed")}
                          </Table>
                        </TableContainer>
                        {TableListingPagination()}
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
                            {TableHeading()}
                            {TableListing("Pending")}
                          </Table>
                        </TableContainer>
                        {TableListingPagination()}
                      </Paper>
                    </TabPanel>


                    <TabPanel value="2" index={2}>
                      <Paper style={divStyle}>
                        <TableContainer>
                          <Table
                            className={table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? "small" : "medium"}
                            aria-label="enhanced table"
                          >
                            {TableHeading()}
                            {TableListing("Rejected")}
                          </Table>
                        </TableContainer>
                        {TableListingPagination()}
                      </Paper>
                    </TabPanel>

                    <TabPanel value="3" index={3}>
                      <Paper style={divStyle}>
                        <TableContainer>
                          <Table
                            className={table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? "small" : "medium"}
                            aria-label="enhanced table"
                          >
                            {TableHeading()}
                            {TableListing("Terminate")}
                          </Table>
                        </TableContainer>
                        {TableListingPagination()}
                      </Paper>
                    </TabPanel>

                  </TabContext>
                </div>
              </div>
            </div>
          )
        }
      </div >
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
      userId: ""
    };

    // this.props.CallGetPromoCode();
    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: this.state.productStatus,
    //   UserID: window.localStorage.getItem("id"),
    // });
    this.props.CallMerchants({
      type: "Status",
      typeValue: "-",
      USERID: localStorage.getItem("id") ? localStorage.getItem("id") : 0,
      userRoleID: localStorage.getItem("roleid") ? localStorage.getItem("roleid") : 0,
      productPage: 999,
      page: 1
    });
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

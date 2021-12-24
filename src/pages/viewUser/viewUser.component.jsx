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
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import UserDetailsComponent from "../viewUserEndorsement/viewUserEndorsementDetails.component";
import SearchBox from "../../components/SearchBox/SearchBox";

function mapStateToProps(state) {
  return {
    allUser: state.counterReducer["currentUser"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // CallAllUsers: () => dispatch(GitAction.CallAllUsers()),
    CallUserProfile: (prodData) => dispatch(GitAction.CallUserProfile(prodData)),
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
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "UserContactNo",
    numeric: false,
    disablePadding: false,
    label: "Contact No.",
  },
  {
    id: "UserEmailAddress",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "ActiveInd",
    numeric: true,
    disablePadding: false,
    label: "ACTIVE IND",
  },
];

function DisplayTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
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
            align={"left"}
            // align={headCell.numeric ? "right" : "left"}
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

DisplayTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "productName",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      searchFilter: "",
      isFiltered: false,
      filteredProduct: []
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  onRowClick = (event, row) => {
    // alert(JSON.stringify(row));
    this.setState({
      name: row,
      firstName: row.FirstName,
      lastName: row.LastName,
      userContact: row.UserContactNo,
      companyDesc: row.CompanyDescription,
      companyName: row.CompanyName,
      companyWebsite: row.CompanyWebsite,
      companyAddressLine1: row.CompanyAddressLine1,
      companyAddressLine2: row.CompanyAddressLine2,
      companyPoscode: row.CompanyPosCode,
      companyCity: row.CompanyCity,
      companyState: row.CompanyState,
      // category: row.ProductCategoryID,
      // height: row.ProductDimensionHeight,
      // weight: row.ProductWeight,
      // depth: row.ProductDimensionDeep,
      // width: row.ProductDimensionWidth,
      // sku: row.SKU,
      // productSupplier: row.SupplierID,
      // productCategory: row.ProductCategoryID,
      // description: row.ProductDescription,
      // model: row.Model,
      // brand: row.Brand,
      // tags: row.ProductTag,
      // supplier: row.SupplierID,
      // grid: row.GridStorageID,
      // shoplot: row.ShoplotID,
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


  searchSpace = (value) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    this.state.filteredProduct.splice(0, this.state.filteredProduct.length)

    this.props.Data.filter((searchedItem) =>
      searchedItem.FirstName !== null && searchedItem.FirstName.toLowerCase().includes(
        value.toLowerCase()
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    this.props.Data.filter((searchedItem) =>
      searchedItem.LastName !== null && searchedItem.LastName.toLowerCase().includes(
        value.toLowerCase()
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    this.props.Data.filter((searchedItem) =>
      searchedItem.UserContactNo !== null && searchedItem.UserContactNo.toLowerCase().includes(
        value.toLowerCase()
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    this.props.Data.filter((searchedItem) =>
      searchedItem.UserEmailAddress !== null && searchedItem.UserEmailAddress.toLowerCase().includes(
        value.toLowerCase()
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    let removeDuplicate = this.state.filteredProduct.filter((ele, ind) => ind === this.state.filteredProduct.findIndex(elem => elem.UserID === ele.UserID))
    this.setState({ isFiltered: true, filteredProduct: removeDuplicate })
  }

  render() {
    const { classes } = this.props;
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
      // paddingRight: "1%",
      marginTop: "15px",
    };

    const table = {
      // margin: "20px",
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

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
          <UserDetailsComponent
            data={this.state}
          />
        ) :
          (
            <div>
              <h1>User List</h1>
              <SearchBox
                style={divStyle}
                placeholder="Search By Name, Phone and Email ..."
                onChange={e => this.searchSpace(e.target.value)}
              />
              <div>
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
                      <TableBody>
                        {stableSort(
                          this.state.isFiltered ? this.state.filteredProduct : this.props.Data,
                          getComparator(this.state.order, this.state.orderBy)
                        )
                          .slice(
                            this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                          )
                          .map((row, index) => {
                            return (
                              <TableRow
                                hover
                                onClick={(event) => this.onRowClick(event, row)}
                                role="checkbox"
                                tabIndex={-1}
                                key={row.UserID}
                              >
                                <TableCell align="left">
                                  {row.FirstName + " " + row.LastName}
                                </TableCell>
                                <TableCell align="left">
                                  {row.UserContactNo}
                                </TableCell>
                                <TableCell align="left">
                                  {row.UserEmailAddress}
                                </TableCell>
                                <TableCell align="left">
                                  {row.ActiveInd === 1 ? "ACTIVE" : "NON-ACTIVE"}
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
                    count={ this.state.isFiltered ? this.state.filteredProduct.length : this.props.Data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          )}
      </div>
    );
  }
}

class ViewUserComponent extends Component {
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
      height: null,
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
    };
  }

  componentDidMount() {
    this.props.CallUserProfile({
      TYPE: "Usertype",
      TYPEVALUE: 17,
      USERID: localStorage.getItem("id") ? localStorage.getItem("id") : 0,
      USERROLEID: localStorage.getItem("roleid") ? localStorage.getItem("roleid") : 0,
      LISTPERPAGE: 999,
      PAGE: 1
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.reviews !== this.props.reviews) {

  //   }
  // }

  componentWillUnmount() {
    clearImmediate(this.props.allUser)
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <DisplayTable
          Data={this.props.allUser.length > 0 &&
            this.props.allUser !== undefined &&
            this.props.allUser[0].ReturnVal !== "0" ? this.props.allUser : []}
          // Data={this.props.allUser}
          ProductProps={this.props}
        ></DisplayTable>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserComponent);

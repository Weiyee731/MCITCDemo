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
    allUser: state.counterReducer["supplier"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllUsers: () => dispatch(GitAction.CallAllUsers()),
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
    id: "Payment Type",
    numeric: false,
    disablePadding: false,
    label: "Payment Type",
  },
  {
    id: "Purchase Item",
    numeric: true,
    disablePadding: false,
    label: "Purchase Item",
  },
];

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
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

DisplayTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function DeletableTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.Data.map((n) => n.ProductName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.Data.length - page * rowsPerPage);

  // props.Data.map((d, i) => {
  //   d.Picture = (
  //     <div>
  //       <img
  //         height={50}
  //         src={
  //           JSON.parse(d.ProductImages)
  //             ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
  //             : ""
  //         }
  //       />
  //     </div>
  //   );
  // });

  return (
    <div>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <DeletableTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.Data.length}
            />
            <TableBody>
              {stableSort(props.Data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ProductID);
                  // const isItemSelected = isSelectedID(row.ProductID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.ProductID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ProductID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {row.FirstName + " " + row.LastName}
                      </TableCell>
                      <TableCell align="left">{row.UserContactNo}</TableCell>
                      <TableCell align="left">{row.CompanyName}</TableCell>
                      <TableCell align="left">{row.CompanyContactNo}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.Data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

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
      deleteActive: false,
      searchFilter: "",
    };

    this.ToggleDeletable = this.ToggleDeletable.bind(this);
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

  ToggleDeletable() {
    this.setState((prevState, props) => {
      return { deleteActive: !prevState.deleteActive };
    });
  }

  render() {
    const { classes } = this.props;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.Data.length - this.state.page * this.state.rowsPerPage
      );
    // this.props.Data.map((d, i) => {
    //   d.Picture = (
    //     <div>
    //       <img
    //         height={50}
    //         src={
    //           JSON.parse(d.ProductImages)
    //             ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
    //             : ""
    //         }
    //       />
    //     </div>
    //   );
    // });

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

    const filteredSupplier = [];

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
          // "<ProductDetailsComponent data={this.state} data2={this.props} />"
          <UserDetailsComponent
            userData={this.props.allUser}
            data={this.state}
          />
        ) : this.state.deleteActive ? (
          <div>
            <h1>User List</h1>
            <SearchBox
              style={divStyle}
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
            {this.props.Data.filter(
              (searchedItem) =>
                searchedItem.FirstName.toLowerCase().includes(
                  this.state.searchFilter
                ) ||
                searchedItem.LastName.toLowerCase().includes(
                  this.state.searchFilter
                )
            ).map((filteredItem) => {
              filteredSupplier.push(filteredItem);
            })}
            <DeletableTable
              Data={filteredSupplier}
              ProductProps={this.props.ProductProps}
            ></DeletableTable>
          </div>
        ) : (
          <div>
            <h1>User List</h1>
            <SearchBox
              style={divStyle}
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
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
                    {this.props.Data.filter(
                      (searchedItem) =>
                        searchedItem.FirstName.toLowerCase().includes(
                          this.state.searchFilter
                        ) ||
                        searchedItem.LastName.toLowerCase().includes(
                          this.state.searchFilter
                        )
                    ).map((filteredItem) => {
                      filteredSupplier.push(filteredItem);
                    })}
                    <TableBody>
                      {stableSort(
                        filteredSupplier,
                        getComparator(this.state.order, this.state.orderBy)
                      )
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = this.isSelected(
                            row.ProductName
                          );
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => this.onRowClick(event, row)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.ProductName}
                              selected={isItemSelected}
                            >
                              <TableCell align="left">
                                {row.FirstName + " " + row.LastName}
                              </TableCell>
                              <TableCell align="left">
                                {row.UserContactNo}
                              </TableCell>
                              <TableCell align="left">
                                {row.CompanyName}
                              </TableCell>
                              <TableCell align="left">
                                {row.CompanyContactNo}
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
                  count={filteredSupplier.length}
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
    this.props.CallAllUsers();

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

  render() {
    // console.log(this.props.allUser);
    return (
      <div style={{ width: "100%" }}>
        <DisplayTable
          Data={this.props.allUser}
          ProductProps={this.props}
        ></DisplayTable>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserComponent);

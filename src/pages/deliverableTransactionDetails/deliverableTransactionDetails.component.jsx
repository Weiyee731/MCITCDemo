import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Card, CardContent, CardActions } from "@mui/material";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import SearchBox from "../../components/SearchBox/SearchBox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";

function mapStateToProps(state) {
  return {
    // allDeliverableList: state.counterReducer["account"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUpdateOrderProductStatus: (propsData) =>
      dispatch(GitAction.CallUpdateOrderProductStatus(propsData)),
  };
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
    id: "ProductImage",
    numeric: false,
    // disablePadding: true,
    label: "Product Image",
  },
  {
    id: "ProductName",
    numeric: false,
    // disablePadding: true,
    label: "Product Name",
  },
  {
    id: "ProductQuantity",
    numeric: true,
    // disablePadding: false,
    label: "Quantity",
  },
  {
    id: "ProductSellingPrice",
    numeric: true,
    // disablePadding: false,
    label: "Price per Unit",
  },
  {
    id: "total",
    numeric: true,
    // disablePadding: false,
    label: "Total",
  },
  {
    id: "ProductStatus",
    numeric: true,
    // disablePadding: false,
    label: "Remark",
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
            padding={headCell.disablePadding ? "none" : "default"}
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
class DisplayTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "OrderID",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      deleteActive: false,
      searchFilter: "",
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

  onRowClick = (event, row, index) => {
    this.setState({
      name: row.ProductName,
      productSellingPrice: row.ProductSellingPrice,
      Total: row.QuantityPerUnit * row.ProductSellingPrice,
      orderProductDetail: row.OrderProductDetail,
      quantity: row.ProductQuantity,
      orderID: row.OrderID,
      row: index,
      fullName: row.UserFullName,
      phoneNumber: row.UserContactNo,
      email: row.UserEmailAddress,
      address: row.UserAddressLine1,
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

  isSelected = (name) => { };

  onDelivery = (row) => {
    this.props.propsData.CallUpdateOrderProductStatus(row);
  };

  render() {
    const { classes } = this.props;

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
    if (this.props.Data) {
      this.props.Data.map((d, i) => {
        d.Picture = (
          <div>
            <img
              height={50}
              src={
                JSON.parse(d.ProductImages)
                  ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
                  : ""
              }
            />
          </div>
        );
      });
    }

    return (
      <div style={{ margin: "2%" }}>
        <div>
          <SearchBox
            style={divStyle}
            placeholder="Search..."
            onChange={(e) => this.setState({ searchFilter: e.target.value })}
          />
          <div>
            <Paper style={divStyle}>
              <TableContainer style={{ maxHeight: "300px" }}>
                <Table
                  className={table}
                  aria-labelledby="tableTitle"
                  size={this.state.dense ? "small" : "medium"}
                  aria-label="enhanced table"
                  stickyHeader
                >
                  <DisplayTableHead
                    classes={classes2}
                    numSelected={this.state.selected.length}
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    onRequestSort={this.handleRequestSort}
                    rowCount={this.props.Data ? this.props.Data.length : 0}
                  />
                  {this.props.Data
                    ? this.props.Data.filter((searchedItem) =>
                      searchedItem.ProductName.toLowerCase().includes(
                        this.state.searchFilter
                      )
                    ).map((filteredItem) => {
                      filteredProduct.push(filteredItem);
                    })
                    : null}
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
                        const isItemSelected = this.isSelected(row.ProductID);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            style={{
                              backgroundColor:
                                row.ProductStatus == "Not yet Deliver"
                                  ? "#F1948A"
                                  : "#FFFFFF",
                            }}
                            onClick={(event) =>
                              this.onRowClick(event, row, index)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.ProductID}
                            selected={isItemSelected}
                          >
                            <TableCell align="left">{row.Picture}</TableCell>
                            <TableCell align="left">
                              {row.ProductName}
                            </TableCell>
                            <TableCell align="right">
                              {row.ProductQuantity}
                            </TableCell>
                            <TableCell align="right">
                              {row.ProductSellingPrice}
                            </TableCell>
                            <TableCell align="right">
                              {row.ProductQuantity * row.ProductSellingPrice}
                            </TableCell>
                            <TableCell align="right">
                              {row.ProductStatus}
                            </TableCell>
                            <TableCell align="right">
                              {row.ProductStatus == "Not yet Deliver" ? (
                                <button
                                  type="submit"
                                  onClick={() => this.onDelivery(row)}
                                  className="btn btn-primary mt-2 mt-md-3 mt-lg-4"
                                >
                                  Deliver
                                </button>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={this.props.Data ? this.props.Data.length : 0}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

class DeliverableTransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionName: this.props.data.name,
      username: this.props.data.username,
      userFullName: this.props.data.fullName,
      userContactNo: this.props.data.phoneNumber,
      userEmailAddress: this.props.data.email,
      userAddressLine1: this.props.data.address,
      paymentMethod: this.props.data.PaymentMethod,
      trackingStatus: this.props.data.TrackingStatus,
      orderProductDetail: this.props.data.orderProductDetail,
    };
  }

  handleChange = () => { };

  render() {
    const back = () => {
      this.props.setDetailsShown(false);
    };
    return (
      <div>
        <h2>Deliver Order</h2>
        <Button onClick={back.bind(this)}>
          <i class="fas fa-chevron-left"></i>Back
        </Button>
        <Card
          style={{
            width: this.props.forMerchants ? "100%" : "80%",
            margin: "0 auto",
          }}
        >
          <CardContent>
            <FormControl style={{ width: "100%", marginTop: "5px" }}>
              <InputLabel htmlFor="component-simple">Order Name</InputLabel>
              <Input
                id="component-simple"
                value={this.state.transactionName}
                onChange={this.handleChange}
                readOnly
              />
            </FormControl>
            {!this.props.forMerchants ? (
              <div style={{ width: "100%" }}>
                <h5 style={{ marginTop: "10px" }}>User Details</h5>
                <FormControl style={{ width: "100%", marginTop: "5px" }}>
                  <InputLabel htmlFor="component-simple">Username</InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.username}
                    onChange={this.handleChange}
                    readOnly
                  />
                </FormControl>
                <FormControl style={{ width: "100%", marginTop: "5px" }}>
                  <InputLabel htmlFor="component-simple">Full Name</InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.userFullName}
                    onChange={this.handleChange}
                    readOnly
                  />
                </FormControl>
                <div
                  style={{ width: "100%", display: "flex", marginTop: "5px" }}
                >
                  <FormControl style={{ width: "100%", marginRight: "5px" }}>
                    <InputLabel htmlFor="component-simple">
                      Contact No.
                    </InputLabel>
                    <Input
                      id="component-simple"
                      value={this.state.userContactNo}
                      onChange={this.handleChange}
                      readOnly
                    />
                  </FormControl>
                  <FormControl style={{ width: "100%", marginLeft: "5px" }}>
                    <InputLabel htmlFor="component-simple">Email</InputLabel>
                    <Input
                      id="component-simple"
                      value={this.state.userEmailAddress}
                      onChange={this.handleChange}
                      readOnly
                    />
                  </FormControl>
                </div>
                <FormControl style={{ width: "100%", marginTop: "5px" }}>
                  <InputLabel htmlFor="component-simple">
                    Address Line 1
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.userAddressLine1}
                    onChange={this.handleChange}
                    readOnly
                  />
                </FormControl>
              </div>
            ) : null}
            <h5 style={{ marginTop: "10px" }}>Products Ordered</h5>
            <DisplayTable
              propsData={this.props}
              Data={JSON.parse(this.state.orderProductDetail)}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliverableTransactionDetails);

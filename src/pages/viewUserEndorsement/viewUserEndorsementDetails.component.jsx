import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Card, CardContent, CardActions } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchBox from "../../components/SearchBox/SearchBox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionDetails from "../transactionDetails/transactionDetails.component";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

function mapStateToProps(state) {
  return {
    allmerchantorders: state.counterReducer["merchantOrders"],
    allpromocodes: state.counterReducer["promoCodes"],
    allstocks: state.counterReducer["products"],
    // alltransactions: state.counterReducer["transactions"],
    alltransactionstatus: state.counterReducer["transactionStatus"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetMerchantsOrders: (propsData) =>
      dispatch(GitAction.CallGetMerchantsOrders(propsData)),
    CallGetTransaction: (transactionData) =>
      dispatch(GitAction.CallGetTransaction(transactionData)),
    CallDeletePromoCode: (promoCodeData) =>
      dispatch(GitAction.CallDeletePromoCode(promoCodeData)),
    CallAllProductsByProductStatus: (prodData) =>
      dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    CallGetTransactionStatus: () =>
      dispatch(GitAction.CallGetTransactionStatus()),
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
    id: "OrderName",
    numeric: false,
    disablePadding: true,
    label: "Order Name",
  },
  {
    id: "Username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "PaymentMethod",
    numeric: false,
    disablePadding: false,
    label: "Payment Method",
  },
  {
    id: "TrackingStatus",
    numeric: false,
    disablePadding: false,
    label: "Tracking Status",
  },
  {
    id: "OrderProductDetail",
    numeric: false,
    disablePadding: false,
    label: "No. of Products",
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

DisplayTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const DeletableTableToolbar = (props) => {
  const classes = useStyles();

  const { numSelected } = props;

  const onDeleteProduct = () => {
    console.log(props.selectedData);
    props.ProductProps.CallDeletePromoCode(props.selectedData);
    setTimeout(
      function () {
        window.location.reload(false);
      }.bind(this),
      500
    );
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          // variant="h6"
          id="tableTitle"
          component="div"
        >
          Please select the promo codes that you want to delete.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              onDeleteProduct();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

const DisplayTableToolbar = (props) => {
  const classes = useStyles();
  const { numSelected } = props;

  return <Toolbar className={clsx(classes.root)}></Toolbar>;
};

DeletableTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

DisplayTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
      name: row.OrderName,
      PaymentMethod: row.PaymentMethod,
      TrackingStatus: row.TrackingStatus,
      orderProductDetail: row.OrderProductDetail,
      username: row.Username,
      orderID: row.OrderID,
      row: index,
      fullName: row.UserFullName,
      phoneNumber: row.UserContactNo,
      email: row.UserEmailAddress,
      address: row.UserAddressLine1,
      detailsShown: false,
    });
    console.log(this.props.Data[index]);

    if (this.state.detailsShown) {
      this.setState({
        detailsShown: false,
      });
      //   this.props.setTabsHidden(false);
    } else {
      this.setState({
        detailsShown: true,
      });
      //   this.props.setTabsHidden(true);
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

  setDetailsShown = (value) => {
    //   if (this.state.detailsShown == true) {
    //     this.setState({
    //       detailsShown: false,
    //     });
    //   } else if (this.state.detailsShown == false) {
    //     this.setState({
    //       detailsShown: true,
    //     });
    //   }
    this.setState({
      detailsShown: value,
    });
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

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
          <TransactionDetails
            data={this.state}
            data2={this.props}
            history={this.props.history}
            forMerchants={true}
            setDetailsShown={this.setDetailsShown}
          />
        ) : (
          <div>
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
                    {this.props.Data.filter((searchedItem) =>
                      searchedItem.OrderName.toLowerCase().includes(
                        this.state.searchFilter
                      )
                    ).map((filteredItem) => {
                      filteredProduct.push(filteredItem);
                    })}
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
                          const isItemSelected = this.isSelected(row.Username);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) =>
                                this.onRowClick(event, row, index)
                              }
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.Username}
                              selected={isItemSelected}
                            >
                              <TableCell align="center">
                                {row.OrderName}
                              </TableCell>
                              <TableCell align="left">{row.Username}</TableCell>
                              <TableCell align="left">
                                {row.PaymentMethod}
                              </TableCell>
                              <TableCell align="left">
                                {row.TrackingStatus}
                              </TableCell>
                              <TableCell align="left">
                                {row.OrderProductDetail ? (
                                  <p>
                                    {JSON.parse(row.OrderProductDetail).length}
                                  </p>
                                ) : (
                                  0
                                )}
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

class UserDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // companyName: this.props.data.name,
      userContact: this.props.data.userContact,
      firstName: this.props.data.firstName,
      lastName: this.props.data.lastName,
      companyDescription: this.props.data.companyDescription,
      companyWebsite: this.props.data.companyWebsite,
      companyAddressLine1: this.props.data.companyAddressLine1,
      companyAddressLine2: this.props.data.companyAddressLine2,
      companyPoscode: this.props.data.companyPoscode,
      companyCity: this.props.data.companyCity,
      companyState: this.props.data.companyState,
      trackingStatus: "In Cart",
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
      productStatus: "Endorsed",
      backPage: "viewProduct",
      value: 0,
      tabsHidden: false,
    };
    this.props.CallGetTransactionStatus();
    this.props.CallGetTransaction("In Cart");
    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: this.state.productStatus,
    //   Username: window.localStorage.getItem("id"),
    // });

    this.props.CallGetMerchantsOrders({
      trackingStatus: this.state.trackingStatus,
      UserID: window.localStorage.getItem("id"),
    });
  }

  handleChange = (data, e) => { };
  render() {
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    function a11yProps(index) {
      return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
      };
    }

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-auto-tabpanel-${index}`}
          aria-labelledby={`scrollable-auto-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    console.log(this.props.allmerchantorders);
    const back = () => {
      //   window.location.reload(false);
      this.props.setDetailsShown(false);
    };

    let allTransactionStatusData = this.props.alltransactionstatus
      ? Object.keys(this.props.alltransactionstatus).map((key) => {
        console.log(this.props.alltransactionstatus);
        return this.props.alltransactionstatus[key];
      })
      : {};

    if (allTransactionStatusData.length > 0) {
      console.log(allTransactionStatusData);
      var generateTabs = allTransactionStatusData.map((status, i) => {
        return (
          <Tab
            label={status.TrackingStatus}
            {...a11yProps(i)}
          // onClick={changeData.bind(this, status.TrackingStatus)}
          />
        );
      });
      var generatePanels = allTransactionStatusData.map((status, i) => {
        var transactionList = this.props.allmerchantorders;
        transactionList = transactionList.filter(
          (items) =>
            items.TrackingStatus == allTransactionStatusData[i].TrackingStatus
        );
        console.log(transactionList);
        return (
          <TabPanel value={this.state.value} index={i}>
            <DisplayTable
              Data={transactionList}
              ProductProps={this.props}
              history={this.props.history}
              tabsHidden={this.state.tabsHidden}
              setTabsHidden={this.setTabsHidden}
            ></DisplayTable>
          </TabPanel>
        );
      });
    }

    return (
      <div>
        <h2>User Details</h2>
        <Button onClick={back}>
          <i class="fas fa-chevron-left"></i>Back
        </Button>
        <Card style={{ width: "80%", margin: "0 auto" }}>
          <CardContent>
            {/* <h5>Representative Details</h5> */}
            <div style={{ display: "flex", width: "100%" }}>
              <FormControl style={{ width: "100%", marginRight: "5px" }}>
                <InputLabel htmlFor="component-simple">First Name</InputLabel>
                <Input
                  id="component-simple"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  readOnly
                />
              </FormControl>
              <FormControl style={{ width: "100%", marginLeft: "5px" }}>
                <InputLabel htmlFor="component-simple">Last Name</InputLabel>
                <Input
                  id="component-simple"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  readOnly
                />
              </FormControl>
            </div>
            {/* <h5 style={{ marginTop: "5px" }}>Company Details</h5> */}
            {/* <FormControl style={{ width: "100%", marginTop: "5px" }}>
              <InputLabel htmlFor="component-simple">Company Name</InputLabel>
              <Input
                id="component-simple"
                value={this.state.companyName}
                onChange={this.handleChange}
                readOnly
              />
            </FormControl> */}
            <FormControl style={{ width: "100%", marginTop: "5px" }}>
              <InputLabel htmlFor="component-simple">Contact No.</InputLabel>
              <Input
                id="component-simple"
                value={this.state.userContact}
                onChange={this.handleChange}
                readOnly
              />
            </FormControl>
            <FormControl style={{ width: "100%", marginTop: "5px" }}>
              <InputLabel htmlFor="component-simple">Website</InputLabel>
              <Input
                id="component-simple"
                value={this.state.companyWebsite}
                onChange={this.handleChange}
                readOnly
              />
            </FormControl>
            <FormControl style={{ width: "100%", marginTop: "5px" }}>
              <InputLabel htmlFor="component-simple">Address Line 1</InputLabel>
              <Input
                id="component-simple"
                value={this.state.companyAddressLine1}
                onChange={this.handleChange}
                readOnly
              />
            </FormControl>
            <FormControl style={{ width: "100%", marginTop: "5px" }}>
              <InputLabel htmlFor="component-simple">Address Line 2</InputLabel>
              <Input
                id="component-simple"
                value={this.state.companyAddressLine2}
                onChange={this.handleChange}
                readOnly
              />
            </FormControl>
            <div style={{ display: "flex", width: "100%", marginTop: "5px" }}>
              <FormControl style={{ width: "100%", marginRight: "5px" }}>
                <InputLabel htmlFor="component-simple">City</InputLabel>
                <Input
                  id="component-simple"
                  value={this.state.companyCity}
                  onChange={this.handleChange}
                  readOnly
                />
              </FormControl>
              <FormControl style={{ width: "100%", marginLeft: "5px" }}>
                <InputLabel htmlFor="component-simple">State</InputLabel>
                <Input
                  id="component-simple"
                  value={this.state.companyState}
                  onChange={this.handleChange}
                  readOnly
                />
              </FormControl>
            </div>
            {/* <TextField
              style={{ width: "100%", marginTop: "5px" }}
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rowsMax={4}
              value={this.state.companyDescription}
              onChange={this.handleChange}
              inputProps={{ readonly: true }}
            /> */}
            <h5 style={{ marginTop: "5px" }}>Purchase Order History</h5>
            {/* <DisplayTable Data={JSON.parse(this.props.data.promoCodeDetail)} /> */}
            <div style={{ width: "100%" }}>
              {!this.state.detailsShown ? (
                <AppBar position="static" color="default">
                  <Tabs
                    value={this.state.value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    {generateTabs}
                  </Tabs>
                </AppBar>
              ) : null}
              {generatePanels}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsComponent);

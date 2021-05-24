import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import ProductPurchaseOrderComponent from "../productPurchaseOrder/productPurchaseOrder.component";
import ProductPurchaseOrderDetailsComponent from "../productPurchaseOrderDetails/productPurchaseOrderDetails.component";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";

function mapStateToProps(state) {
  return {
    quotations: state.counterReducer["quotations"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallViewProductQuotation: (propsData) =>
      dispatch(GitAction.CallViewProductQuotation(propsData)),
    CallDeletePurchaseOrder: (orderData) =>
      dispatch(GitAction.CallDeletePurchaseOrder(orderData)),
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
    id: "ProductQuotationCode",
    numeric: false,
    disablePadding: true,
    label: "Product Quotation Code",
    // label: "Grid Storage Code",
  },
  {
    id: "CompanyName",
    numeric: false,
    disablePadding: false,
    label: "Company Name",
    // label: "Rental Price (Month)",
  },
  {
    id: "CompanyCity",
    numeric: false,
    disablePadding: false,
    label: "Company City",
    // label: "Rental Price (Month)",
  },
  {
    id: "ProductQuotationStatus",
    numeric: false,
    disablePadding: false,
    label: "Status",
    // label: "Shoplot ID",
  },
  {
    id: "CreatedDate",
    numeric: true,
    disablePadding: false,
    label: "Created Date",
    // label: "Rental Price (Month)",
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
            inputProps={{ "aria-label": "select all Purchase Order" }}
          />
        </TableCell>
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

const DeletableTableToolbar = (props) => {
  const classes = useStyles();

  const { numSelected } = props;

  const onDeleteGridStorage = () => {
    console.log(props);
    props.ProductProps.CallDeletePurchaseOrder(props.selectedData);
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
          Please select the Purchase Order that you want to delete.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              onDeleteGridStorage();
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

function DeletableTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Number");
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
      const newSelecteds = props.Data.map((n) => n.ProductPurchaseOrderID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.Data.length - page * rowsPerPage);

  return (
    <div>
      <Paper className={classes.paper}>
        <DeletableTableToolbar
          numSelected={selected.length}
          selectedData={selected}
          ProductProps={props.ProductProps}
        />
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
                  const isItemSelected = isSelected(row.ProductPurchaseOrderID);
                  // const isItemSelected = isSelectedID(row.ProductID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.ProductPurchaseOrderID)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ProductPurchaseOrderID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {/* <TableCell align="center">{row.Picture}</TableCell> */}
                      <TableCell align="center">
                        {row.ProductPurchaseOrderCode}
                      </TableCell>
                      <TableCell align="center">{row.CompanyName}</TableCell>
                      <TableCell align="center">{row.CompanyCity}</TableCell>
                      <TableCell align="center">
                        {row.ProductPurchaseOrderStatus}
                      </TableCell>
                      <TableCell align="center">{row.CreatedDate}</TableCell>
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
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
      orderBy: "Number",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      deleteActive: false,
      toBeEdited: false,
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
    this.setState({
      ProductPurchaseOrderID: row.ProductQuotationID,
      ProductPurchaseOrderCode: row.ProductQuotationCode,
      ProductPurchaseOrderStatus: row.ProductQuotationStatus,
      CreatedDate: row.CreatedDate,
      MerchantID: row.MerchantID,
      CompanyName: row.CompanyName,
      CompanyContactNo: row.CompanyContactNo,
      CompanyWebsite: row.CompanyWebsite,
      CompanyAddressLine1: row.CompanyAddressLine1,
      CompanyAddressLine2: row.CompanyAddressLine2,
      CompanyPoscode: row.CompanyPoscode,
      CompanyCity: row.CompanyCity,
      CompanyState: row.CompanyState,
      CompanyCountryID: row.CompanyCountryID,
      ProductPurchaseOrderDetail: row.ProductQuotationDetail,
    });

    console.log(row.ProductPurchaseOrderDetail);

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

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
          <ProductPurchaseOrderDetailsComponent
            pageTitle={"Quotation Detail"}
            data={this.state}
            data2={this.props}
          />
        ) : this.state.deleteActive ? (
          <div>
            {/* <h1>Purchase Order List</h1> */}
            <div>
              <Button>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <Link className="nav-link" to={"/viewProductQuotation"}>
                  Create new Quotation
                </Link>
              </Button>

              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.deleteActive}
                    onChange={this.ToggleDeletable}
                  />
                }
                label="Delete"
                style={{
                  float: "right",
                  marginRight: "3%",
                }}
              />
            </div>
            <DeletableTable
              Data={this.props.Data}
              ProductProps={this.props.ProductProps}
            ></DeletableTable>
          </div>
        ) : (
          <div>
            {/* <h1>Purchase Order List</h1> */}
            <div>
              <Button>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <Link className="nav-link" to={"/viewProductQuotation"}>
                  Create new Quotation
                </Link>
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.deleteActive}
                    onChange={this.ToggleDeletable}
                  />
                }
                label="Delete"
                style={{
                  float: "right",
                  marginRight: "3%",
                }}
              />
            </div>
            <div>
              <Paper style={divStyle}>
                <DisplayTableToolbar numSelected={this.state.selected.length} />
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
                        this.props.Data,
                        getComparator(this.state.order, this.state.orderBy)
                      )
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = this.isSelected(row.Number);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => this.onRowClick(event, row)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.Number}
                              selected={isItemSelected}
                            >
                              <TableCell align="center">
                                {row.ProductQuotationCode}
                              </TableCell>
                              <TableCell align="center">
                                {row.CompanyName}
                              </TableCell>
                              <TableCell align="center">
                                {row.CompanyCity}
                              </TableCell>
                              <TableCell align="center">
                                {row.ProductQuotationStatus}
                              </TableCell>
                              <TableCell align="center">
                                {row.CreatedDate}
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
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class QuotationListComponent extends Component {
  constructor(props) {
    super(props);
    // this.props.callAllGridStorages();
    this.props.CallViewProductQuotation({
      USERID: window.localStorage.getItem("id"),
    });

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
      productStatus: "Endorsed",
      backPage: "viewProduct",
      value: 0,
      tabsHidden: false,
      ProductPurchaseOrderStatus: [
        "Pending",
        "Seen by supplier",
        "Delievery",
        "Endorsed",
      ],
    };
  }

  setTabsHidden = (value) => {
    this.setState({
      tabsHidden: value,
    });
  };

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

    const changeData = (value) => {
      this.props.CallGetTransaction(value);
    };

    let allQuotationData = this.props.quotations
      ? Object.keys(this.props.quotations).map((key) => {
          console.log(this.props.quotations);
          return this.props.quotations[key];
        })
      : {};

    if (allQuotationData.length > 0) {
      console.log(allQuotationData);
      var generateTabs = allQuotationData.map((status, i) => {
        return (
          <Tab
            label={status.TrackingStatus}
            {...a11yProps(i)}
            // onClick={changeData.bind(this, status.TrackingStatus)}
          />
        );
      });
      var generatePanels = this.state.ProductPurchaseOrderStatus.map(
        (status, i) => {
          var allQuotationList = this.props.quotations;
          allQuotationList = allQuotationList.filter(
            (items) =>
              items.ProductQuotationStatus ==
              this.state.ProductPurchaseOrderStatus[i]
          );
          // console.log(allPurchaseOrdersList);
          return (
            <TabPanel value={this.state.value} index={i}>
              <DisplayTable
                Data={allQuotationList}
                ProductProps={this.props}
                history={this.props.history}
                tabsHidden={this.state.tabsHidden}
                setTabsHidden={this.setTabsHidden}
              ></DisplayTable>
            </TabPanel>
          );
        }
      );
    }

    return (
      <div style={{ width: "100%" }}>
        <h1 style={{ margin: "20px" }}>Quotation Listing</h1>
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
              <Tab
                label="Pending"
                {...a11yProps(0)}
                // onClick={changeData.bind(this, status.TrackingStatus)}
              />
              {localStorage.getItem("roleid") <= 2 ? (
                <Tab
                  label="Seen by Merchant"
                  {...a11yProps(1)}
                  // onClick={changeData.bind(this, status.TrackingStatus)}
                />
              ) : null}
              <Tab
                label="Replied PO"
                {...a11yProps(2)}
                // onClick={changeData.bind(this, status.TrackingStatus)}
              />
              <Tab
                label="Delivered"
                {...a11yProps(3)}
                // onClick={changeData.bind(this, status.TrackingStatus)}
              />
              {localStorage.getItem("roleid") <= 2 ? (
                <Tab
                  label="History"
                  {...a11yProps(4)}
                  // onClick={changeData.bind(this, status.TrackingStatus)}
                />
              ) : null}
            </Tabs>
          </AppBar>
        ) : null}
        {generatePanels}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotationListComponent);

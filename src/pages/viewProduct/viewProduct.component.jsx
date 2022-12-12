import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";

import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@mui/styles";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";
import { toast } from "react-toastify";
import { connectableObservableDescriptor } from "rxjs/observable/ConnectableObservable";
import { url } from "../../services/utils";
import { browserHistory } from "react-router";

import FormControl from "@mui/material/FormControl";
import { ConstructionOutlined } from "@mui/icons-material";

function mapStateToProps(state) {
  return {
    allstocks: state.counterReducer["products"],
    productMgmtResult: state.counterReducer["productMgmtResult"],
    productInfo: state.counterReducer["productsByID"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllProducts: (prodData) => dispatch(GitAction.CallAllProducts(prodData)),
    CallResetProductMgmtReturnVal: () => dispatch(GitAction.CallResetProductMgmtReturnVal()),
    CallDeleteProduct: (prodData) =>
      dispatch(GitAction.CallDeleteProduct(prodData)),
    CallResetProductDetails: () =>
      dispatch(GitAction.CallResetProductDetails()),
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
    id: "ProductImage",
    numeric: false,
    disablePadding: true,
    label: "Product Image",
  },
  {
    id: "ProductName",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  // {
  //   id: "ProductDescription",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Product Description",
  // },
  // { id: "Brand", numeric: false, disablePadding: false, label: "Brand" },
  // {
  //   id: "ProductWeight",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Product Weight",
  // },
  // {
  //   id: "ProductDimensionWidth",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Product Dimension",
  // },
  // {
  //   id: "ProductStockAmountInital",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Current Stock",
  // },
  {
    id: "ProductPrice",
    numeric: false,
    disablePadding: false,
    label: "Price Sold (RM)",
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
            inputProps={{ "aria-label": "select all products" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}

            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: headCell.id == "ProductImage" ? "140px" : "" }}
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
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: headCell.id == "ProductImage" ? "140px" : "" }}
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

  const onDeleteProduct = () => {
    props.ProductProps.CallDeleteProduct(props.selectedData);
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
          Please select the products that you want to delete.
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
      const newSelecteds = props.Data.map((n) => n.ProductID);
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

  props.Data.map((d, i) => {
    d.Picture = (
      <div>
        <img
          height={50}
          src={
            d.ProductImage
              // ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
              ? d.ProductImage
              : ""
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Logo;
          }}
        />

      </div>
    );
  });

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
                      <TableCell align="center">{row.Picture}</TableCell>
                      <TableCell align="left">{row.ProductName}</TableCell>
                      {/* <TableCell align="left">
                        {row.ProductDescription}
                      </TableCell>
                      <TableCell align="left">{row.Brand}</TableCell>
                      <TableCell align="right">{row.ProductWeight}</TableCell>
                      <TableCell align="right">
                        {row.ProductDimensionWidth +
                          " x " +
                          row.ProductDimensionDeep +
                          " x " +
                          row.ProductDimensionHeight}
                      </TableCell>
                      <TableCell align="right">
                        {row.ProductStockAmountInital}
                      </TableCell> */}
                      <TableCell align="left">
                        {row.ProductPrice}
                      </TableCell>
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
      filteredProduct: [],
      isFiltered: false,
      selectedMerchant: 0,
    };

    this.ToggleDeletable = this.ToggleDeletable.bind(this);
    this.searchSpace = this.searchSpace.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleSetDetailShown = this.handleSetDetailShown.bind(this);
    this.props.ProductProps.CallResetProductDetails();
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  onRowClick = (event, row, index) => {
    this.setState({
      name: row.ProductName,
      category: row.ProductCategoryID,
      height: row.ProductDimensionHeight,
      weight: row.ProductWeight,
      depth: row.ProductDimensionDeep,
      width: row.ProductDimensionWidth,
      sku: row.SKU,
      productSupplier: row.SupplierID,
      productCategory: row.ProductCategoryID,
      description: row.ProductDescription,
      model: row.Model,
      brand: row.Brand,
      tags: row.ProductTag,
      supplier: row.SupplierID,
      grid: row.GridStorageID,
      shoplot: row.ShoplotID,
      picture: this.props.Data,
      productID: row.ProductID,
      row: index,
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

  componentDidUpdate(prevProps) {

    if (typeof this.props.ProductProps.productMgmtResult !== "undefined" && this.props.ProductProps.productMgmtResult.length > 0) {
      this.ToggleDeletable();
      this.props.ProductProps.CallResetProductMgmtReturnVal();
      this.props.ProductProps.CallAllProducts({
        type: 'Merchant',
        typeValue: '0',
        userId: window.localStorage.getItem("id"),
        productPage: '999',
        page: '1'
      });
      toast.success("Selected products removed successfully.")
    }
  }

  handleDetailShown = (value) => {
    this.setState({ detailsShown: value })
  }

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

  handleSetDetailShown = () => {
    this.setState({ detailsShown: false })
  }

  filterMerchantListing = (e) => {
    this.setState({ selectedMerchant: e.target.value })
    console.log("THIS IS VALUE", e.target.value)
  }

  searchSpace = (value) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    this.state.filteredProduct.splice(0, this.state.filteredProduct.length)

    this.props.Data.filter((searchedItem) =>
      searchedItem.ProductName !== null && searchedItem.ProductName.toLowerCase().includes(
        value.toLowerCase()
      )
    ).map((filteredItem) => {
      this.state.filteredProduct.push(filteredItem);
    })

    this.setState({ isFiltered: true })
  }

  render() {
    const { classes } = this.props;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.Data.length - this.state.page * this.state.rowsPerPage
      );

    typeof this.props.Data !== "undefined" && this.props.Data.length > 0 && this.props.Data.map((d, i) => {
      d.Picture = (
        <div>
          <img
            height={50}
            alt={'product_image_' + i}
            src={
              d.ProductImage
                ? d.ProductImage
                : ""
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Logo;
            }}
          />
        </div>
      );
    });

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

    // var filteredProduct = [];

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

    this.state.filteredProduct.filter((ele, ind) => ind === this.state.filteredProduct.findIndex(elem => elem.OrderID === ele.OrderID))
    console.log("this.props11", this.props)
    if (this.props.Data.length > 0) {
      var generateOptions = []
      generateOptions = this.props.Data.length > 0 &&
        this.props.Data
          .filter((ele, ind) => ind === this.props.Data.findIndex(elem => elem.MerchantID === ele.MerchantID))
          .map((data, i) => {
            return (
              <option value={data.MerchantID}>{data.MerchantShopName}</option>
            );
          });
    }

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
<></>
        ) : this.state.deleteActive ? (
          <div>
            <div className="row">
              <div className="col-6">
                <h1>Product List</h1>
              </div>
              <div className="col-6" style={{ paddingTop: "10px" }}>
                <div className="selectContainer">
                  <FormControl variant="outlined" size="small">
                    <Select
                      native
                      value={this.state.selectedMerchant}
                      onChange={this.filterMerchantListing.bind(this)}
                      className="select"
                    >
                      <option value={0}>All Merchant Shop</option>
                      {generateOptions}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div>
              <Button>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <Link className="nav-link" to={"/addProductsAllIn"}>
                  Create new Product
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
            <SearchBox
              style={divStyle}
              placeholder="Search By Product Name..."
              onChange={(e) => this.searchSpace(e.target.value)}
            />
            <DeletableTable
              Data={
                this.state.isFiltered ?
                  parseInt(this.state.selectedMerchant) === 0 ? this.state.filteredProduct : this.state.filteredProduct.length > 0 && this.state.filteredProduct.filter((x) => parseInt(x.MerchantID) === parseInt(this.state.selectedMerchant))
                  : parseInt(this.state.selectedMerchant) === 0 ? this.props.Data : this.props.Data.length > 0 && this.props.Data.filter((x) => parseInt(x.MerchantID) === parseInt(this.state.selectedMerchant))
              }
              ProductProps={this.props.ProductProps}
            ></DeletableTable>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col-6">
                <h1>Product List</h1>
              </div>
              <div className="col-6" style={{ paddingTop: "10px" }}>
                <div className="selectContainer">
                  <FormControl variant="outlined" size="small">
                    <Select
                      native
                      value={this.state.selectedMerchant}
                      onChange={this.filterMerchantListing.bind(this)}
                      className="select"
                    >
                      <option value={0}>All Merchant Shop</option>
                      {generateOptions}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div>
              <Button>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <Link className="nav-link" to={"/addProductsAllIn"}>
                  Create new Product
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
            <SearchBox
              style={divStyle}
              placeholder="Search By Product Name..."
              onChange={(e) => this.searchSpace(e.target.value)}
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
                        this.state.isFiltered ?
                          parseInt(this.state.selectedMerchant) === 0 ? this.state.filteredProduct : this.state.filteredProduct.length > 0 && this.state.filteredProduct.filter((x) => parseInt(x.MerchantID) === parseInt(this.state.selectedMerchant))
                          : parseInt(this.state.selectedMerchant) === 0 ? this.props.Data : this.props.Data.length > 0 && this.props.Data.filter((x) => parseInt(x.MerchantID) === parseInt(this.state.selectedMerchant)),
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
                              // onClick={(event) => this.onRowClick(event, row, index)}
                              onClick={() => window.location = url.inventoryProduct(row.ProductID)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.ProductName}
                              selected={isItemSelected}
                            >

                              <TableCell align="center">{row.Picture} </TableCell>

                              <TableCell align="left"> {row.ProductName} </TableCell>

                              {/* <TableCell align="left"> {row.ProductDescription} </TableCell>
                              <TableCell align="left">{row.Brand}</TableCell>
                              <TableCell align="right"> {row.ProductWeight} </TableCell>
                              <TableCell align="right">
                                {row.ProductDimensionWidth +
                                  " x " +
                                  row.ProductDimensionDeep +
                                  " x " +
                                  row.ProductDimensionHeight}
                              </TableCell>
                              <TableCell align="right"> {row.ProductStockAmountInital}</TableCell> */}

                              <TableCell align="left">{row.ProductPrice}</TableCell>

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
                  count={

                    this.state.isFiltered ?
                      parseInt(this.state.selectedMerchant) === 0 ?
                        this.state.filteredProduct.length :
                        this.state.filteredProduct.length > 0 && this.state.filteredProduct.filter((x) => parseInt(x.MerchantID) === parseInt(this.state.selectedMerchant)).length
                      : parseInt(this.state.selectedMerchant) === 0 ?
                        this.props.Data.length :
                        this.props.Data.length > 0 && this.props.Data.filter((x) => parseInt(x.MerchantID) === parseInt(this.state.selectedMerchant)).length
                  }
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

class ViewProductComponent extends Component {
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
      productStatus: "Endorsed",
      backPage: "viewProduct",
    };

    this.props.CallAllProducts({
      type: 'Merchant',
      typeValue: '0',
      userId: window.localStorage.getItem("id"),
      productPage: '999',
      page: '1'
    });
  }



  render() {

    return (
      <div style={{ width: "100%" }}>
        <DisplayTable
          Data={localStorage.getItem("roleid") === "1" ? this.props.allstocks :
            localStorage.getItem("roleid") === "16" && this.props.allstocks !== undefined ? this.props.allstocks.filter((x) => parseInt(x.MerchantID) === parseInt(localStorage.getItem("id"))) : []
          }
          ProductProps={this.props}
        ></DisplayTable>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProductComponent);

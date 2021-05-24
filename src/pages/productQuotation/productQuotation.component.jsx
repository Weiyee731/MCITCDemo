import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
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
// import ProductDetailsComponent from "../../pages/productDetails/productDetails.component";
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
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import AddBoxIcon from "@material-ui/icons/AddBox";
import ProductQuotationPDF from "../productQuotationPDF/productQuotationPDF.component";
// import { render } from "@testing-library/react";
import Input from "@material-ui/core/Input";
import Logo from "../../assets/MCITC.png";
import SearchBox from "../../components/SearchBox/SearchBox";

function mapStateToProps(state) {
  return {
    allstocks: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callAllProducts: () => dispatch(GitAction.CallAllProducts()),
    CallDeleteProduct: (prodData) =>
      dispatch(GitAction.CallDeleteProduct(prodData)),
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
    margin: "1% auto",
    padding: "1%",
  },
  submitBtn: {
    float: "right",
  },
  table: {
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
  {
    id: "ProductDescription",
    numeric: false,
    disablePadding: false,
    label: "Product Description",
  },
  { id: "Brand", numeric: false, disablePadding: false, label: "Brand" },

  {
    id: "ProductSellingPrice",
    numeric: true,
    disablePadding: false,
    label: "Price Sold",
  },
  {
    id: "",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
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

const DeletableTableToolbar = (props) => {
  const classes = useStyles();

  const { numSelected } = props;

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
          Please select the products.
        </Typography>
      )}
    </Toolbar>
  );
};

DeletableTableToolbar.propTypes = {
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
  const [postSubmitted, setPostSubmitted] = React.useState(false);
  const [Amount, setValue] = React.useState([]);
  const [selectedAmount, setSelectedAmount] = React.useState([]);

  const handleInputChange = (event, index) => {
    let newSelected = Amount;
    newSelected[index] = Number(event.target.value);
    var filtered = newSelected.filter(function (el) {
      return el !== "empty";
    });
    setValue(filtered);
  };

  const handleBlur = () => {};

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
    // setValue();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const submitPost = (e) => {
    setPostSubmitted(true);
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
            JSON.parse(d.ProductImages)
              ? JSON.parse(d.ProductImages)[0].ProductMediaUrl
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

  const submitButton = {
    backgroundColor: "lightgrey",
    float: "right",
    margin: "5%",
  };

  const divStyle = {
    width: "100%",
    margin: "auto",
    padding: "1%",
    marginTop: "15px",
  };

  return (
    <div>
      {postSubmitted ? (
        <ProductQuotationPDF
          SelectedData={selected}
          PropsData={props}
          selectAmount={Amount}
          FirstCreatedFlag={"1"}
        />
      ) : (
        <div>
          <Paper className={classes.paper} style={divStyle}>
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
                  {/* {setValue(DataV)} */}
                  {stableSort(props.Data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.ProductID);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.ProductID}
                          selected={isItemSelected}
                        >
                          <TableCell
                            onClick={(event) =>
                              handleClick(event, row.ProductID)
                            }
                            padding="checkbox"
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell align="center">{row.Picture}</TableCell>
                          <TableCell align="left">{row.ProductName}</TableCell>
                          <TableCell align="left">
                            {row.ProductDescription}
                          </TableCell>
                          <TableCell align="left">{row.Brand}</TableCell>
                          <TableCell align="right">
                            {row.ProductSellingPrice}
                          </TableCell>
                          <TableCell align="right">
                            <div className={classes.root}>
                              <Input
                                style={{ zIndex: 1 }}
                                className={classes.input}
                                value={Amount[index]}
                                margin="dense"
                                onChange={(event) =>
                                  handleInputChange(event, index)
                                }
                                onBlur={handleBlur}
                                inputProps={{
                                  step: 1,
                                  min: 0,
                                  max: 1000,
                                  type: "number",
                                  "aria-labelledby": "input-slider",
                                }}
                              />
                            </div>
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
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          <div style={{ marginBottom: "5%", float: "right" }}>
            <Button onClick={submitPost} style={submitButton}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
class ProductQuotationComponent extends Component {
  constructor(props) {
    super(props);
    this.props.callAllProducts();

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
      postSubmitted: false,
      searchFilter: "",
    };
  }
  // ---------------------------------------------------------- Render ----------------------------------------------------------
  render() {
    var filteredProduct = [];
    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",
      marginTop: "15px",
    };
    return (
      <div style={{ width: "100%", margin: "2%" }}>
        <h1>Product Quotation List</h1>
        <div>
          <SearchBox
            style={divStyle}
            placeholder="Search..."
            onChange={(e) => this.setState({ searchFilter: e.target.value })}
          />
          {this.props.allstocks
            .filter((searchedItem) =>
              searchedItem.ProductName.toLowerCase().includes(
                this.state.searchFilter
              )
            )
            .map((filteredItem) => {
              filteredProduct.push(filteredItem);
            })}
          <DeletableTable Data={filteredProduct} ProductProps={this.props} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductQuotationComponent);

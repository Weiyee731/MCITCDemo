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
import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import AddBoxIcon from "@material-ui/icons/AddBox";
// import ProductQuotationPDF from "../productQuotationPDF/productQuotationPDF.component";
// import { render } from "@testing-library/react";
import Input from "@material-ui/core/Input";
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";

function mapStateToProps(state) {
  return {
    productstock: state.counterReducer["productstock"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetProductStockByStatus: (prodData) =>
      dispatch(GitAction.CallGetProductStockByStatus(prodData)),
    CallEndorseProductStock: (prodData) =>
      dispatch(GitAction.CallEndorseProductStock(prodData)),
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
    id: "CompanyName",
    numeric: true,
    disablePadding: false,
    label: "Company",
  },
  {
    id: "FullName",
    numeric: true,
    disablePadding: false,
    label: "ATTN",
  },
  {
    id: "ProductStockAmount",
    numeric: true,
    disablePadding: false,
    label: "Actual Stock",
  },
  {
    id: "ProductStockAmountInital",
    numeric: true,
    disablePadding: false,
    label: "Requests Stock Change",
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
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          {/* <IconButton
            aria-label="delete"
            onClick={() => {
              onDeleteProduct();
            }}
          >
            <DeleteIcon />
          </IconButton> */}
          <Button
            variant="contained"
            // onClick={() => onDeleteProduct()}
            onClick={props.submitValues.bind(this)}
            style={{
              margin: "10px",
              background: "#fff",
              color: "#000",
              borderColor: "black",
              fontWeight: "bold",
            }}
          >
            {" "}
            Endorsed Stock Requested{" "}
          </Button>
        </Tooltip>
      ) : (
        ""
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

  const submitValues = () => {
    console.log(selected);
    console.log(selectedAmount);
    // selected.map((ID) => {
    //   filterProducts(ID);
    // });
    props.PropsData.CallEndorseProductStock({
      ProductID: selected,
      ProductStockAmount: selectedAmount,
      ProductStockStatus: "Pending",
      UserID: localStorage.getItem("id"),
    });
    // alert(JSON.stringify(suppliersSelected));
  };

  const handleInputChange = (event, index) => {
    let newSelected = Amount;
    newSelected[index] = Number(event.target.value);
    var filtered = newSelected.filter(function (el) {
      return el !== "empty";
    });
    setValue(filtered);
  };

  const handleBlur = () => { };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.Data.map((n) => n.ProductID);
      const newSelectedAmount = props.Data.map((n) => n.ProductStockAmount);
      setSelected(newSelecteds);
      setSelectedAmount(newSelectedAmount);
      return;
    }
    setSelectedAmount([]);
    setSelected([]);
  };

  const handleClick = (event, name, amount) => {
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
    let newSelectedAmount = [];
    if (selectedIndex === -1) {
      newSelectedAmount = newSelectedAmount.concat(selectedAmount, amount);
    } else if (selectedIndex === 0) {
      newSelectedAmount = newSelectedAmount.concat(selectedAmount.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelectedAmount = newSelectedAmount.concat(selectedAmount.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAmount = newSelectedAmount.concat(
        selectedAmount.slice(0, selectedIndex),
        selectedAmount.slice(selectedIndex + 1)
      );
    }

    setSelectedAmount(newSelectedAmount);
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
      {postSubmitted ?
      ""
      //  (
      //   <ProductQuotationPDF
      //     SelectedData={selected}
      //     PropsData={props}
      //     selectAmount={Amount}
      //     FirstCreatedFlag={"1"}
      //   />
      // ) 
      : (
        <div>
          <Paper className={classes.paper} style={divStyle}>
            <DeletableTableToolbar
              numSelected={selected.length}
              selectedData={selected}
              submitValues={submitValues}
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
                              handleClick(
                                event,
                                row.ProductID,
                                row.ProductStockAmount
                              )
                            }
                            padding="checkbox"
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <img
                              height={50}
                              src={row.ProductName}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = Logo;
                              }}
                            />
                          </TableCell>
                          <TableCell align="left">{row.ProductName}</TableCell>
                          <TableCell align="right">{row.CompanyName}</TableCell>
                          <TableCell align="right">{row.FullName}</TableCell>
                          <TableCell align="right">
                            {row.ProductStockAmountInital}
                          </TableCell>
                          <TableCell align="right">
                            {row.ProductStockAmount}
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
class ViewStockInEndorsementComponent extends Component {
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
      postSubmitted: false,
      searchFilter: "",
      ProductStockStatus: "Pending",
      UserID: localStorage.getItem("id"),
    };
    this.props.CallGetProductStockByStatus(this.state);
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
      <div style={{ width: "95%", margin: "2%" }}>
        <h1>Stock Endorsement</h1>
        <div>
          <SearchBox
            style={divStyle}
            placeholder="Search..."
            onChange={(e) => this.setState({ searchFilter: e.target.value })}
          />
          {this.props.productstock
            .filter((searchedItem) =>
              searchedItem.ProductName.toLowerCase().includes(
                this.state.searchFilter
              )
            )
            .map((filteredItem) => {
              console.log(filteredItem);
              filteredProduct.push(filteredItem);
            })}
          {console.log(filteredProduct)}
          <DeletableTable Data={filteredProduct} PropsData={this.props} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStockInEndorsementComponent);

import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar.component";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUpdate = (event) => {
    var datatoBeSent = {
      SelectedProductID: props.Data.ProductID,
      SelectedProductStock: quantity,
      ProductStatus: "Endorsed",
      UserID: localStorage.getItem("id"),
    };
    props.CallUpdateProductStock(datatoBeSent);
    handleClose();
    setTimeout(
      function () {
        reloadWindow();
      }.bind(this),
      1000
    );
  };

  const reloadWindow = () => {
    window.location.reload();
  };

  return (
    <div>
      <Button
        className="AddButton"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Request Stock
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request Additional Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please insert the number of stock to be requested for the following
            item
          </DialogContentText>
          <div style={{ display: "flex" }}>
            <img
              height={50}
              src={
                JSON.parse(props.Data.ProductImages)
                  ? JSON.parse(props.Data.ProductImages)[0].ProductMediaUrl
                  : ""
              }
            />
            <p style={{ marginTop: "10px", marginLeft: "10px" }}>
              {props.Data.ProductName}
            </p>
          </div>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}> Make Request</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
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
    marginTop: "15px",
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

function DisplayTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();
  const headCells = [];
  props.ListedAttributes.map((attribute) => {
    const cellData = {
      id: attribute.name,
      numeric: attribute.isNum,
      disablePadding: false,
      label: attribute.displayName,
    };
    headCells.push(cellData);
  });

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
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }
  isSelected = (name) => {
    // this.state.selected.indexOf(name) !== -1;
  };

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

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleChangeDense = (event) => {
    this.setState({ dense: event.target.checked });
  };

  render() {
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.Data.length - this.state.page * this.state.rowsPerPage
      );
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

    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",
      paddingTop: "0",
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
                  ListedAttributes={this.props.ListedAttributes}
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
                      const isItemSelected = this.isSelected(row.ProductName);
                      return (
                        <TableRow
                          hover
                          onClick={(event) =>
                            this.onRowClick(event, row, index)
                          }
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.ProductID}
                          selected={isItemSelected}
                        >
                          <TableCell align="left">{row.Picture}</TableCell>
                          <TableCell align="left">{row.ProductName}</TableCell>
                          <TableCell align="right">
                            {row.ProductStockAmountInital}
                          </TableCell>
                          <TableCell align="right">
                            {row.ProductStockAmount}
                          </TableCell>
                          <TableCell align="left">
                            {row.ProductStockStatus}
                          </TableCell>
                          <TableCell align="left">
                            {/* <SimplePopper Data={row} /> */}
                            <FormDialog
                              Data={row}
                              CallUpdateProductStock={
                                this.props.CallUpdateProductStock
                              }
                            />
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
    );
  }
}

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStocksData: this.props.Data,
    };
  }

  updateList = (data) => {
    this.setState({
      allStocksData: data,
    });
  };

  render() {
    return (
      <div>
        <SearchBar
          Data={this.props.Data}
          filterList={this.props.filterList}
          changeValue={this.updateList}
        />
        <DisplayTable
          Data={this.state.allStocksData}
          ListedAttributes={this.props.ListedAttributes}
          CallUpdateProductStock={this.props.CallUpdateProductStock}
        />
      </div>
    );
  }
}

export default TableView;

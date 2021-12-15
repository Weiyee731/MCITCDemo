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
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import "react-table/react-table.css";
import TransactionDetails from "../transactionDetails/transactionDetails.component";
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
import Logo from "../../assets/Emporia.png";
import SearchBox from "../../components/SearchBox/SearchBox";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import "./viewTransactions.css";
import FormControl from "@material-ui/core/FormControl";
import "../viewTransactions/viewTransactions.css";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Input from "@material-ui/core/Input";
import { ConstructionOutlined } from "@mui/icons-material";

function mapStateToProps(state) {
  return {
    allpromocodes: state.counterReducer["promoCodes"],
    allstocks: state.counterReducer["products"],
    alltransactions: state.counterReducer["transactions"],
    logistic: state.counterReducer["logistic"],
    tracking: state.counterReducer["tracking"],
    alltransactionstatus: state.counterReducer["transactionStatus"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallGetTransaction: (transactionData) =>
      dispatch(GitAction.CallGetTransaction(transactionData)),
    CallDeletePromoCode: (promoCodeData) =>
      dispatch(GitAction.CallDeletePromoCode(promoCodeData)),
    CallCourierService: () =>
      dispatch(GitAction.CallCourierService()),
    CallGetTransactionStatus: () =>
      dispatch(GitAction.CallGetTransactionStatus()),
    CallUpdateOrderTracking: (propData) =>
      dispatch(GitAction.CallUpdateOrderTracking(propData)),
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
    id: "",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "OrderName",
    numeric: false,
    disablePadding: false,
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
            inputProps={{ "aria-label": "select all order" }}
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

function DeletableTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.Data.map((n) => n.OrderID);
      setSelected(newSelecteds);
      console.log(newSelecteds);
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
    console.log(newSelected);
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
                  const isItemSelected = isSelected(row.OrderID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.OrderID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.OrderID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      <TableCell align="left">{row.OrderName}</TableCell>
                      <TableCell align="left">{row.Username}</TableCell>
                      <TableCell align="left">{row.PaymentMethod}</TableCell>
                      <TableCell align="left">{row.TrackingStatus}</TableCell>
                      <TableCell align="right">
                        {/* {row.OrderProductDetail
                          ? JSON.parse(
                              row.OrderProductDetail
                            ).map((product) => <p>{product.ProductName}</p>)
                          : null} */}
                        {row.OrderProductDetail ? (
                          <p>{JSON.parse(row.OrderProductDetail).length}</p>
                        ) : (
                          0
                        )}
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
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});



function Row(props) {
  const { row, setData, index, logistic, prop } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [selectedProductDetailsID, setSelectedProductDetailsID] = React.useState([]);
  const [selectedRowID, setSelectedRowID] = React.useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = React.useState([]);
  const [logisticID, setLogisticID] = React.useState(1);
  const [trackingNumber, setTrackingNumber] = React.useState("");


  const handleSelectedProduct = (product, index) => {

    let tempArray = selectedProductDetailsID.filter((x) => parseInt(x) === parseInt(product.OrderProductDetailID))
    if (selectedProductDetailsID.length > 0) {

      if (tempArray.length > 0) {
        selectedProductDetailsID.map((X) => {

          if (X === product.OrderProductDetailID) {
            let tempIndex = selectedProductIndex
            let tempID = selectedProductIndex

            tempIndex = selectedProductIndex.filter((x) => selectedProductIndex.indexOf(x) !== selectedProductDetailsID.indexOf(X))
            tempID = selectedProductDetailsID.filter((x) => parseInt(x) !== parseInt(product.OrderProductDetailID))

            setSelectedProductDetailsID(tempID)
            // setSelectedProductIndex(tempIndex)
          }
        })
      }
      else {
        setSelectedProductDetailsID(selectedProductDetailsID => [...selectedProductDetailsID, product.OrderProductDetailID])
        // setSelectedProductIndex(selectedProductIndex => [...selectedProductIndex, index])
      }
    }
    else {
      setSelectedProductDetailsID(selectedProductDetailsID => [...selectedProductDetailsID, product.OrderProductDetailID])
      // setSelectedProductIndex(selectedProductIndex => [...selectedProductIndex, index])
    }

  }

  const handleSelectAllProduct = (order, index) => {

    if (selectedRowID.length === selectedProductDetailsID.length) {
      setSelectedProductDetailsID([])
      // setSelectedProductIndex([])
    }
    else {
      setSelectedProductDetailsID(selectedRowID)
    }
  }

  const handleSetProduct = (row) => {
    let tempOrderDetails = []
    row.OrderProductDetail !== null && JSON.parse(row.OrderProductDetail).map((x) => {
      tempOrderDetails.push(x.OrderProductDetailID)
    })
    setSelectedRowID(tempOrderDetails)
  }

  const orderListing = (product, i) => {
    return (

      <TableBody>
        {console.log("PRODUCT0", product)}
        <TableRow>
          <TableCell style={{ width: "10%" }}>
            <Checkbox
              checked={
                selectedProductDetailsID.length > 0 ?
                  selectedProductDetailsID.filter(x => x === product.OrderProductDetailID).length > 0 ?
                    true : false : false
              }
              onClick={() => handleSelectedProduct(product, i)}
            />
          </TableCell>
          <TableCell style={{ width: "10%" }}>
            <img
              height={60}
              src={product.ProductImage !== null ? JSON.parse(product.ProductImages)[0] : Logo}
              onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
              alt={product.ProductName}
            />
          </TableCell>
          <TableCell style={{ width: "45%" }}>
            <div style={{ fontWeight: "bold", fontSize: "13px" }}>  {product.ProductName} </div>
            <div style={{ fontSize: "11px" }}>  SKU : {product.SKU}  </div>
            <div style={{ fontSize: "11px" }}>  Dimension : {product.ProductDimensionWidth}m (W) X {product.ProductDimensionHeight}m (H) X {product.ProductDimensionDeep}m (L) </div>
            <div style={{ fontSize: "11px" }}>  Weight : {product.ProductWeight} kg   </div>
          </TableCell>
          <TableCell style={{ width: "5%" }}> X {product.ProductQuantity}</TableCell>
          <TableCell style={{ width: "20%" }}>
            <div style={{ fontWeight: "bold" }}>   Total : RM {(product.ProductQuantity * product.ProductVariationPrice).toFixed(2)}</div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  const confirmListing = (product, i) => {
    return (
      <TableBody>
        <TableRow>
          <TableCell style={{ width: "10%" }}>
            <img
              height={60}
              src={product.ProductImage !== null ? JSON.parse(product.ProductImages)[0] : Logo}
              onError={(e) => { e.target.onerror = null; e.target.src = Logo }}
              alt={product.ProductName}
            />
          </TableCell>
          <TableCell style={{ width: "40%" }}>
            <div style={{ fontWeight: "bold", fontSize: "13px" }}>  {product.ProductName} </div>
            <div style={{ fontSize: "11px" }}>  SKU : {product.SKU}  </div>
            <div style={{ fontSize: "11px" }}>  Dimension : {product.ProductDimensionWidth}m (W) X {product.ProductDimensionHeight}m (H) X {product.ProductDimensionDeep}m (L) </div>
            <div style={{ fontSize: "11px" }}>  Weight : {product.ProductWeight} kg   </div>
          </TableCell>
          <TableCell style={{ width: "5%" }}> X {product.ProductQuantity}</TableCell>
          <TableCell style={{ width: "20%" }}>
            <div style={{ fontWeight: "bold" }}>   Total : RM {(product.ProductQuantity * product.ProductVariationPrice).toFixed(2)}</div>
          </TableCell>
          <TableCell style={{ width: "20%" }}>
            <div>   Tracking Number :</div>
            <div style={{ fontWeight: "bold" }}>   {product.TrackingNumber}</div>
            {logistic.filter(x => x.LogisticID === product.LogisticID).map((courier) => {
              return (
                <div style={{ fontWeight: "bold" }}> {courier.LogisticName}  </div>
              )
            })}
          </TableCell>
          <TableCell style={{ width: "10%" }}>
            <Button style={{ backgroundColor: "#28a745", color: "white" }}
            // onClick={() => handleSubmitTracking()}
            >EDIT</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  const handleSubmitTracking = () => {
    prop.CallUpdateOrderTracking({
      ORDERTRACKINGNUMBER: trackingNumber,
      LOGISTICID: logisticID,
      ORDERPRODUCTDETAILSID: selectedProductDetailsID
    })
  }


  const trackingView = () => {
    return (
      <div style={{ textAlign: "left" }}>
        <div className="row" >
          <div className="col-3" style={{ paddingTop: "20px" }}>
            <label className="px-6">Logistic Tracking Number : </label>
          </div>
          <div className="col-3" style={{ paddingTop: "10px" }}>
            <FormControl variant="outlined" size="small" style={{ width: "200px" }}>
              <Select
                native
                id="Logistic"
                defaultValue={1}
                value={logisticID}
                onChange={(x) => setLogisticID(x.target.value)}
                className="select"
              >
                {logistic.map((courier) => (
                  <option
                    value={courier.LogisticID}
                    key={courier.LogisticID}
                  >
                    {courier.LogisticName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-3" style={{ paddingTop: "10px" }}>
            <TextField
              id="outlined-size-small" size="small"
              width="100%"
              className="font"
              variant="outlined"
              value={trackingNumber}
              onChange={(x) => setTrackingNumber(x.target.value)}
            />
          </div>
          <div className="col-2" style={{ paddingTop: "20px" }}>
            <Button style={{ backgroundColor: trackingNumber === "" ? "#808080" : "#28a745", color: "white" }}
              onClick={() => handleSubmitTracking()}
              disabled={trackingNumber === "" ? true : false}
            >SUBMIT</Button>
          </div>
        </div>
      </div >

    )
  }

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.Username}
        onClick={() =>
          <>
            {(setOpen(!open), handleSetProduct(row))}
          </>
        }
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.OrderName}</TableCell>
        <TableCell align="left">{row.Username}</TableCell>
        <TableCell align="left">{row.PaymentMethod}</TableCell>
        <TableCell align="left">{row.TrackingStatus}</TableCell>
        <TableCell align="left">
          {row.OrderProductDetail ? (
            <p>{JSON.parse(row.OrderProductDetail).length}</p>
          ) : (
            0
          )}
        </TableCell>
      </TableRow>
      <TableRow className="subTable">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <p className="subHeading">User Details</p>
              <div style={{ display: "flex" }}>
                <div className="subContainer">
                  <p className="subTextLeft">{"Full Name "}</p>
                  <p className="subTextField">
                    {row.UserFullName ? row.UserFullName : "-"}
                  </p>
                </div>
                <div style={{ width: "100%", display: "flex" }}>
                  <p className="subTextRight">{"Contact Number"}</p>
                  <p className="subTextField">
                    {row.UserContactNo ? row.UserContactNo : "-"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="subContainer">
                  <p className="subTextLeft">{"Email"}</p>
                  <p className="subTextField">
                    {row.UserEmailAddress ? row.UserEmailAddress : "-"}
                  </p>
                </div>

                <div style={{ width: "100%", display: "flex" }}>
                  <p className="subTextRight">{"Address Line 1"}</p>
                  <p className="subTextField">
                    {row.UserAddressLine1 ? row.UserAddressLine1 : "-"}
                  </p>
                </div>
              </div>
              <p className="subHeading">Products Ordered</p>
              {row.OrderProductDetail ? (
                <>
                  <div size="small" aria-label="products">
                    <TableCell><Checkbox
                      checked={selectedProductDetailsID.length === 0 ? false :
                        selectedRowID.length === selectedProductDetailsID.length ? true : false
                      }
                      onClick={() => handleSelectAllProduct(row, index)}
                    /></TableCell>
                    <div>
                      {row.OrderProductDetail ?
                        <>
                          {JSON.parse(row.OrderProductDetail).map((product, i) => (
                            <>
                              {
                                product.LogisticID === null && selectedProductDetailsID.length > 0 && selectedProductDetailsID.filter(x => x === product.OrderProductDetailID).length > 0 &&
                                orderListing(product, i)
                              }
                            </>
                          ))
                          }
                          {selectedProductDetailsID.length > 0 && trackingView()}
                          {JSON.parse(row.OrderProductDetail).map((product, i) => (
                            <>
                              {
                                selectedProductDetailsID.length > 0 && selectedProductDetailsID.filter(x => x === product.OrderProductDetailID).length > 0 ? "" :
                                  product.LogisticID === null && orderListing(product, i)
                              }
                            </>
                          ))
                          }

                        </>

                        : null}
                    </div>
                  </div>

                  {row.OrderProductDetail ? JSON.parse(row.OrderProductDetail).map((product, i) => (
                    <>
                      {
                        product.TrackingNumber !== null && product.LogisticID !== null &&
                        confirmListing(product, i)
                      }
                    </>
                  ))
                    : null}
                </>

              ) : (
                <p className="fadedText">No Products To Display</p>
              )}
            </Box>


          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
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

  setData = (row, index) => {
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
    if (this.state.detailsShown) {
      this.setState({
        detailsShown: false,
      });
      this.props.setTabsHidden(false);
    } else {
      this.setState({
        detailsShown: true,
      });
      this.props.setTabsHidden(true);
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
  setDetailsShown = () => {
    if (this.state.detailsShown) {
      this.setState({
        detailsShown: false,
      });
      this.props.setTabsHidden(false);
    } else {
      this.setState({
        detailsShown: true,
      });
      this.props.setTabsHidden(true);
    }
  };

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
            forMerchants={false}
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
                  {this.props.Data.length != 0 ? (
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
                            const isItemSelected = this.isSelected(
                              row.Username
                            );
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <Row
                                row={row}
                                setDetailsShown={this.setDetailsShown}
                                index={index}
                                setData={this.setData}
                                prop={this.props.ProductProps}
                                logistic={this.props.ProductProps.logistic}
                              />
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
                  ) : (
                    <p className="fadedText">No Orders to Display</p>
                  )}
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

class ViewTransactionsComponent extends Component {
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
      value: 0,
      tabsHidden: false,
      currentlyChosen: "Payment Confirm",
    };

    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: this.state.productStatus,
    //   UserID: localStorage.getItem("id"),
    // });
  }

  componentDidMount() {
    this.props.CallGetTransactionStatus();
    this.props.CallGetTransaction("Payment Confirm");
    this.props.CallCourierService();
  }


  setTabsHidden = (value) => {
    this.setState({
      tabsHidden: value,
    });
  };

  updateList = (e) => {
    this.setState({
      currentlyChosen: e.target.value,
    });
  };

  render() {
    const handleChange = (event, newValue) => {
      console.log(newValue);
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

    let allTransactionStatusData = this.props.alltransactionstatus
      ? Object.keys(this.props.alltransactionstatus).map((key) => {
        console.log(this.props.alltransactionstatus);
        return this.props.alltransactionstatus[key];
      })
      : {};

    if (allTransactionStatusData.length > 0) {
      console.log(allTransactionStatusData);
      var generateOptions = allTransactionStatusData.map((status, i) => {
        return (
          <option value={status.TrackingStatus}>{status.TrackingStatus}</option>
        );
      });
    }

    if (allTransactionStatusData.length > 0) {
      // var generateTabs = allTransactionStatusData.map((status, i) => {
      //   return (
      //     <Tab
      //       label={status.TrackingStatus}
      //       {...a11yProps(i)}
      //     // onClick={changeData.bind(this, status.TrackingStatus)}
      //     />
      //   );
      // });
      // var generatePanels = allTransactionStatusData.map((status, i) => {
      //   var transactionList = this.props.alltransactions;
      //   transactionList = transactionList.filter(
      //     (items) =>

      //       items.TrackingStatusID === allTransactionStatusData[i].TrackingStatusID
      //   );
      //   return (
      //     <TabPanel value={this.state.value} index={i}>
      //       <DisplayTable
      //         Data={transactionList}
      //         ProductProps={this.props}
      //         history={this.props.history}
      //         tabsHidden={this.state.tabsHidden}
      //         setTabsHidden={this.setTabsHidden}
      //       ></DisplayTable>
      //     </TabPanel>
      //   );
      // });

      let transactionList = []
      this.props.alltransactions.filter((x) => x.TrackingStatus === this.state.currentlyChosen).map((y) => {
        transactionList.push(y)
      })

      var generateTable =
        (
          <div>
            <DisplayTable
              Data={transactionList}
              ProductProps={this.props}
              history={this.props.history}
              tabsHidden={this.state.tabsHidden}
              setTabsHidden={this.setTabsHidden}
            />
          </div>
        );

    }
    console.log("this.props 1212", this.props)


    return (
      <div className="mainContainer">
        {!this.state.tabsHidden ? (
          <div>
            <p className="heading">Orders List</p>
            <div className="selectContainer">
              <FormControl variant="outlined" size="small">
                <Select
                  native
                  value={this.state.productSupplier}
                  onChange={this.updateList.bind(this)}
                  inputProps={{
                    name: "Product Supplier",
                    id: "productSupplier",
                  }}
                  className="select"
                >
                  {generateOptions}
                </Select>
              </FormControl>
            </div>
          </div>
        ) : null}
        {generateTable}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTransactionsComponent);

import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Card, CardContent, CardActions } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { lighten, makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import "date-fns";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBox from "../../components/SearchBox/SearchBox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import logo from "../../assets/logo.svg";

function mapStateToProps(state) {
  return {
    allpromos: state.counterReducer["promos"],
    allproducts: state.counterReducer["products"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callGetPromos: () => dispatch(GitAction.CallGetPromo()),
    // CallAllProductsByProductStatus: (prodData) =>
    //   dispatch(GitAction.CallAllProductsByProductStatus(prodData)),
    CallUpdatePromoCode: (promoCodeData) =>
      dispatch(GitAction.CallUpdatePromoCode(promoCodeData)),
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(
    props.allProducts.map((product) => product.ProductName)
  );
  const [right, setRight] = React.useState(props.productsListFromProps);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const updateSearch = (title, e) => {
    if (title == "Products Left") {
      props.setSearchValue(e.target.value, "add");
    } else if (title == "Chosen Products") {
      props.setSearchValue(e.target.value, "remove");
    }
  };

  React.useEffect(() => {
    const timeOutId = setTimeout(() => props.search("add"), 0);
    return () => clearTimeout(timeOutId);
  }, [props.searchWordAdd]);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => props.search("remove"), 0);
    return () => clearTimeout(timeOutId);
  }, [props.searchWordRemove]);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => props.setChosenProducts(right, left), 0);
    return () => clearTimeout(timeOutId);
  }, [right]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () => setLeft(props.allProducts.map((product) => product.ProductName)),
      0
    );
    return () => clearTimeout(timeOutId);
  }, [props.allProducts]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        setRight(
          props.fullChosenProducts.map((product) => product.ProductName)
        ),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [props.fullChosenProducts]);

  const customList = (title, items, valueToBeUsed, allItems) => (
    <Card>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Input
          style={{ width: "80%", marginBottom: "5px" }}
          id="input-with-icon-adornment"
          value={valueToBeUsed}
          onChange={updateSearch.bind(this, title)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />

      <Divider />

      <List className={classes.list} dense component="div" role="list">
        {items.map((value, i) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
                <img
                  style={{ margin: "10px" }}
                  height={50}
                  //   src={JSON.parse(allItems[i].ProductImages)[0].ProductMediaUrl}
                  src={allItems[i]}
                />
              </ListItemIcon>

              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        {customList(
          "Products Left",
          left,
          props.searchWordAdd,
          props.imagesLeft
        )}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {customList(
          "Chosen Products",
          right,
          props.searchWordRemove,
          props.imagesChosen
        )}
      </Grid>
    </Grid>
  );
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

const useStyles2 = makeStyles((theme) => ({
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
  // highlight:
  //   theme.palette.type === "light"
  //     ? {
  //         color: theme.palette.secondary.main,
  //         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  //       }
  //     : {
  //         color: theme.palette.text.primary,
  //         backgroundColor: theme.palette.secondary.dark,
  //       },
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
    // disablePadding: true,
    label: "Product Name",
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
  const classes = useStyles2();
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
      orderProductDetail: row.OrderProductDetail,
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

  isSelected = (name) => {
    // this.state.selected.indexOf(name) !== -1;
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
                    rowCount={this.props.Data.length}
                  />
                  {this.props.Data.filter((searchedItem) =>
                    searchedItem.ProductName.toLowerCase().includes(
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
                        const isItemSelected = this.isSelected(row.Quantity);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={(event) =>
                            //   this.onRowClick(event, row, index)
                            // }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.Quantity}
                            selected={isItemSelected}
                          >
                            <TableCell align="center">{row.Picture}</TableCell>
                            <TableCell align="left">
                              {row.ProductName}
                            </TableCell>
                            {/* <TableCell align="left">{row.Quantity}</TableCell>
                              <TableCell align="left">
                                {row.ProductSellingPrice}
                              </TableCell>
                              <TableCell align="left">
                                {row.Quantity * row.ProductSellingPrice}
                              </TableCell> */}
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
      </div>
    );
  }
}
class PromoCodeDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.props.callGetPromos();
    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: "Endorsed",
    //   UserID: window.localStorage.getItem("id"),
    // });
  }

  state = {
    promo: this.props.data.promotionID, //promotion selected
    promoCode: this.props.data.name, // the promo code to be sent if included
    productsDisplayed: [],
    searchWordAdd: "",
    searchWordRemove: "",
    chosenProducts: [],
    chosenProductsNames: [],
    fullChosenProducts: JSON.parse(this.props.data.promoCodeDetail),
    fullChosenProductsBackup: JSON.parse(this.props.data.promoCodeDetail), //final products chosen to be sent
    productsLeft: [],
    promoNotSelected: false,
    productsAreNotChosen: false,
    startDateNotSet: false,
    endDateNotSet: false,
    promoStart: new Date(this.props.data.beginDate).toLocaleString(),
    promoEnd: new Date(this.props.data.endDate).toLocaleString(),
    startDateForTextView: new Date(this.props.data.beginDate),
    endDateForTextView: new Date(this.props.data.endDate),
    startDateInvalid: false,
    endDateInvalid: false,
    toBeEdited: false,
    imagesChosen: [],
    imagesLeft: [],
  };

  handleChange = (data, e) => {
    if (data == "promotion") {
      this.setState({
        promo: e.target.value,
      });
      setTimeout(
        function () {
          this.checkPromoChosen();
        }.bind(this),
        200
      );
    } else if (data == "promoCode") {
      this.setState({
        promoCode: e.target.value,
      });
    } else if (data == "startDate") {
      if (e != null) {
        if (moment(e, "MM/DD/YYYY", true).isValid()) {
          var startDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            e.getDate();

          this.setState({
            startDateForTextView: e,
            promoStart: startDate,
          });
        } else {
          this.setState({
            startDateForTextView: e,
            promoStart: "",
          });
        }
      } else {
        this.setState({
          promoStart: "",
        });
      }

      setTimeout(
        function () {
          this.checkStartDate();
        }.bind(this),
        200
      );
      setTimeout(
        function () {
          this.checkEndDate();
        }.bind(this),
        200
      );
    } else if (data == "endDate") {
      if (e != null) {
        if (moment(e, "MM/DD/YYYY", true).isValid()) {
          var endDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            e.getDate();

          this.setState({
            endDateForTextView: e,
            promoEnd: endDate,
          });
        } else {
          this.setState({
            endDateForTextView: e,
            promoEnd: "",
          });
        }
      } else {
        this.setState({
          promoEnd: "",
        });
      }

      setTimeout(
        function () {
          this.checkEndDate();
        }.bind(this),
        200
      );
      setTimeout(
        function () {
          this.checkStartDate();
        }.bind(this),
        200
      );
    }
  };

  checkPromoChosen = () => {
    if (this.state.promo == "") {
      this.setState({
        promoNotSelected: true,
      });
    } else {
      this.setState({
        promoNotSelected: false,
      });
    }
  };

  checkStartDate = () => {
    if (
      this.state.startDateForTextView == "" ||
      this.state.startDateForTextView == null
    ) {
      this.setState({
        startDateNotSet: true,
      });
    } else {
      this.setState({
        startDateNotSet: false,
      });
    }

    var currentDate = new Date(this.props.data.beginDate);
    var currentDay = currentDate.getDate();
    var currentMonth = parseInt(currentDate.getMonth() + 1);

    var currentYear = currentDate.getFullYear();

    if (currentYear > this.state.startDateForTextView.getFullYear()) {
      this.setState({
        startDateInvalid: true,
      });
    } else if (currentYear == this.state.startDateForTextView.getFullYear()) {
      if (currentMonth > this.state.startDateForTextView.getMonth() + 1) {
        this.setState({
          startDateInvalid: true,
        });
      } else if (
        currentMonth ==
        this.state.startDateForTextView.getMonth() + 1
      ) {
        if (currentDay > this.state.startDateForTextView.getDate()) {
          this.setState({
            startDateInvalid: true,
          });
        } else {
          this.setState({
            startDateInvalid: false,
          });
        }
      } else {
        this.setState({
          startDateInvalid: false,
        });
      }
    } else {
      this.setState({
        startDateInvalid: false,
      });
    }
  };

  checkEndDate = () => {
    if (
      this.state.endDateForTextView == "" ||
      this.state.endDateForTextView == null
    ) {
      this.setState({
        endDateNotSet: true,
      });
    } else {
      this.setState({
        endDateNotSet: false,
      });
    }

    var startDay = this.state.startDateForTextView.getDate();
    var startMonth = parseInt(this.state.startDateForTextView.getMonth() + 1);

    var startYear = this.state.startDateForTextView.getFullYear();

    if (startYear > this.state.endDateForTextView.getFullYear()) {
      this.setState({
        endDateInvalid: true,
      });
    } else if (startYear == this.state.endDateForTextView.getFullYear()) {
      if (startMonth > this.state.endDateForTextView.getMonth() + 1) {
        this.setState({
          endDateInvalid: true,
        });
      } else if (startMonth == this.state.endDateForTextView.getMonth() + 1) {
        if (startDay > this.state.endDateForTextView.getDate()) {
          this.setState({
            endDateInvalid: true,
          });
        } else {
          this.setState({
            endDateInvalid: false,
          });
        }
      } else {
        this.setState({
          startDateInvalid: false,
        });
      }
    } else {
      this.setState({
        startDateInvalid: false,
      });
    }
  };

  checkProductsAreChosen = () => {
    if (this.state.fullChosenProductsBackup.length > 0) {
      this.setState({
        productsAreNotChosen: false,
      });
    } else {
      this.setState({
        productsAreNotChosen: true,
      });
    }
  };

  checkValues = () => {
    this.checkPromoChosen();
    this.checkProductsAreChosen();
    this.checkEndDate();
    this.checkStartDate();

    setTimeout(
      function () {
        this.submitValues();
      }.bind(this),
      500
    );
  };

  submitValues = () => {
    if (
      !(
        this.state.productsAreNotChosen ||
        this.state.promoNotSelected ||
        this.state.startDateNotSet ||
        this.state.endDateNotSet ||
        this.state.startDateInvalid ||
        this.state.endDateInvalid
      )
    ) {
      var ProductIDOnly = [];
      this.state.fullChosenProductsBackup.map((product) => {
        ProductIDOnly.push(product.ProductID);
      });

      var endDate =
        this.state.PromotionEndDate.getFullYear() +
        "" +
        (this.state.PromotionEndDate.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.PromotionEndDate.getMonth() + 1) +
        "" +
        ((this.state.PromotionEndDate.getDate() < 10 ? "0" : "") +
          this.state.PromotionEndDate.getDate());

      var startDate =
        this.state.PromotionStartDate.getFullYear() +
        "" +
        (this.state.PromotionStartDate.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.PromotionStartDate.getMonth() + 1) +
        "" +
        ((this.state.PromotionStartDate.getDate() < 10 ? "0" : "") +
          this.state.PromotionStartDate.getDate());

      const promoInfo = {
        productID: ProductIDOnly,
        promo: this.state.promo,
        promoStart: startDate,
        promoEnd: endDate,
        promoCode: this.state.promoCode,
        promoCodeId: this.props.data.promoCodeID,
      };

      setTimeout(
        function () {
          this.props.CallUpdatePromoCode(promoInfo);
        }.bind(this),
        500
      );
      
      setTimeout(
        function () {
          this.props.history.push("/viewPromoCodes");
          window.location.reload(false);
        }.bind(this),
        500
      );
    }
  };

  render() {
    let allProductsData = this.props.allproducts
      ? Object.keys(this.props.allproducts).map((key) => {
        return this.props.allproducts[key];
      })
      : {};

    let allpromosData = this.props.allpromos
      ? Object.keys(this.props.allpromos).map((key) => {
        return this.props.allpromos[key];
      })
      : {};
    if (allpromosData.length > 0) {
      var createMenusForDropDownPromos = allpromosData.map((d, i) => {
        return <option value={d.PromotionID}>{d.PromotionTitle}</option>;
      });
    }

    const Search = (type) => {
      var newList = [];
      if (type == "add") {
        newList = allProductsData;

        newList.map((productLeft) => {
          this.state.fullChosenProducts.map((chosen) => {
            if (productLeft.ProductName != chosen.ProductName) {
              newList = newList.filter(
                (item) => item.ProductName != chosen.ProductName
              );
            }
          });
        });

        var items = [];
        newList.map((product) => {
          if (
            product.ProductName.toLowerCase().includes(
              this.state.searchWordAdd.toLowerCase()
            )
          ) {
            items.push(product);
          }
        });

        var newItemsImages = items.map(
          (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
        );
        this.setState({
          productsDisplayed: items,
          imagesLeft: newItemsImages,
        });
      } else if (type == "remove") {
        var chosenItems = allProductsData;
        this.state.productsLeft.map((product) => {
          chosenItems = chosenItems.filter(
            (listItem) => listItem.ProductName != product
          );
        });
        chosenItems.map((product) => {
          if (
            product.ProductName.toLowerCase().includes(
              this.state.searchWordRemove.toLowerCase()
            )
          ) {
            newList.push(product);
          }
        });

        var newProductListImages = newList.map(
          (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
        );
        this.setState({
          fullChosenProducts: newList,
          fullChosenProductsBackup: chosenItems,
          imagesChosen: newProductListImages,
        });
      }
    };

    const setSearchValue = (value, type) => {
      if (type == "add") {
        this.setState({
          searchWordAdd: value,
        });
      } else if (type == "remove") {
        this.setState({
          searchWordRemove: value,
        });
      }
    };

    const setChosenProducts = (chosen, left) => {
      this.setState({
        chosenProductsNames: chosen,
        productsLeft: left,
      });
      setFullChosenProduct();
    };

    const setFullChosenProduct = () => {
      var newProductList = [];
      this.state.chosenProductsNames.map((chosenProduct) => {
        allProductsData.map((product) => {
          if (product.ProductName == chosenProduct) {
            newProductList.push(product);
          }
        });
      });
      var newList = [];
      var chosenItems = allProductsData;
      this.state.productsLeft.map((product) => {
        chosenItems = chosenItems.filter(
          (listItem) => listItem.ProductName != product
        );
      });
      chosenItems.map((product) => {
        if (
          product.ProductName.toLowerCase().includes(
            this.state.searchWordRemove.toLowerCase()
          )
        ) {
          newList.push(product);
        }
      });
      var newProductListImages = newProductList.map(
        (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
      );
      var ItemsLeft = allProductsData;
      newProductList.map((productItem) => {
        ItemsLeft = ItemsLeft.filter(
          (items) => items.ProductName !== productItem.ProductName
        );
      });

      var leftImages = ItemsLeft.map(
        (images) => JSON.parse(images.ProductImages)[0].ProductMediaUrl
      );

      this.setState({
        fullChosenProducts: newProductList,
        fullChosenProductsBackup: newList,
        imagesChosen: newProductListImages,
        imagesLeft: leftImages,
      });
      if (this.state.productsAreNotChosen) {
        setTimeout(
          function () {
            this.checkProductsAreChosen();
          }.bind(this),
          200
        );
      }
    };

    const back = () => {
      window.location.reload(false);
    };

    const edit = (e) => {
      if (this.state.toBeEdited) {
        this.setState({
          toBeEdited: false,
        });
      } else {
        this.setState({
          toBeEdited: true,
        });
      }
    };

    return (
      <div>
        {this.state.toBeEdited ? (
          <div>
            <h2 style={{ margin: "10px" }}>Update Promo Code Details</h2>
            <Button onClick={back}>
              <i class="fas fa-chevron-left"></i>Back
            </Button>
            <Card style={{ width: "80%", margin: "0 auto" }}>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={edit}
                  style={{
                    float: "right",
                  }}
                >
                  {this.state.toBeEdited ? "Cancel" : "Edit"}
                </Button>
                <FormControl
                  style={{ width: "100%" }}
                  error={this.state.promoNotSelected}
                >
                  <InputLabel htmlFor="simple-select">Promotion</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    inputProps={{
                      name: "promotions",
                      id: "simple-select",
                    }}
                    value={this.state.promo}
                    onChange={this.handleChange.bind(this, "promotion")}
                  >
                    <option aria-label="None" value="" />
                    {createMenusForDropDownPromos}
                  </Select>
                </FormControl>
                {this.state.promoNotSelected && (
                  <p style={{ color: "red" }}>
                    A promotion has to be selected.
                  </p>
                )}

                <FormControl style={{ width: "100%", marginTop: "10px" }}>
                  <InputLabel htmlFor="component-helper">
                    Promotion Code
                  </InputLabel>
                  <Input
                    id="component-helper"
                    value={this.state.promoCode}
                    onChange={this.handleChange.bind(this, "promoCode")}
                    aria-describedby="component-helper-text"
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormHelperText id="component-helper-text">
                      {"*Optional"}
                    </FormHelperText>
                    <FormHelperText id="component-helper-text">
                      {
                        "Note: If no value is keyed in a random code will be generated to be used."
                      }
                    </FormHelperText>
                  </div>
                </FormControl>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div style={{ width: "100%", margin: "10px" }}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start Date"
                        value={this.state.startDateForTextView}
                        onChange={this.handleChange.bind(this, "startDate")}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        style={{ width: "100%" }}
                        error={
                          this.state.startDateNotSet ||
                          this.state.startDateInvalid
                        }
                      />
                      {this.state.startDateNotSet ||
                        this.state.startDateInvalid ? (
                        <FormHelperText style={{ color: "red" }}>
                          Please enter a valid start date.
                        </FormHelperText>
                      ) : null}
                    </div>
                    <div style={{ width: "100%", margin: "10px" }}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="End Date"
                        value={this.state.endDateForTextView}
                        onChange={this.handleChange.bind(this, "endDate")}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        style={{ width: "100%" }}
                        error={
                          this.state.endDateNotSet || this.state.endDateInvalid
                        }
                      />
                      {this.state.endDateNotSet || this.state.endDateInvalid ? (
                        <FormHelperText style={{ color: "red" }}>
                          Please enter a valid end date.
                        </FormHelperText>
                      ) : null}
                    </div>
                  </MuiPickersUtilsProvider>
                </div>
                <InputLabel style={{ marginTop: "20px" }}>
                  Select the products for the promotion
                </InputLabel>
                <TransferList
                  allProducts={this.state.productsDisplayed}
                  search={Search}
                  searchWordAdd={this.state.searchWordAdd}
                  setSearchValue={setSearchValue}
                  searchWordRemove={this.state.searchWordRemove}
                  setChosenProducts={setChosenProducts}
                  chosenProducts={this.state.chosenProductsNames}
                  fullChosenProducts={this.state.fullChosenProducts}
                  productsListFromProps={
                    this.props.data.promoCodeDetail
                      ? JSON.parse(this.props.data.promoCodeDetail).map(
                        (product) => product.ProductName
                      )
                      : []
                  }
                  imagesChosen={this.state.imagesChosen}
                  imagesLeft={this.state.imagesLeft}
                />
                {this.state.productsAreNotChosen ? (
                  <FormHelperText style={{ color: "red" }}>
                    Have to have at least one product chosen.
                  </FormHelperText>
                ) : null}
              </CardContent>
              <div
                style={{ width: "100%", textAlign: "center", margin: "10px" }}
              >
                <Button
                  variant="outlined"
                  onClick={this.checkValues.bind(this)}
                >
                  Submit
                </Button>
              </div>
            </Card>{" "}
          </div>
        ) : (
          <div>
            {" "}
            <h2 style={{ margin: "10px" }}>Promo Code Details</h2>
            <Button onClick={back}>
              <i class="fas fa-chevron-left"></i>Back
            </Button>
            <Card style={{ width: "80%", margin: "0 auto" }}>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={edit}
                  style={{
                    float: "right",
                  }}
                >
                  {this.state.toBeEdited ? "Cancel" : "Edit"}
                </Button>

                <FormControl
                  style={{ width: "100%" }}
                  error={this.state.promoNotSelected}
                >
                  <InputLabel htmlFor="simple-select">Promotion</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    inputProps={{
                      name: "promotions",
                      id: "simple-select",
                    }}
                    disabled
                    value={this.state.promo}
                    onChange={this.handleChange.bind(this, "promotion")}
                  >
                    <option aria-label="None" value="" />
                    {createMenusForDropDownPromos}
                  </Select>
                </FormControl>

                {this.state.promoNotSelected && (
                  <p style={{ color: "red" }}>
                    A promotion has to be selected.
                  </p>
                )}

                <FormControl style={{ width: "100%", marginTop: "5px" }}>
                  <InputLabel htmlFor="component-simple">
                    Promotion Code
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.promoCode}
                    onChange={this.handleChange.bind(this, "promotion")}
                    readOnly
                  />
                </FormControl>
                <div style={{ display: "flex", width: "100%" }}>
                  <FormControl
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  >
                    <InputLabel htmlFor="component-simple">
                      Start Date
                    </InputLabel>
                    <Input
                      id="component-simple"
                      value={this.state.startDateForTextView.toLocaleDateString()}
                      onChange={this.handleChange.bind(this, "promotion")}
                      readOnly
                    />
                  </FormControl>
                  <FormControl style={{ width: "100%", marginTop: "5px" }}>
                    <InputLabel htmlFor="component-simple">End Date</InputLabel>
                    <Input
                      id="component-simple"
                      value={this.state.endDateForTextView.toLocaleDateString()}
                      onChange={this.handleChange.bind(this, "promotion")}
                      readOnly
                    />
                  </FormControl>
                </div>
                <InputLabel style={{ marginTop: "20px" }}>
                  Chosen Products
                </InputLabel>
                {/* <ol>
                  {this.props.data.promoCodeDetail ? (
                    JSON.parse(
                      this.props.data.promoCodeDetail
                    ).map((product) => <li>{product.ProductName}</li>)
                  ) : (
                    <p>No products added</p>
                  )}
                </ol> */}
                <DisplayTable
                  Data={JSON.parse(this.props.data.promoCodeDetail)}
                />
                {this.state.productaAreNotChosen ? (
                  <FormHelperText style={{ color: "red" }}>
                    Have to have at least one product chosen.
                  </FormHelperText>
                ) : null}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromoCodeDetailsComponent);

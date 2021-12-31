import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
//----------------------------------Table Things---------------------------------------------------
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Input from "@material-ui/core/Input";
import Logo from "../../assets/Emporia.png";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import SearchBox from "../../components/SearchBox/SearchBox";
import InputLabel from "@material-ui/core/InputLabel";
//------------------------------------------------------------------- DatePicker-----------------------------------------------
import "date-fns";
import { format } from "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

// -------------------------------------------------ADD PRODUCT THINGS--------------------------------------------------------
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CardHeader from "@material-ui/core/CardHeader";
import { browserHistory } from "react-router";

//----------------------------------------------------------------------------------------------------
function mapStateToProps(state) {
  return {
    // allstocks: state.counterReducer["products"],
    allproducts: state.counterReducer["products"],
    allpromo: state.counterReducer["promotions"],
    updatepromo: state.counterReducer["newPromoObj"],
  };
}

// ------------------------------------------- Call call-----------------------------------------------
function mapDispatchToProps(dispatch) {
  return {
    CallViewPromotion: (promoData) =>
      dispatch(GitAction.CallViewPromotion(promoData)),
    CallUpdatePromotion: (promoData) =>
      dispatch(GitAction.CallUpdatePromotion(promoData)),
    // CallAllProductsByProductStatus: (prodData) =>
    //   dispatch(GitAction.CallAllProductsByProductStatus(prodData)), // To call Product List For Promotion Product
  };
}

// ------------------------------------- Add Product --------------------------------------------------
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

  const getListOfProductName = () => {
    let list = []
    props.allProducts.filter(el => !props.productsListFromProps.includes(el.ProductName)).map((el) => list.push(el.ProductName))
    return list
  }

  const [left, setLeft] = React.useState(getListOfProductName());
  const [right, setRight] = React.useState(props.productsListFromProps);
  // var [left, setLeft] = React.useState(
  //   [props.allProducts.filter(function(e) {
  //     let i = right.indexOf(e)
  //     return 1 == -1 ? true : (right.splice(i, 1), false)
  //   ;})])


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
    if (title === "Products Left") {
      props.setSearchValue(e.target.value, "add");
    } else if (title === "Chosen Products") {
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
      () => setLeft(getListOfProductName()),
      5000
    );
    return () => clearTimeout(timeOutId);
  }, [props.allProducts]);

  React.useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        setRight(
          props.fullChosenProducts.map((product) => product.ProductName)
        ),
      5000
    );
    return () => clearTimeout(timeOutId);
  }, [props.fullChosenProducts]);

  const customList = (title, items, valueToBeUsed, allItems) => (
    <Card>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          maxHeight: "230dp",
          overflow: "auto",
        }}
      >
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
                  // src={JSON.parse(allItems[i].ProductImages)[0].ProductMediaUrl}
                  src={allItems[i]}
                  alt=""
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
      justifyContent="center"
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

//------------------------------------- Table Component ------------------------------------------------
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
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
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
  //         // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  //       }
  //     : {
  //         color: theme.palette.text.primary,
  //         backgroundColor: theme.palette.secondary.dark,
  //       },
  title: {
    flex: "1 1 100%",
  },
}));
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

const SelectProductTableToolbar = (props) => {
  const classes = useStyles();

  const { numSelected } = props;

  return (
    <Toolbar
    // className={clsx(classes.root, {
    //   [classes.highlight]: numSelected > 0,
    // })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Selected Product
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          // variant="h6"
          id="tableTitle"
          component="div"
        >
          Promotion Product Selection
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Add">
          <IconButton aria-label="add">
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
};

SelectProductTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
const headCells = [
  {
    id: "ProductImage",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "ProductName",
    numeric: false,
    // disablePadding: true,
    label: "Brand",
  },
];

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
      // ProductID: JSON.parse(this.props.data.PromotionDetail),
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
      ProductName: row.ProductName,
      Brand: row.Brand,
      ProductID: row.ProductID,
    });


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

  isSelected = (name) => { };

  render() {


    const { classes, data, data2 } = this.props;

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
        <div>
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
                        const isItemSelected = this.isSelected(row.ProductID);
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
                            key={row.ProductID}
                            selected={this.state.ProductID}
                          >
                            {/* <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </TableCell> */}
                            <TableCell align="left">
                              {row.ProductName}
                            </TableCell>
                            <TableCell align="left">{row.Brand}</TableCell>
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

class PromotionDetailsComponent extends Component {
  constructor(props) {
    super(props);
    // this.props.CallAllProductsByProductStatus({
    //   ProductStatus: "Endorsed",
    //   UserID: window.localStorage.getItem("id"),
    // });
  }

  state = {
    order: "asc",
    orderBy: "productName",
    ProductID: [],
    page: 0,
    dense: false,
    rowsPerPage: 5,
    searchFilter: "",
    Discount: null,
    // Amount: [],
    isChecked: true,
    PromotionID: this.props.data.PromotionID,
    PromotionTitle: this.props.data.PromotionTitle,
    PromotionDesc: this.props.data.PromotionDesc,
    DiscountPercentage: this.props.data.DiscountPercentage,
    promoStart: new Date().toLocaleString(),
    promoEnd: new Date().toLocaleString(),
    PromotionStartDate: new Date(this.props.data.BeginDate),
    PromotionEndDate: new Date(this.props.data.EndDate),

    productsDisplayed: [],
    searchWordAdd: "",
    searchWordRemove: "",
    chosenProducts: [],
    imagesChosen: [],
    imagesLeft: [],
    chosenProductsNames: [],
    productsLeft: [],
    fullChosenProducts: JSON.parse(this.props.data.PromotionDetail),
    fullChosenProductsBackup: JSON.parse(this.props.data.PromotionDetail), //final products chosen to be sent

    startDateNotSet: false,
    startDateInvalid: false,
    endDateNotSet: false,
    endDateInvalid: false,
    PromotionTitleEmpty: false,
    PromotionDescEmpty: false,
    productsAreNotChosen: false,
    toBeEdited: false,
  };
  // this.isSelected = this.isSelected.bind(this);


  handleChange(data, e) {
    if (data === "PromotionTitle") {
      this.setState({
        PromotionTitle: e.target.value,
      });
    } else if (data === "PromotionDesc") {
      this.setState({
        PromotionDesc: e.target.value,
      });
    } else if (data === "PromotionStartDate") {
      if (e !== null) {
        if (moment(e, "MM/DD/YYYY", true).isValid()) {
          var StartDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            ((e.getDate() < 10 ? "0" : "") + e.getDate());

          this.setState({
            PromotionStartDate: e,
            promoStart: StartDate,
          });
        } else {
          this.setState({
            PromotionEndDate: e,
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
    } else if (data === "PromotionEndDate") {
      if (e !== null) {
        if (moment(e, "MM/DD/YYYY", true).isValid()) {
          var EndDate =
            e.getFullYear() +
            "" +
            parseInt(e.getMonth() + 1) +
            "" +
            ((e.getDate() < 10 ? "0" : "") + e.getDate());

          this.setState({
            PromotionEndDate: e,
            promoEnd: EndDate,
          });
        } else {
          this.setState({
            PromotionEndDate: e,
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
    } else if (data === "Discount") {
      this.setState({
        Discount: e.target.value,
      });
    }
    // else if (data === "ProductID") {

    //   this.setState({
    //     ProductID: e.target.value,
    //   });
    // }
  }

  checkPromotionTitle = () => {
    if (
      this.state.PromotionTitle === "" ||
      this.state.PromotionTitle === null
    ) {
      this.setState({
        PromotionTitleEmpty: true,
      });
    } else {
      this.setState({
        PromotionTitleEmpty: false,
      });
    }
  };

  checkPromotionDesc = () => {
    if (this.state.PromotionDesc === "" || this.state.PromotionDesc === null) {
      this.setState({
        PromotionDescEmpty: true,
      });
    } else {
      this.setState({
        PromotionDescEmpty: false,
      });
    }
  };

  checkStartDate = () => {
    if (
      this.state.PromotionStartDate === "" ||
      this.state.PromotionStartDate === null
    ) {
      this.setState({
        startDateNotSet: true,
      });
    } else {
      this.setState({
        startDateNotSet: false,
      });
    }
    var currentDate = new Date(this.props.data.BeginDate);
    var currentDay = currentDate.getDate();
    var currentMonth = parseInt(currentDate.getMonth() + 1);

    var currentYear = currentDate.getFullYear();

    if (currentYear > this.state.PromotionStartDate.getFullYear()) {
    } else if (currentYear === this.state.PromotionStartDate.getFullYear()) {
      if (currentMonth > this.state.PromotionStartDate.getMonth() + 1) {
        this.setState({
          startDateInvalid: true,
        });
      } else if (
        currentMonth ===
        this.state.PromotionStartDate.getMonth() + 1
      ) {
        if (currentDay > this.state.PromotionStartDate.getDate()) {
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
      this.state.PromotionEndDate === "" ||
      this.state.PromotionEndDate == null
    ) {
      this.setState({
        endDateNotSet: true,
      });
    } else {
      this.setState({
        endDateNotSet: false,
      });
    }

    var startDay = this.state.PromotionStartDate.getDate();
    var startMonth = parseInt(this.state.PromotionStartDate.getMonth() + 1);

    var startYear = this.state.PromotionStartDate.getFullYear();

    if (startYear > this.state.PromotionEndDate.getFullYear()) {
      this.setState({
        endDateInvalid: true,
      });
    } else if (startYear === this.state.PromotionEndDate.getFullYear()) {
      if (startMonth > this.state.PromotionEndDate.getMonth() + 1) {
        this.setState({
          endDateInvalid: true,
        });
      } else if (startMonth === this.state.PromotionEndDate.getMonth() + 1) {
        if (startDay > this.state.PromotionEndDate.getDate()) {
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

  checkDiscount = () => {
    if (this.state.Discount === "" || this.state.Discount === null) {
      this.setState({
        DiscountEmpty: true,
      });
    } else {
      this.setState({
        DiscountEmpty: false,
      });
    }
  };

  checkEverything = () => {
    this.checkPromotionTitle();
    this.checkPromotionDesc();
    this.checkStartDate();
    this.checkEndDate();
    this.checkProductsAreChosen();
    this.checkDiscount();

    setTimeout(
      function () {
        this.uploadFile();
      }.bind(this),
      500
    );
  };

  uploadFile = () => {
    if (
      !(
        this.state.PromotionTitleEmpty ||
        this.state.PromotionDescEmpty ||
        this.state.productsAreNotChosen ||
        this.state.DiscountEmpty ||
        this.state.startDateInvalid ||
        this.state.endDateInvalid ||
        this.state.startDateNotSet ||
        this.state.endDateNotSet
      )
    ) {
      var ProductIDOnly = [];
      this.state.fullChosenProductsBackup.map((product) => {
        ProductIDOnly.push(product.ProductID);
      });
      var EndDate =
        this.state.PromotionEndDate.getFullYear() +
        "" +
        (this.state.PromotionEndDate.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.PromotionEndDate.getMonth() + 1) +
        "" +
        ((this.state.PromotionEndDate.getDate() < 10 ? "0" : "") +
          this.state.PromotionEndDate.getDate());

      var StartDate =
        this.state.PromotionStartDate.getFullYear() +
        "" +
        (this.state.PromotionStartDate.getMonth() + 1 < 10 ? "0" : "") +
        (this.state.PromotionStartDate.getMonth() + 1) +
        "" +
        ((this.state.PromotionStartDate.getDate() < 10 ? "0" : "") +
          this.state.PromotionStartDate.getDate());

      const promoInfo = {
        PromotionID: this.props.data.PromotionID,
        PromotionTitle: this.state.PromotionTitle,
        PromotionDesc: this.state.PromotionDesc,
        BannerImage: null,
        SlideOrder: null,
        promoStart: StartDate,
        promoEnd: EndDate,
        ProductID: ProductIDOnly,
        DiscountPercentage: this.state.DiscountPercentage,
      };

      setTimeout(
        function () {
          alert("Submitted!");
          this.props.CallUpdatePromotion(promoInfo);
        }.bind(this),
        500
      );
      setTimeout(
        function () {
          // this.props.history.push("/viewProductPromotion");
          browserHistory.push("/viewProductPromotion");
          window.location.reload(false);
        }.bind(this),
        500
      );
    }
  };

  render() {


    const { data, data2 } = this.props;

    console.log("CHECK DATA", this.props.data)

    console.log("CHECK DATA2", data)


    data.PromotionDetail !== null && JSON.parse(data.PromotionDetail).map((X) => {
      console.log("THIS IS", X)
    })

    let allProductsData = this.props.allproducts
      ? Object.keys(this.props.allproducts).map((key) => {
        return this.props.allproducts[key];
      })
      : {};

    const back = () => {
      window.location.reload(false);
    };

    // ------------------------------------------------------------ Edit Component ---------------------------------------------------
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

    let PromotionsData = this.props.allpromo
      ? Object.keys(this.props.allpromo).map((key) => {
        return this.props.allpromo[key];
      })
      : {};

    // -----------------------------------------------------------------------------------------------------------------------------------

    // const handleClick = (event, name) => {
    //   const selectedIndex = this.state.ProductID.indexOf(name);
    //   let newSelected = [];

    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(this.state.ProductID, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(this.state.ProductID.slice(1));
    //   } else if (selectedIndex === this.state.ProductID.length - 1) {
    //     newSelected = newSelected.concat(this.state.ProductID.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       this.state.ProductID.slice(0, selectedIndex),
    //       this.state.ProductID.slice(selectedIndex + 1)
    //     );
    //   }
    //   this.setState({ ProductID: newSelected });
    // };

    // const isSelected = (name) => this.state.ProductID.indexOf(name) !== -1;

    const handleChangePage = (event, newPage) => {
      this.setState({ page: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
      this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    };

    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.allproducts.length - this.state.page * this.state.rowsPerPage
      );

    const divStyle = {
      width: "100%",
      margin: "auto",
      padding: "1%",
      marginTop: "15px",
    };

    const classes = {
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
      title: {
        flex: "1 1 100%",
      },
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

    // ------------------------------------------------------- Add Product -------------------------------------------------------

    const Search = (type) => {
      var newList = [];
      if (type === "add") {
        newList = allProductsData;

        newList.map((productLeft) => {
          if (!this.state.fullChosenProducts == null) {
            this.state.fullChosenProducts.map((chosen) => {
              if (productLeft.ProductName !== chosen.ProductName) {
                newList = newList.filter(
                  (item) => item.ProductName !== chosen.ProductName
                );
              }
            });
          }
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
      } else if (type === "remove") {
        var chosenItems = allProductsData;
        this.state.productsLeft.map((product) => {
          chosenItems = chosenItems.filter(
            (listItem) => listItem.ProductName !== product
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
      if (type === "add") {
        this.setState({
          searchWordAdd: value,
        });
      } else if (type === "remove") {
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
          if (product.ProductName === chosenProduct) {
            newProductList.push(product);
          }
        });
      });
      var newList = [];
      var chosenItems = allProductsData;
      this.state.productsLeft.map((product) => {
        chosenItems = chosenItems.filter(
          (listItem) => listItem.ProductName !== product
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

    return (
      <div>
        {" "}
        {this.state.toBeEdited ? (
          <div
            className="App"
            style={{ width: "100%", alignContent: "center" }}
          >
            <div className="App-header">
              <h1 style={{ margin: "10px" }}>Update Promotion</h1>
            </div>
            <Button onClick={back}>
              <i className="fas fa-chevron-left"></i>Back
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
                {/* -------------------------------- Add Promotion Title ------------------------------------- */}

                <TextField
                  id="text-field-controlled"
                  helperText="Promotion Title"
                  value={this.state.PromotionTitle}
                  onChange={this.handleChange.bind(this, "PromotionTitle")}
                  type="text"
                  style={{ width: "100%" }}
                  error={this.state.PromotionTitleEmpty}
                />
                <br />
                {this.state.PromotionTitleEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Product Title Need to Be Set.
                  </p>
                )}

                {/* -------------------------------- Add Promotion Effective Date----------------------------- */}

                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <FormHelperText>Effective Date: </FormHelperText>
                    <br />
                    <div style={{ margin: "5px", width: "100%" }}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        id="PromotionStartDate"
                        label="Start Date"
                        value={this.state.PromotionStartDate}
                        format="dd/MM/yyyy"
                        onChange={this.handleChange.bind(
                          this,
                          "PromotionStartDate"
                        )}
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
                    <div style={{ margin: "5px", width: "100%" }}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        id="PromotionEndDate"
                        label="End Date"
                        value={this.state.PromotionEndDate}
                        format="dd/MM/yyyy"
                        onChange={this.handleChange.bind(
                          this,
                          "PromotionEndDate"
                        )}
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
                  </div>
                </MuiPickersUtilsProvider> */}

                {/* -----------------------------------Add Discount Percentage  -------------------------------------- */}
                <div>
                  <TextField
                    id="text-field-controlled"
                    helperText="Discount Percentage"
                    value={this.state.Discount}
                    onChange={this.handleChange.bind(this, "Discount")}
                    type="number"
                    style={{ width: "30%" }}
                    error={this.state.DiscountEmpty}
                  />
                  {this.state.DiscountEmpty && (
                    <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                      Promotion Discount Percentage Need to Be Set.
                    </p>
                  )}
                </div>

                {/* ----------------------------------- Add Product  --------------------------------------- */}
                <div>
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
                      this.props.data.PromotionDetail
                        ? JSON.parse(this.props.data.PromotionDetail).map(
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
                </div>
                {/* ---------------------------------------------------------------------------------------------------------- */}
                <br />
                <TextField
                  id="PromotionDesc"
                  label="Promotion Description"
                  multiline
                  rows={4}
                  defaultValue=" "
                  value={this.state.PromotionDesc}
                  variant="outlined"
                  onChange={this.handleChange.bind(this, "PromotionDesc")}
                  style={{ width: "100%" }}
                  error={this.state.PromotionDescEmpty}
                />
                <br />
                {this.state.PromotionDescEmpty && (
                  <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
                    Promotion Description Need to Be Set.
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                ></div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                ></div>
                <br />

                <div style={{ width: "100%", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.checkEverything}
                    style={{ margin: "0 auto" }}
                  >
                    Submit Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="App" style={{ width: "100%", alignContent: "center" }}   >
            <div className="App-header">
              <h1 style={{ margin: "10px" }}>Promotion Details</h1>
              <Button onClick={back}>
                <i className="fas fa-chevron-left"></i>Back
              </Button>
            </div>
            <Card style={classes}>
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
                {/* -------------------------------- Add Promotion Title ------------------------------------- */}
                {/* <TextField
                  id="text-field-controlled"
                  helperText="Promotion Title"
                  value={this.state.PromotionTitle}
                  onChange={this.handleChange.bind(this, "PromotionTitle")}
                  style={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
                <label>Promotion Title : </label>
                <label>{this.state.PromotionTitle}</label>
                <br />
                {/* -------------------------------- Add Promotion Effective Date----------------------------- */}
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <br />
                    <FormHelperText style={{ margin: "10px" }}>
                      Effective Date:{" "}
                    </FormHelperText>
                    <div style={{ margin: "5px", width: "100%" }}>

                      <KeyboardDatePicker
                        style={{ width: "100%" }}
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        id="component-simple"
                        label="Start Date"
                        value={this.state.PromotionStartDate.toLocaleDateString()}
                        format="dd/MM/yyyy"
                        onChange={this.handleChange.bind(
                          this,
                          "PromotionStartDate"
                        )}
                        readOnly
                      />
                      <TextField
                        id="text-field-controlled"
                        helperText="Start Date"
                        value={this.state.PromotionStartDate.toLocaleDateString()}
                        type="number"
                        style={{ margin: "5px", width: "100%" }}
                        inputProps={{ readOnly: "true" }}
                      />
                    </div>
                    {
                      console.log(this.state.PromotionEndDate)
                    }
                    <div style={{ margin: "5px", width: "100%" }}>
                      <KeyboardDatePicker
                        style={{ width: "100%" }}
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        id="component-simple"
                        label="End Date"
                        value={this.state.PromotionEndDate.toLocaleDateString()}
                        format="dd/MM/yyyy"
                        onChange={this.handleChange.bind(
                          this,
                          "PromotionEndDate"
                        )}
                        readOnly
                      />
                      <TextField
                        id="text-field-controlled"
                        helperText="End Date"
                        value={this.state.PromotionEndDate.toLocaleDateString()}
                        type="number"
                        style={{ margin: "5px", width: "100%" }}
                        inputProps={{ readOnly: "true" }}
                      />
                    </div>
                  </div>
                </MuiPickersUtilsProvider> */}
                {/* -----------------------------------Add Percentage  -------------------------------------- */}

                <TextField
                  id="text-field-controlled"
                  helperText="Discount Percentage"
                  value={this.state.DiscountPercentage}
                  onChange={this.handleChange.bind(this, "DiscountPercentage")}
                  type="number"
                  style={{ width: "30%" }}
                  inputProps={{ readOnly: "true" }}
                />
                <Paper className={classes.paper} style={divStyle}>
                  <div>
                    <InputLabel style={{ marginTop: "20px" }}>
                      Chosen Products
                    </InputLabel>

                    {/* <DisplayTable
                      Data={this.props.data}
                    /> */}
                  </div>
                </Paper>
                <br />
                <TextField
                  id="PromotionDesc"
                  label="Promotion Description"
                  multiline
                  rows={4}
                  defaultValue=" "
                  value={this.state.PromotionDesc}
                  variant="outlined"
                  onChange={this.handleChange.bind(this, "PromotionDesc")}
                  style={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                ></div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                ></div>
                <br />
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
)(PromotionDetailsComponent);

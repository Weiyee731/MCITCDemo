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
import GridStorageDetailComponent from "../gridStorageDetail/gridStorageDetail.component";
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
import styles from "./viewColor.component.css";
import ColorDetailComponent from "../../pages/colorDetail/colorDetail.component";
import { Autocomplete } from "@material-ui/lab";

import SearchBox from "../../components/SearchBox/SearchBox";

function mapStateToProps(state) {
  return {
    colors: state.counterReducer["colors"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllColor: () => dispatch(GitAction.CallAllColor()),
    CallDeleteColor: (prodData) =>
      dispatch(GitAction.CallDeleteColor(prodData)), //the backend of deletion is require
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
    id: "ColorID",
    numeric: false,
    disablePadding: true,
    label: "Color No.",
  },
  {
    id: "Color",
    numeric: false,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "ColorHexCode",
    numeric: true,
    disablePadding: false,
    label: "Color HexCode",
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
            inputProps={{ "aria-label": "select all color" }}
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

  const onDeleteColor = () => {
    props.ColorProps.CallDeleteColor(props.selectedData);
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
          Please select the Color that you want to delete.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              onDeleteColor();
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
  const [orderBy, setOrderBy] = React.useState("ColorID");
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
      const newSelecteds = props.Data.map((n) => n.ColorID);
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
          ColorProps={props.ColorProps}
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
                  const isItemSelected = isSelected(row.ColorID);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const colorArray = [row.ColorHexCode];
                  const cell = {
                    padding: "10px 16px",
                  };
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.ColorID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ColorID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left" style={cell}>
                        <Button
                          style={{
                            backgroundColor: colorArray,
                            border: "2px solid #555555",
                          }}
                        ></Button>
                      </TableCell>
                      <TableCell align="left">{row.Color}</TableCell>
                      <TableCell align="right">{row.ColorHexCode}</TableCell>
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
      orderBy: "ColorID",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      deleteActive: false,
      toBeEdited: false,
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

  onRowClick = (event, row) => {
    this.setState({
      ColorID: row.ColorID,
      Color: row.Color,
      ColorHexCode: row.ColorHexCode,
      // ProductID: row.ProductID,
      // StockAmount: row.StockAmount,
      // MaximumStock: row.MaximumStock,
      // RestockQuantity: row.RestockQuantity,
      // RestockDate: row.RestockDate,
      // RestockStatus: row.RestockStatus,
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

    const cell = {
      padding: "10px 16px",
    };

    var filteredColor = [];

    return (
      <div style={{ margin: "2%" }}>
        {this.state.detailsShown ? (
          <ColorDetailComponent data={this.state} data2={this.props} />
        ) : this.state.deleteActive ? (
          <div>
            <h1>Color List</h1>
            <div>
              <Button>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <Link className="nav-link" to={"/addColor"}>
                  Create new Color
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
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
            {this.props.Data.filter(
              (searchedItem) =>
                searchedItem.Color.toLowerCase().includes(
                  this.state.searchFilter
                ) ||
                searchedItem.ColorHexCode.toLowerCase().includes(
                  this.state.searchFilter
                )
            ).map((filteredItem) => {
              filteredColor.push(filteredItem);
            })}
            <DeletableTable
              Data={filteredColor}
              ColorProps={this.props.ColorProps}
            ></DeletableTable>
          </div>
        ) : (
          <div>
            <h1>Color List</h1>
            <div>
              <Button>
                <i class="fa fa-plus" aria-hidden="true"></i>
                <Link className="nav-link" to={"/addColor"}>
                  Create new Color
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
              placeholder="Search..."
              onChange={(e) => this.setState({ searchFilter: e.target.value })}
            />
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
                    {this.props.Data.filter(
                      (searchedItem) =>
                        searchedItem.Color.toLowerCase().includes(
                          this.state.searchFilter
                        ) ||
                        searchedItem.ColorHexCode.toLowerCase().includes(
                          this.state.searchFilter
                        )
                    ).map((filteredItem) => {
                      filteredColor.push(filteredItem);
                    })}
                    <TableBody>
                      {stableSort(
                        filteredColor,
                        getComparator(this.state.order, this.state.orderBy)
                      )
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = this.isSelected(row.ColorID);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          const colorArray = [row.ColorHexCode];
                          return (
                            <TableRow
                              hover
                              onClick={(event) => this.onRowClick(event, row)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.ColorID}
                              selected={isItemSelected}
                            >
                              <TableCell align="left" style={cell}>
                                <Button
                                  style={{
                                    backgroundColor: colorArray,
                                    border: "1px solid #555555",
                                  }}
                                ></Button>
                              </TableCell>
                              <TableCell align="left">{row.Color}</TableCell>
                              <TableCell align="right">
                                {row.ColorHexCode}
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
                  count={filteredColor.length}
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

class ViewColorStoragesComponent extends Component {
  constructor(props) {
    super(props);
    this.props.CallAllColor();

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
      code: null,
      Color: null,
      rental: null,
      productId: null,
      stockAmount: null,
      maxStock: null,
      restockQty: null,
      restockDate: null,
      restockStatus: null,
    };
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <DisplayTable
          Data={this.props.colors}
          ColorProps={this.props}
        ></DisplayTable>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewColorStoragesComponent);

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
import ShoplotDetailComponent from "../shoplotDetail/shoplotDetail.component";
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import GoogleMaps from "../../components/googleMaps/googleMaps";
import MapIcon from "@material-ui/icons/Map";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Card } from "@material-ui/core";
import myImage from "../../assets/user.jpg";
import Loader from "react-loader-spinner";
function mapStateToProps(state) {
  return {
    shoplots: state.counterReducer["shoplots"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAllShoplotsByPolygon: (prodData) =>
      dispatch(GitAction.CallAllShoplotsByPolygon(prodData)),
    CallDeleteShoplots: (prodData) =>
      dispatch(GitAction.CallDeleteShoplots(prodData)), //the backend of deletion is require
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
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
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

const headCells = [
  {
    id: "ShoplotName",
    numeric: false,
    disablePadding: true,
    label: "Shoplot Name",
  },
  {
    id: "ContactNumber",
    numeric: false,
    disablePadding: false,
    label: "Contact Number",
  },
  {
    id: "Coordinate",
    numeric: false,
    disablePadding: false,
    label: "Coordinate",
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
            inputProps={{ "aria-label": "select all shoplots" }}
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

  const onDeleteShoplot = () => {
    props.ShoplotProps.CallDeleteShoplots(props.selectedData);
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
          Please select the shoplot that you want to delete.
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              onDeleteShoplot();
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
  const [orderBy, setOrderBy] = React.useState("ShoplotName");
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
      const newSelecteds = props.Data.map((n) => n.ShoplotID);
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
      <Paper>
        <DeletableTableToolbar
          numSelected={selected.length}
          selectedData={selected}
          ShoplotProps={props.ShoplotProps}
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
                  const isItemSelected = isSelected(row.ShoplotID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.ShoplotID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ShoplotID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.ShoplotName}</TableCell>
                      <TableCell align="left">{row.ContactNumber}</TableCell>
                      <TableCell align="left">
                        {row.Longitude}, {row.Latitude}
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
    </div>
  );
}

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

//show main map
function ShowMainMap(props) {
  const polypath = [
    {
      block: "A",
      Color: "#008000",
      ShoplotCoordinate: [
        { lat: 1.5921641925052, lng: 110.431633074988 },
        { lat: 1.59115338985581, lng: 110.429951329936 },
        { lat: 1.59001492677904, lng: 110.430582476623 },
        { lat: 1.59102304881136, lng: 110.432309819229 },
        { lat: 1.5921641925052, lng: 110.431633074988 },
      ],
    },
    {
      block: "B",
      Color: "#FFFF00",
      ShoplotCoordinate: [
        { lat: 1.59219311478493, lng: 110.431658803505 },
        { lat: 1.59105065831252, lng: 110.432325065247 },
        { lat: 1.59264758826223, lng: 110.434993215471 },
        { lat: 1.59378358792204, lng: 110.43431969478 },
        { lat: 1.59219311478493, lng: 110.431658803505 },
      ],
    },
    {
      block: "C",
      Color: "#FF0000",
      ShoplotCoordinate: [
        { lat: 1.5939685198604472, lng: 110.43665361977425 },
        { lat: 1.5936590240065396, lng: 110.43611937906833 },
        { lat: 1.5945346343454787, lng: 110.43560473453614 },
        { lat: 1.5937790950076558, lng: 110.43433013423987 },
        { lat: 1.592637929429218, lng: 110.43500991320931 },
        { lat: 1.593685862577975, lng: 110.43677943664157 },
        { lat: 1.5939685198604472, lng: 110.43665361977425 },
      ],
    },
  ];

  return <GoogleMaps polypath={polypath} zoom={18} />;
}
//map viewer dialog
function SimpleDialog(props) {
  const { onClose, open, longitude, latitude, polypath123, shopName } = props;
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Map </DialogTitle>
      <DialogContent dividers>
        <div style={{ width: "768px", height: "568px" }}>
          <GoogleMaps
            longitude={longitude}
            latitude={latitude}
            polypath={polypath123}
            markerLabel={shopName}
            zoom={18}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  longitude: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
};

class ViewShoplotsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: "A",
      order: "asc",
      orderBy: "ShoplotID",
      selected: [],
      page: 0,
      ShoplotID: null,
      dense: false,
      rowsPerPage: 5,
      detailsShown: false,
      deleteActive: false,
      openMap: false,
      longitude: 110.433496,
      latitude: 1.592174,
      shopName: "MCITC",
      ShoplotCoordinate: [],
      imageSrc: myImage,
      shopLotCoords: null,
      row: null,
      file: [],
      fileInfo: [],
      url: [],
      counter: 0,
      loading: false,
    };
    this.props.CallAllShoplotsByPolygon(this.state.block);

    this.ToggleDeletable = this.ToggleDeletable.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  displayMap = (place) => {
    this.setState({
      openMap: true,
      longitude: place.lng,
      latitude: place.lat,
      ShoplotCoordinate: [place],
      shopName: place.shopName,
    });
  };

  closeMap = () => {
    this.setState({
      openMap: false,
      longitude: 110.433496,
      latitude: 1.592174,
      shopName: "MCITC",
    });
  };

  onRowClick = (event, row) => {
    this.setState({
      name: row.ShoplotName,
      contact: row.ContactNumber,
      longitude: row.Longitude,
      latitude: row.Latitude,
      shopLotCoords: JSON.parse(row.ShoplotCoordinate),
      row: row,
      ShoplotID: row.ShoplotID,
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

  handleChangeTab = (Block) => {
    this.setState({ block: Block });
    this.props.CallAllShoplotsByPolygon(Block);
    this.componentDidMount();
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

  componentDidMount() {
    this.setState({ loading: false });
    setTimeout(() => {
      this.setState({ loading: true });
    }, 5000);
  }

  render() {
    const { classes } = this.props;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.shoplots.length - this.state.page * this.state.rowsPerPage
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
    const cardStyle = { width: "90%", margin: "1% auto", padding: "10px" };
    return (
      <div style={{ width: "100%" }}>
        <Card style={cardStyle}>
          {this.state.detailsShown ? (
            <ShoplotDetailComponent data={this.state} data2={this.props} />
          ) : this.state.deleteActive ? (
            <div>
              <h1>Shoplot List</h1>
              <div>
                <Button>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <Link className="nav-link" to={"/addShoplot"}>
                    Create new Shoplot
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
                Data={this.props.shoplots}
                ShoplotProps={this.props.ShoplotProps}
              ></DeletableTable>
            </div>
          ) : (
            <div>
              <h1>Shoplot List</h1>
              <div>
                <Button>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <Link className="nav-link" to={"/addShoplot"}>
                    Create new Shoplot
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

              <ShowMainMap />

              <div>
                <Tabs>
                  <TabList>
                    <Tab onClick={() => this.handleChangeTab("A")}>Block A</Tab>
                    <Tab onClick={() => this.handleChangeTab("B")}>Block B</Tab>
                    <Tab onClick={() => this.handleChangeTab("C")}>Block C</Tab>
                  </TabList>
                  {this.state.loading === true ? (
                    <div>
                      <TabPanel>
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
                                  rowCount={this.props.shoplots.length}
                                />
                                <TableBody>
                                  {stableSort(
                                    this.props.shoplots,
                                    getComparator(
                                      this.state.order,
                                      this.state.orderBy
                                    )
                                  )
                                    .slice(
                                      this.state.page * this.state.rowsPerPage,
                                      this.state.page * this.state.rowsPerPage +
                                        this.state.rowsPerPage
                                    )
                                    .map((row, index) => {
                                      const isItemSelected = this.isSelected(
                                        row.ShoplotName
                                      );
                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      const ShoplotCoordinate = JSON.parse(
                                        row.ShoplotCoordinate
                                      );
                                      let placeDetail = {
                                        lng: ShoplotCoordinate[0].lng,
                                        lat: ShoplotCoordinate[0].lat,
                                        Color: "#FF0000",
                                        ShoplotCoordinate: JSON.parse(
                                          row.ShoplotCoordinate
                                        ),
                                        shopName: row.ShoplotName,
                                      };
                                      return (
                                        <TableRow
                                          hover
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.ShoplotName}
                                          selected={isItemSelected}
                                        >
                                          <TableCell
                                            align="left"
                                            onClick={(event) =>
                                              this.onRowClick(event, row)
                                            }
                                          >
                                            {row.ShoplotName}
                                          </TableCell>
                                          <TableCell
                                            align="left"
                                            onClick={(event) =>
                                              this.onRowClick(event, row)
                                            }
                                          >
                                            {row.ContactNumber}
                                          </TableCell>
                                          <TableCell align="left">
                                            <Button
                                              variant="outlined"
                                              onClick={() =>
                                                this.displayMap(placeDetail)
                                              }
                                              startIcon={<MapIcon />}
                                            >
                                              Show in Map
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  {emptyRows > 0 && (
                                    <TableRow
                                      style={{
                                        height:
                                          (this.state.dense ? 33 : 53) *
                                          emptyRows,
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
                              count={this.props.shoplots.length}
                              rowsPerPage={this.state.rowsPerPage}
                              page={this.state.page}
                              onChangePage={this.handleChangePage}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                          </Paper>
                          <SimpleDialog
                            open={this.state.openMap}
                            onClose={this.closeMap}
                            polypath123={this.state.ShoplotCoordinate}
                            longitude={this.state.longitude}
                            latitude={this.state.latitude}
                            shopName={this.state.shopName}
                          />
                        </div>
                      </TabPanel>
                      <TabPanel>
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
                                  rowCount={this.props.shoplots.length}
                                />
                                <TableBody>
                                  {stableSort(
                                    this.props.shoplots,
                                    getComparator(
                                      this.state.order,
                                      this.state.orderBy
                                    )
                                  )
                                    .slice(
                                      this.state.page * this.state.rowsPerPage,
                                      this.state.page * this.state.rowsPerPage +
                                        this.state.rowsPerPage
                                    )
                                    .map((row, index) => {
                                      const isItemSelected = this.isSelected(
                                        row.ShoplotName
                                      );
                                      const ShoplotCoordinate = JSON.parse(
                                        row.ShoplotCoordinate
                                      );
                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      let placeDetail = {
                                        lng: ShoplotCoordinate[0].lng,
                                        lat: ShoplotCoordinate[0].lat,
                                        Color: "#FF0000",
                                        ShoplotCoordinate: JSON.parse(
                                          row.ShoplotCoordinate
                                        ),
                                        shopName: row.ShoplotName,
                                      };
                                      return (
                                        <TableRow
                                          hover
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.ShoplotName}
                                          selected={isItemSelected}
                                        >
                                          <TableCell
                                            align="left"
                                            onClick={(event) =>
                                              this.onRowClick(event, row)
                                            }
                                          >
                                            {row.ShoplotName}
                                          </TableCell>
                                          <TableCell
                                            align="left"
                                            onClick={(event) =>
                                              this.onRowClick(event, row)
                                            }
                                          >
                                            {row.ContactNumber}
                                          </TableCell>
                                          <TableCell align="left">
                                            <Button
                                              variant="outlined"
                                              onClick={() =>
                                                this.displayMap(placeDetail)
                                              }
                                              startIcon={<MapIcon />}
                                            >
                                              Show in Map
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  {emptyRows > 0 && (
                                    <TableRow
                                      style={{
                                        height:
                                          (this.state.dense ? 33 : 53) *
                                          emptyRows,
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
                              count={this.props.shoplots.length}
                              rowsPerPage={this.state.rowsPerPage}
                              page={this.state.page}
                              onChangePage={this.handleChangePage}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                          </Paper>
                          <SimpleDialog
                            open={this.state.openMap}
                            onClose={this.closeMap}
                            polypath123={this.state.ShoplotCoordinate}
                            longitude={this.state.longitude}
                            latitude={this.state.latitude}
                            shopName={this.state.shopName}
                          />
                        </div>
                      </TabPanel>
                      <TabPanel>
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
                                  rowCount={this.props.shoplots.length}
                                />
                                <TableBody>
                                  {stableSort(
                                    this.props.shoplots,
                                    getComparator(
                                      this.state.order,
                                      this.state.orderBy
                                    )
                                  )
                                    .slice(
                                      this.state.page * this.state.rowsPerPage,
                                      this.state.page * this.state.rowsPerPage +
                                        this.state.rowsPerPage
                                    )
                                    .map((row, index) => {
                                      const isItemSelected = this.isSelected(
                                        row.ShoplotName
                                      );
                                      const ShoplotCoordinate = JSON.parse(
                                        row.ShoplotCoordinate
                                      );

                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      let placeDetail = {
                                        lng: ShoplotCoordinate[0].lng,
                                        lat: ShoplotCoordinate[0].lat,
                                        Color: "#FF0000",
                                        ShoplotCoordinate: JSON.parse(
                                          row.ShoplotCoordinate
                                        ),
                                        shopName: row.ShoplotName,
                                      };
                                      return (
                                        <TableRow
                                          hover
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.ShoplotName}
                                          selected={isItemSelected}
                                        >
                                          <TableCell
                                            align="left"
                                            onClick={(event) =>
                                              this.onRowClick(event, row)
                                            }
                                          >
                                            {row.ShoplotName}
                                          </TableCell>
                                          <TableCell
                                            align="left"
                                            onClick={(event) =>
                                              this.onRowClick(event, row)
                                            }
                                          >
                                            {row.ContactNumber}
                                          </TableCell>
                                          <TableCell align="left">
                                            <Button
                                              variant="outlined"
                                              onClick={() =>
                                                this.displayMap(placeDetail)
                                              }
                                              startIcon={<MapIcon />}
                                            >
                                              Show in Map
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  {emptyRows > 0 && (
                                    <TableRow
                                      style={{
                                        height:
                                          (this.state.dense ? 33 : 53) *
                                          emptyRows,
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
                              count={this.props.shoplots.length}
                              rowsPerPage={this.state.rowsPerPage}
                              page={this.state.page}
                              onChangePage={this.handleChangePage}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                          </Paper>
                          <SimpleDialog
                            open={this.state.openMap}
                            onClose={this.closeMap}
                            polypath123={this.state.ShoplotCoordinate}
                            longitude={this.state.longitude}
                            latitude={this.state.latitude}
                            shopName={this.state.shopName}
                          />
                        </div>
                      </TabPanel>
                    </div>
                  ) : (
                    <Loader
                      style={style}
                      type="TailSpin"
                      color="#545755"
                      height={150}
                      width={150}
                    />
                  )}
                </Tabs>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewShoplotsComponent);
